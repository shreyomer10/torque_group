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
};

export const galleryOrder = ["mumbai", "chennai"] as const;
export type GalleryLocation = (typeof galleryOrder)[number];

/** First N photos of a gallery — used for the infrastructure-page carousel. */
export function carouselPhotos(location: GalleryLocation, n = 5): GalleryPhoto[] {
  return galleries[location].photos.slice(0, n);
}
