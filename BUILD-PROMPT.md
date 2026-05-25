# Torque Group — Engineering Build Brief

> Prompt for the next agent/dev to code the production website from the wireframes.

---

## Mission

Build the Torque Group corporate website as a **production-ready Next.js 15 (App Router) + TypeScript + Tailwind CSS v4** application. The visual design is finalised — it is the HTML/CSS in `wireframe/`. Do **not** re-invent layout, spacing, type scale, palette, or section ordering. Translate the wireframe **pixel-for-pixel** into React components, then add motion, real images, the working contact form, the SVG world map, and SEO. **Mobile-first throughout** — every page must be verified at 360 / 768 / 1080 / 1440 before merge.

---

## Repo layout (this folder is the project root)

```
website/
  BUILD-PROMPT.md            ← this file
  wireframe/                 ← FINAL visual spec. Match exactly. Do not modify.
    index.html
    about.html
    companies.html
    infrastructure.html
    industries.html
    contact.html
    partials.js
    styles.css
  content/
    index.ts                 ← single source of truth for ALL copy + data
  assets/                    ← client-supplied imagery and logos
    README.md                ← which file goes where + naming rules
    logos/                   ← 6 logos (group + 5 companies, SVG preferred)
    team/                    ← 2 portraits
    clients/                 ← 12 client logos
    images/                  ← editorial photos (workshops, factories, products)
    og/                      ← 6 Open Graph share images (1200×630)

  # generated when you scaffold the Next.js app:
  app/                       ← routes
  components/                ← UI components
  lib/                       ← email, seo, schema helpers
  public/                    ← symlink or copy of assets/ at build time
```

**Single source of truth rule:** every piece of copy lives in `content/index.ts`. Every asset lives in `assets/`. Components import from `@/content` and reference `/<asset-folder>/<file>`. No hard-coded strings or file paths in JSX.

---

## Source-of-truth files

- `wireframe/*.html` + `wireframe/styles.css` + `wireframe/partials.js` — visual spec
- `content/index.ts` — typed content module. Schema:
  - `brand` — name, tagline, group address/email/phone, languages
  - `nav` — links + CTA
  - `companies` — `Record<CompanyId, Company>` (the 5 companies)
  - `companyOrder` — display order array
  - `home` — hero, ecosystem, overview, industriesPreview, clients, global (map pins as `{ lat, lng }`), contactTeaser
  - `about` — head, leadership (2 members with photo paths), philosophy, visionMission, milestones, culture, corridor
  - `companiesPage` — page-head only
  - `infrastructure` — head, metrics, tiles, equipment table rows
  - `industries` — head, sectors, matrix (boolean grid 5×6), workflow steps
  - `contact` — head, step1, step2 (form fields keyed by name, helper/submit/success/error/auto-reply templates), blocks
  - `footer` — trust strip, cols, bottom bar
  - `microcopy` — 404, cookies
  - `seo` — `Record<route, { title, description }>` + global keywords

If anything conflicts: **wireframe wins for layout, content.ts wins for copy, this brief wins for behaviour/architecture.**

---

## Tech stack (locked)

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4. Migrate `wireframe/styles.css` CSS variables (`--navy`, `--accent`, `--bg`, `--bg-alt`, `--surface`, `--line`, `--ink`, `--ink-soft`, `--muted`, `--steel-blue`, `--grid`) into `tailwind.config.ts` theme colors. Fonts: Barlow Condensed (headings), Inter (body), JetBrains Mono (eyebrows / spec) via `next/font/google`.
- **Animation:** Framer Motion. Reveal-on-scroll mirroring the wireframe `.reveal` behaviour. Staggered children in metrics + ecosystem nodes. Respect `prefers-reduced-motion`. No parallax, no autoplaying video.
- **Icons:** lucide-react only.
- **Forms:** React Hook Form + Zod.
- **Email delivery:** Resend. See §Inquiry Form below.
- **Map:** Static styled SVG world map (`react-simple-maps` with a simplified topojson, OR a hand-traced SVG). Match the wireframe's grid-backed, low-saturation aesthetic. 4 pins (Hamburg, Pune, Mumbai, Chennai) with hover labels. **No Google Maps embed.**
- **Deployment:** Vercel. Node 20.
- **Analytics:** Vercel Analytics + GA4 (env-var gated, consent-gated).

Do not introduce: shadcn, MUI, Bootstrap, jQuery, any other animation library, WhatsApp widget (skipped for v1).

---

## Project structure (after scaffolding)

```
app/
  layout.tsx                # <html>, fonts, Nav, Footer, analytics, JSON-LD
  page.tsx                  # /
  about/page.tsx
  companies/page.tsx
  infrastructure/page.tsx
  industries/page.tsx
  contact/page.tsx
  api/inquiry/route.ts      # POST endpoint
  not-found.tsx
  robots.ts
  sitemap.ts

components/
  layout/Nav.tsx
  layout/Footer.tsx
  layout/Reveal.tsx         # framer-motion .reveal wrapper

  ui/Button.tsx
  ui/Eyebrow.tsx
  ui/SectionHead.tsx
  ui/Badge.tsx

  home/Hero.tsx
  home/Ecosystem.tsx
  home/Metrics.tsx
  home/IndustriesPreview.tsx
  home/Clients.tsx
  home/GlobalPresence.tsx
  home/ContactTeaser.tsx

  about/Leadership.tsx
  about/Timeline.tsx
  about/Culture.tsx
  about/Corridor.tsx

  companies/CompanyBlock.tsx

  infrastructure/InfraTile.tsx
  infrastructure/EquipmentTable.tsx

  industries/SectorTile.tsx
  industries/Matrix.tsx
  industries/Workflow.tsx

  contact/CompanyPicker.tsx
  contact/CompanyDetail.tsx
  contact/InquiryForm.tsx

  shared/WorldMap.tsx
  shared/ImageOrPlaceholder.tsx   # renders next/image if asset exists, else grid placeholder

lib/
  email.ts                  # Resend client, RECIPIENTS map, send helpers
  rate-limit.ts             # Upstash Redis sliding-window
  seo.ts                    # buildMetadata(route)
  schema.ts                 # JSON-LD builders

content/                    # already exists — DO NOT duplicate elsewhere
  index.ts

public/                     # generated from assets/ at build time (or symlinked)
```

---

## Visual fidelity rules

Open each wireframe HTML, then build the React equivalent and put them side-by-side. The build must match within ~2px on:

- Container max-width 1240px, 24px gutter on mobile
- Section vertical padding rhythm (`padding: 84px 0` desktop, `56px` mobile)
- Type sizes — H1 / H2 / H3 / h4 / body / eyebrow / mono
- 1px solid `--line` borders on every card. No shadows substitution.
- Accent orange = `--accent` (#c2410c). Nothing else.
- Eyebrows = JetBrains Mono, 11px, .2em tracking, uppercase, orange. Always via `<Eyebrow>` component.

Where the wireframe shows grid-paper placeholders (`.bg-engine`, `.bg-pump`, etc.), render via `<ImageOrPlaceholder>`:
- If a real asset exists at the mapped path → `next/image` with `fill` + `sizes` + alt text from content.
- Else → identical grid-paper placeholder so the page never looks broken.

---

## Mobile-first checklist

Build every component starting from 360px, add `md:` / `lg:` overrides upward.

- Nav collapses to hamburger < 768px. Drawer slides in from the right, full-height navy, links stack vertically.
- Hero stats: 2-col mobile → 3-col tablet+.
- Ecosystem: parent card stacks above company nodes on < 1080px.
- Metrics: 2×3 mobile → 3×2 tablet → 6×1 desktop.
- Company blocks (`/companies`): image stacks above body on mobile, side-by-side desktop. `.reverse` alternation only `lg:` and up.
- Infrastructure: 1-col mobile, 2-col tablet, 12-col asymmetric desktop.
- Matrix: horizontal scroll inside bordered wrapper on mobile; first column sticky (`position: sticky; left: 0`).
- Footer: 1-col → 2-col → 4-col. Trust strip 2-up → 3-up → 6-up.
- Contact picker: 1-col mobile → 2-col tablet → 5-up desktop.
- Tap targets ≥ 44×44.
- No horizontal scroll at any width (matrix wrapper is the one allowed exception).

Lighthouse mobile target: ≥95 / ≥95 / ≥95 / ≥95.

---

## Inquiry Form — full behaviour spec

### Email service

**Resend** (resend.com) — domain-verified `torquegroup.com` sender. The client adds 3 DNS records to verify the domain; we store `RESEND_API_KEY` in Vercel env vars.

### From / To / Routing

| Field | Value |
|---|---|
| `from` | `Torque Group <noreply@torquegroup.com>` (domain-verified) |
| `to` (company mail) | Selected company's inbox, from `RECIPIENTS[companyId]` env map |
| `cc` (company mail) | `group@torquegroup.com` (`GROUP_INBOX` env var) |
| `reply-to` | The submitter's email — replies bypass `noreply@` and reach the form filler |
| `to` (auto-reply) | The submitter's email |

### End-to-end flow

1. User on `/contact` (or `/contact?co=chennai` to deep-link a preselection).
2. Picker controls `selectedCompany` state. Selecting a tile updates the detail panel and a hidden field on the form.
3. User fills name, company, email, phone, message.
4. Anti-spam: invisible honeypot field; client records `pageLoadedAt` timestamp.
5. Submit:
   - Client: Zod validates → button disabled, label changes to `Routing inquiry…` → POST `/api/inquiry` with `{ company, name, companyName, email, phone, message, honeypot, _ts: pageLoadedAt }`.
   - Server (`app/api/inquiry/route.ts`):
     - Re-validates with same Zod schema
     - Rejects if `honeypot` non-empty (returns 200 with `{ok:true}` to not tip off bots)
     - Rejects if `Date.now() - _ts < 3000` (form filled too fast — bot)
     - Rate-limit check via Upstash Redis: 5 submissions per IP per hour. Past that → 429.
     - Looks up `RECIPIENTS[company]`
     - Calls Resend twice in parallel via `Promise.all`:
       - **Email A** (company + group):
         - to: `RECIPIENTS[company]`, cc: `GROUP_INBOX`, reply-to: submitter
         - subject: `New inquiry — {Company name}`
         - HTML body: branded template with submitter details + message
       - **Email B** (auto-reply):
         - to: submitter, from: `noreply@torquegroup.com`
         - subject: `We've received your inquiry — Torque Group`
         - HTML body: per `content.contact.step2.autoReplyBody`, substituting `{name}` and `{company}`
     - Returns `{ ok: true }` or `{ ok: false, error: string }`
6. UI:
   - Success → replace form with `content.contact.step2.success` (substitute company name) + a "Send another" link
   - Failure → keep form filled, inline error: `content.contact.step2.error`

### Env vars (`.env.local.example`)

```bash
# Resend
RESEND_API_KEY=

# Sender
MAIL_FROM="Torque Group <noreply@torquegroup.com>"

# Group desk (CC on every routed mail, fallback in error states)
MAIL_GROUP=group@torquegroup.com

# Per-company inboxes (placeholders until client confirms)
MAIL_INSTITUTE=admissions@torquetechnicsinstitute.com
MAIL_CHENNAI=service@torquetechnics.com
MAIL_SUBHAGS=sales@subhags.com
MAIL_NULITE=safety@nulite.in
MAIL_WOLFF=info@armaturen-wolff.de

# Rate limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics
NEXT_PUBLIC_GA_ID=
```

**Inbox swaps don't require redeploys** — they're env vars on Vercel. The client can swap any company's destination inbox by editing the dashboard.

### Email HTML templates (in `lib/email.ts`)

Two templates, inline-styled HTML (email clients are hostile to CSS):
1. **Inquiry notification** — used for Email A. Header with Torque Group brand, table of submitter details, the message, a `reply directly to the submitter` note.
2. **Auto-reply** — used for Email B. Brand header, friendly confirmation, what to expect next.

Both should render cleanly in Gmail, Outlook 365, Apple Mail.

### GDPR / consent
Cookie banner (essential cookies on by default). Block GA initialisation until consent. Form submission is a legitimate-interest transactional use and does not require consent.

---

## World map (Global Presence)

- Static SVG world map, low-saturation, with faint grid overlay matching the wireframe `map-visual` style (the repeating-linear-gradient grid).
- Approach: `react-simple-maps` with a simplified TopoJSON. Land fill `rgba(16,42,67,0.10)`, no country borders.
- 4 pins (Hamburg, Pune, Mumbai, Chennai) from `content.home.global.pins`. Each pin = orange dot (`--accent`) with 4px translucent halo. Hover lifts a navy label badge above (mono, 10px, uppercase) matching the wireframe `.map-pin .label`.
- Mobile: map collapses above the office cards (which become 1 col).
- Performance: inline the topojson if < 50 KB; else lazy-load with `next/dynamic` and a skeleton.

---

## SEO

- `generateMetadata` per route, fed by `lib/seo.ts` which reads from `content.seo[route]`.
- JSON-LD: inject `Organization` + 5 `subOrganization` in `app/layout.tsx`. `BreadcrumbList` per inner page via a server component.
- `app/sitemap.ts` returns 6 absolute URLs. `app/robots.ts` allows all and references the sitemap.
- Canonical URLs per page.
- Open Graph: prefer `app/opengraph-image.tsx` (Next renders to PNG at build) so the OG images stay in sync with copy. Static fallbacks in `assets/og/`.
- One `<h1>` per page enforced via eslint-plugin-jsx-a11y.
- Lazy-load below-fold images via `next/image`.
- Every route is statically pre-rendered. Only `/api/inquiry` is dynamic.

---

## Accessibility

- Keyboard: every interactive element reachable. Focus rings via `:focus-visible` with 2px orange outline.
- `aria-label` on icon-only buttons (matrix cells, drawer toggle, picker tiles).
- Matrix row headers as `<th scope="row">`.
- Form errors associated to inputs via `aria-describedby`.
- `prefers-reduced-motion` → reveal animations become instant opacity changes.
- Tested with axe-core; zero serious issues.

---

## Definition of done

- [ ] `pnpm build` passes with no warnings
- [ ] `pnpm lint` clean (eslint + tsc strict)
- [ ] 1440px side-by-side: React build visually indistinguishable from wireframe
- [ ] 360px: no horizontal scroll, no overlap, all CTAs reachable
- [ ] Lighthouse mobile ≥95 / ≥95 / ≥95 / ≥95
- [ ] Inquiry form: end-to-end test sends → company inbox + group CC + auto-reply all arrive. Rate limit blocks the 6th send in an hour. Honeypot rejection silent.
- [ ] Matrix: sticky left column verified at 360px viewport
- [ ] SVG map renders on Safari iOS, Chrome Android, Firefox desktop
- [ ] All copy strings appear exactly as written in `content/index.ts`
- [ ] `app/not-found.tsx` uses microcopy from content
- [ ] Cookie banner blocks GA until consent
- [ ] `assets/` README updated if any new asset categories are introduced

---

## What this build is NOT

- Not a CMS. Copy lives in `content/index.ts`; redeploy to change. (Sanity migration possible post-launch.)
- Not multi-language. English only for v1.
- No blog, no case studies, no projects page (Engineering Projects company removed from scope).
- No WhatsApp widget (the SOW lists it; we're deferring until client requests).
- Not Webflow / WordPress despite the SOW listing them as options. This is Next.js — confirm with client at kickoff.

---

## Day-1 sequence

1. `pnpm create next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"` inside this `website/` folder.
2. Add deps: `resend`, `framer-motion`, `react-hook-form`, `zod`, `lucide-react`, `react-simple-maps`, `@upstash/ratelimit`, `@upstash/redis`.
3. Port `wireframe/styles.css` design tokens into `tailwind.config.ts`. Globals: font setup + reset only.
4. Link `assets/` into `public/` (copy script in `package.json` postinstall, or `next.config` rewrite).
5. Build `layout/Nav.tsx` + `layout/Footer.tsx` to match `wireframe/partials.js` exactly.
6. Stub all 6 routes with `page.tsx` using the page-head pattern from the wireframes.
7. Build Home top-to-bottom: Hero → Ecosystem → Metrics → IndustriesPreview → Clients → GlobalPresence → ContactTeaser.
8. Build About, Companies, Infrastructure, Industries, Contact in that order.
9. Wire the inquiry form last — visual first, behaviour second.
10. SEO pass: metadata, JSON-LD, sitemap, robots, OG images.
11. A11y pass: keyboard, focus rings, reduced motion, contrast (axe-core).
12. Mobile pass: 360 → 768 → 1080 → 1440 on every page.
13. Ship to Vercel preview, run Lighthouse on the preview URL, fix until green.
14. Hand over: README with env-var setup, Resend signup walkthrough, asset-swap instructions.

When in doubt: open the wireframe HTML, copy the structure, change strings only if `content/index.ts` says so.
