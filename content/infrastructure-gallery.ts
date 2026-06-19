/**
 * Infrastructure photo galleries (per-location albums).
 *
 * Optimized WebP live in /public/images/infrastructure/<location>/.
 * Each image has two encodings produced by the optimize step:
 *   <slug>-thumb.webp  → 800×600 cover, for grid tiles & carousel
 *   <slug>-full.webp   → ≤1600px contain, for the lightbox
 *
 * To add a photo: drop the source in assets/infrastructure/<location>/,
 * re-run the optimize script, then add a { slug, title } entry here.
 */

export type GalleryPhoto = {
  slug: string;   // filename stem under the location folder
  title: string;
  thumbSrc?: string;
  fullSrc?: string;
};

export type Gallery = {
  location: string;        // route segment, e.g. "mumbai"
  facility: string;        // "FACILITY · 01 · MUMBAI"
  name: string;            // human title
  blurb: string;
  dir: string;             // public path prefix
  photos: GalleryPhoto[];
};

const mumbaiPhotos: GalleryPhoto[] = Array.from({ length: 30 }, (_, i) => {
  const n = i + 1;
  return {
    slug: `mumbai-${String(n).padStart(2, "0")}`,
    title: `Training Facility · ${String(n).padStart(2, "0")}`,
  };
});

const chennaiPhotos: GalleryPhoto[] = [
  { slug: "workshop",                              title: "Workshop" },
  { slug: "hydraulic-test-bench",                  title: "Hydraulic Test Bench" },
  { slug: "hydraulic-test-table",                  title: "Hydraulic Test Table" },
  { slug: "hydraulic-testing-table",               title: "Hydraulic Testing Table" },
  { slug: "lathe",                                 title: "Lathe" },
  { slug: "miniature-crane",                       title: "Miniature Crane" },
  { slug: "windlass-motor-shaft-seal-renewal",     title: "Windlass Motor — Shaft Seal Renewal" },
  { slug: "windlass-trouble-shoot-of-not-taking-load", title: "Windlass — Load Fault Troubleshooting" },
  { slug: "axial-piston-pump-cut-section-view",    title: "Axial Piston Pump — Cut-Section View" },
  { slug: "ihi-vane-motor-exploded-view",          title: "IHI Vane Motor — Exploded View" },
  { slug: "rexrtoh-dfr-controller",                title: "Rexroth DFR Controller" },
  { slug: "class-room",                            title: "Classroom" },
  { slug: "class-room-2",                          title: "Classroom" },
];

// Sources optimized to <slug>-thumb.webp / <slug>-full.webp by
// scripts/optimize-gallery.mjs, so thumb/full paths are derived like mumbai/chennai.
const subhagPhotos: GalleryPhoto[] = [
  { slug: "subhag-shopfloor", title: "Subhag Workshop Floor" },
  { slug: "subhag-machining-01", title: "Machining Bay" },
  { slug: "subhag-machining-02", title: "Pump Component Machining" },
  { slug: "subhag-machining-03", title: "Workshop Equipment" },
  { slug: "subhag-machining-04", title: "Assembly Area" },
  { slug: "subhag-machining-05", title: "Pump Manufacturing Cell" },
  { slug: "foundry-pouring", title: "Foundry Pouring Process" },
  { slug: "cast-iron-reference", title: "Cast Iron Reference" },
  { slug: "foundry-reference", title: "Foundry Reference" },
  { slug: "casting-reference", title: "Casting Reference" },
];

const torquePunePhotos: GalleryPhoto[] = [
  { slug: "twids-photo", title: "TWIDS System" },
  { slug: "interlock-valve-assembly", title: "Interlock Valve Assembly" },
  { slug: "mooring-winch-brake-test-kit", title: "Mooring Winch Brake Test Kit" },
  { slug: "bunker-sampler-installation", title: "Bunker Sampler Installation" },
];

// Titles for the descriptive originals; everything else falls back to a generic label.
const wolffTitles: Record<number, string> = {
  2: "Valve Cabinet Assembly",
  4: "Coarse Filter — DG",
  5: "DN200 Pressure Change-Over Valve Box (5-part)",
  24: "Coarse Filter",
};

// Sources are optimized to <slug>-thumb.webp / <slug>-full.webp by
// scripts/optimize-wolff.mjs, so thumb/full paths are derived like mumbai/chennai.
const wolffPhotos: GalleryPhoto[] = Array.from({ length: 31 }, (_, i) => {
  const n = i + 1;
  const nn = String(n).padStart(2, "0");
  return {
    slug: `wolff-${nn}`,
    title: wolffTitles[n] ?? `Valve Engineering · ${nn}`,
  };
});

export const galleries: Record<string, Gallery> = {
  mumbai: {
    location: "mumbai",
    facility: "FACILITY · 01 · MUMBAI",
    name: "Torque Technics Institute — Mumbai",
    blurb:
      "Practical marine training bays — turbocharger, purifier, pump and engine-room workshops and classrooms.",
    dir: "/images/infrastructure/mumbai",
    photos: mumbaiPhotos,
  },
  chennai: {
    location: "chennai",
    facility: "FACILITY · 03 · CHENNAI",
    name: "Shipboard Hydraulics Workshop — Chennai",
    blurb:
      "Hydraulic repair lines — test benches, windlass and deck-machinery overhaul, pump and motor sections.",
    dir: "/images/infrastructure/chennai",
    photos: chennaiPhotos,
  },
  subhag: {
    location: "subhag",
    facility: "FACILITY · 02 · PUNE",
    name: "Subhag Engineers Pump Factory — Pune",
    blurb:
      "Pump manufacturing infrastructure — machining, assembly, foundry reference and production-floor views.",
    dir: "/images/infrastructure/subhag",
    photos: subhagPhotos,
  },
  "torque-pune": {
    location: "torque-pune",
    facility: "FACILITY · 03 · PUNE",
    name: "Torque Techniques Pune Workshop",
    blurb:
      "Hydraulic and deck-machinery service assets — valve assemblies, TWIDS, bunker sampler installation and winch test equipment.",
    dir: "/images/infrastructure/torque-pune",
    photos: torquePunePhotos,
  },
  wolff: {
    location: "wolff",
    facility: "FACILITY · 05 · HAMBURG",
    name: "Armaturen-Wolff Workshop — Hamburg",
    blurb:
      "German maritime valve engineering — precision valve machining, change-over valve boxes, coarse filters and flow-control assemblies built to DIN · ISO · IACS standards.",
    dir: "/images/infrastructure/wolff",
    photos: wolffPhotos,
  },
};

export const galleryOrder = ["mumbai", "subhag", "torque-pune", "chennai", "wolff"] as const;
export type GalleryLocation = (typeof galleryOrder)[number];

/** First N photos of a gallery — used for the infrastructure-page carousel. */
export function carouselPhotos(location: GalleryLocation, n = 5): GalleryPhoto[] {
  return galleries[location].photos.slice(0, n);
}
