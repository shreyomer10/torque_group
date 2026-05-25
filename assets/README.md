# Assets

All client-supplied imagery + brand files live here, organised by use. The Next.js app reads from this folder (symlinked into `public/` during build, or imported via `next/image`).

## Folder map

```
assets/
  logos/          Torque Group + 5 company logos (SVG preferred, PNG fallback)
                  Naming: torque-group.svg, subhags.svg, wolff.svg, institute.svg, chennai.svg, nulite.svg
  team/           Leadership portraits — referenced from content/index.ts → about.leadership.members[].photo
                  Naming: founder.jpg, operations.jpg  (1200×1500, JPG, sRGB, < 400 KB)
  clients/        Client logos for the home page Clients grid (12 slots)
                  Naming: client-01.svg … client-12.svg
  images/         General editorial photography — workshops, factories, products, port shots
                  Naming: kebab-case + purpose. e.g. mumbai-workshop-turbocharger.jpg
                  Sizes: hero shots 2400×1600, section shots 1600×1067, all JPG 85% quality
  og/             Social share images per route (Open Graph)
                  Naming: og-home.jpg, og-about.jpg, og-companies.jpg, og-infrastructure.jpg, og-industries.jpg, og-contact.jpg
                  Size: 1200×630 JPG
```

## Image requirements

- **Format:** SVG for logos and icons, JPG (85%) for photos, PNG only when transparency is needed
- **Colour:** sRGB, no embedded ICC profiles
- **Compression:** all photos through `mozjpeg` or `sharp` before commit (use `pnpm img:optimize`)
- **Max file size:** logos < 50 KB, photos < 500 KB, OG images < 250 KB
- **Alt text:** defined in `content/index.ts`, not in filenames. Every image has alt text — no exceptions.

## What's missing (waiting on client)

- [ ] All 5 company logos (SVG)
- [ ] Torque Group master logo
- [ ] 2 leadership portraits
- [ ] 12 client logos
- [ ] Hero workshop photography (Mumbai)
- [ ] Pump factory photography (Pune)
- [ ] Hydraulic workshop photography (Chennai)
- [ ] Valve workshop photography (Hamburg)
- [ ] OG share images (or we generate them at build time from text)

Until real assets arrive, the wireframe's grid-paper placeholders render in their place — the page never looks broken.
