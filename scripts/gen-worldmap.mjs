// One-off: build a DOTTED (halftone) REGION-CROPPED map SVG from world-atlas
// TopoJSON. A regular lng/lat grid is sampled over the crop window; a dot is
// drawn wherever the point falls on land. Uses a PURE LINEAR equirectangular
// mapping over the crop bounds so the pin projection in WorldMap.tsx matches
// exactly:
//   x = (lng - WEST) / (EAST - WEST) * W
//   y = (NORTH - lat) / (NORTH - SOUTH) * H
// Run: node scripts/gen-worldmap.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync(new URL("./countries-110m.json", import.meta.url), "utf8"));

// --- minimal topojson decoder (no topojson-client dependency) ---
function transformPoint(t, p) {
  return t ? [p[0] * t.scale[0] + t.translate[0], p[1] * t.scale[1] + t.translate[1]] : p.slice();
}
function decodeArcs(topology) {
  const t = topology.transform;
  return topology.arcs.map((arc) => {
    let x = 0, y = 0;
    return arc.map((p) => {
      if (t) { x += p[0]; y += p[1]; return transformPoint(t, [x, y]); }
      return p.slice();
    });
  });
}
const arcs = decodeArcs(topo);
const arc = (i) => (i < 0 ? arcs[~i].slice().reverse() : arcs[i]);
function ring(arcIdxs) {
  const pts = [];
  for (const i of arcIdxs) {
    const a = arc(i);
    for (let k = pts.length ? 1 : 0; k < a.length; k++) pts.push(a[k]);
  }
  return pts;
}
function geomToFeature(g) {
  let coordinates;
  if (g.type === "Polygon") coordinates = g.arcs.map(ring);
  else if (g.type === "MultiPolygon") coordinates = g.arcs.map((poly) => poly.map(ring));
  else return null;
  return { type: "Feature", geometry: { type: g.type, coordinates }, properties: g.properties };
}
const land = {
  type: "FeatureCollection",
  features: topo.objects.countries.geometries.map(geomToFeature).filter(Boolean),
};

// --- crop window (Europe/Hamburg → Gulf → India) ---
// Keep WEST/EAST/NORTH/SOUTH in sync with WorldMap.tsx BOUNDS.
const WEST = -5, EAST = 92, NORTH = 60, SOUTH = 2;
const STEP = 1.05;      // degrees between samples (smaller = denser dots)
const R = 1.7;          // dot radius in viewBox units
const DOT = "#9fb0c3";  // soft slate blue-grey dots

// Viewbox sized to preserve real proportions of the crop.
const W = 1000;
const H = Math.round((W * (NORTH - SOUTH)) / (EAST - WEST));
const toX = (lng) => ((lng - WEST) / (EAST - WEST)) * W;
const toY = (lat) => ((NORTH - lat) / (NORTH - SOUTH)) * H;

const dots = [];
for (let lat = NORTH; lat >= SOUTH; lat -= STEP) {
  for (let lng = WEST; lng <= EAST; lng += STEP) {
    if (geoContains(land, [lng, lat])) {
      dots.push(`<circle cx="${toX(lng).toFixed(1)}" cy="${toY(lat).toFixed(1)}" r="${R}"/>`);
    }
  }
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">` +
  `<g fill="${DOT}">${dots.join("")}</g>` +
  `</svg>`;

writeFileSync(new URL("../public/world-dots.svg", import.meta.url), svg);
console.log("wrote public/world-dots.svg", svg.length, "bytes;", dots.length, "dots; frame", W, "x", H,
  "bounds", { WEST, EAST, NORTH, SOUTH });
