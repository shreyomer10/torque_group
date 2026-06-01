/**
 * Client logo roster for the home-page marquee.
 *
 * Files live in /public/images/clients/. Formats are kept in their
 * original efficient encoding (svg/webp/avif/png/jpg) — next/image
 * re-encodes raster logos to avif/webp at the displayed size, so
 * load is fast regardless of the source format. SVGs are served as-is.
 *
 * To add a client: drop the file in /public/images/clients/ and add
 * one entry here. Order here = display order in the marquee.
 */
export type ClientLogo = { src: string; name: string };

export const clientLogos: ClientLogo[] = [
  { src: "/images/clients/apj-shipping.jpg", name: "APJ Shipping" },
  { src: "/images/clients/bravo-ships.svg", name: "Bravo Ships" },
  { src: "/images/clients/osm-thome.png", name: "OSM Thome" },
  { src: "/images/clients/pan-bulk-shipping.avif", name: "Pan Bulk Shipping" },
  { src: "/images/clients/sunav-marine.png", name: "Sunav Marine" },
  { src: "/images/clients/acrux.png", name: "Acrux" },
  { src: "/images/clients/atlantans-group.png", name: "Atlantans Group" },
  { src: "/images/clients/central-ship-management.avif", name: "Central Ship Management" },
  { src: "/images/clients/executive-ship-management.png", name: "Executive Ship Management" },
  { src: "/images/clients/gesco.png", name: "GESCO" },
  { src: "/images/clients/gs-ship-management.png", name: "GS Ship Management" },
  { src: "/images/clients/marine-mechanics.png", name: "Marine Mechanics" },
  { src: "/images/clients/mms.png", name: "MMS Co. Ltd" },
  { src: "/images/clients/nautilus.webp", name: "Nautilus" },
  { src: "/images/clients/ph.png", name: "PH" },
  { src: "/images/clients/prime-tankers.svg", name: "Prime Tankers" },
  { src: "/images/clients/sai-maritime.png", name: "Sai Maritime" },
  { src: "/images/clients/samudhra.png", name: "Samudhra" },
  { src: "/images/clients/sanmar.jpg", name: "Sanmar" },
  { src: "/images/clients/seaknotiq.png", name: "SeaKnotIQ" },
  { src: "/images/clients/seven-islands.png", name: "Seven Islands" },
  { src: "/images/clients/synergy.webp", name: "Synergy" },
  { src: "/images/clients/tristar-mtm.avif", name: "Tristar MTM" },
  { src: "/images/clients/varya.png", name: "Varya" },
  { src: "/images/clients/vridhi-maritime.jpg", name: "Vridhi Maritime" },
];
