# Torque Group — Website

Production Next.js 15 (App Router) build of the Torque Group corporate website, ported from `wireframe/` and content-driven by `content/index.ts`.

## Stack
- Next.js 15 + React 19 + TypeScript (strict)
- Tailwind CSS v3 + ported design tokens from `wireframe/styles.css`
- Framer-free reveal-on-scroll (lightweight IntersectionObserver in `components/layout/Reveal.tsx`)
- lucide-react icons
- React Hook Form + Zod for the inquiry form
- Brevo (formerly Sendinblue) for transactional email — 300/day free tier, no SDK dependency, called via REST. Server-side from `app/api/inquiry/route.ts`.
- In-memory rate limiter (per-serverless-instance) — see `lib/rate-limit.ts`. Swap for `@upstash/ratelimit` if global durable limits are needed.
- Vercel Analytics + GA4 (consent-gated)

## Local setup

```powershell
# from this directory (website/)
pnpm install                # or `npm install`
copy .env.local.example .env.local
# fill in BREVO_API_KEY at minimum
pnpm dev                    # http://localhost:3000
```

Node.js 20+ recommended.

`pnpm install` writes to `./node_modules` only — nothing global, nothing on the laptop outside this folder.

## Production build

```powershell
pnpm build
pnpm start
```

## Deployment (Vercel)

1. Push this folder to a GitHub repo.
2. In Vercel: New Project → import the repo → Framework preset: Next.js.
3. Add **every** variable from `.env.local.example` in the Vercel project settings (Production + Preview).
4. Verify either a single sender email OR the full domain in **Brevo** (Senders & IPs settings). For testing, a verified Gmail sender works. For production, verify torquegroup.com with the DNS records Brevo provides.
5. First deploy — done.

To change which inbox a company's inquiries go to, edit `MAIL_INSTITUTE` / `MAIL_CHENNAI` / etc. in Vercel and redeploy (or use the "Redeploy" button). No code change needed.

## How the inquiry form works

- User picks a company → form posts to `/api/inquiry`.
- Server validates via Zod, rejects if honeypot non-empty or dwell time <3s.
- Rate limit: 5 submissions / IP / hour (per warm serverless instance).
- Two Brevo API calls fire in parallel:
  - **Notification** → company inbox, CC group desk, reply-to = submitter
  - **Auto-reply** → submitter
- Returns `{ ok: true }` or `{ ok: false, error }`.

Brevo only requires the SENDER to be verified (an email or a full domain). Recipients can be any address — so it's easy to test the full flow before the real domain is verified.

## Content

All copy is in `content/index.ts`. To change a string, edit it there and redeploy. No hard-coded copy lives in components.

## Assets

Drop real images under `public/`:

```
public/
  images/
    team/founder.jpg
    team/operations.jpg
    companies/{institute,chennai,subhags,nulite,wolff}.jpg
    infrastructure/{mumbai-workshop,pune-factory,chennai-hyd,hamburg-valve}.jpg
```

If a file is missing, the page renders the wireframe's grid-paper placeholder via `<ImageOrPlaceholder>`. Nothing breaks visually.

## Rate-limit note

The in-memory limiter is per-serverless-instance. Vercel may spin up multiple instances, so the practical cap is roughly `5 × instances` per hour from one IP. For most marketing sites this is plenty; Brevo's 300/day cap is the real ceiling. If abuse becomes an issue:

1. Sign up for Upstash (free tier).
2. Replace `lib/rate-limit.ts` body with `@upstash/ratelimit`'s sliding window.
3. Add `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` to env.

The route handler (`app/api/inquiry/route.ts`) stays unchanged.

## Project structure

```
app/                  routes
components/
  layout/             Nav, Footer, Reveal, CookieBanner, Analytics
  ui/                 Button, Eyebrow, SectionHead, PageHead
  shared/             ImageOrPlaceholder, WorldMap
  home/               Hero, Ecosystem, Metrics, IndustriesPreview, Clients, GlobalPresence, ContactTeaser
  about/              Leadership, PhilosophyTimeline, Culture, Corridor
  companies/          CompanyBlock
  infrastructure/     InfraTile, EquipmentTable
  industries/         Matrix
  contact/            ContactInteractive, CompanyPicker, CompanyDetail, InquiryForm
content/index.ts      single source of truth for all copy
lib/
  seo.ts              buildMetadata + siteUrl helper
  schema.ts           JSON-LD (Organization, BreadcrumbList)
  inquiry-schema.ts   Zod schema for the form
  rate-limit.ts       in-memory limiter
  email.ts            Brevo REST client + HTML templates
wireframe/            DO NOT EDIT — the visual spec
```
