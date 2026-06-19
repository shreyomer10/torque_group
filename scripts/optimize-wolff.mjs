/**
 * One-off: optimize the Armaturen-Wolff (Hamburg) source JPGs into the
 * standard gallery encodings used elsewhere in the site:
 *   <slug>-thumb.webp  → 800×600 cover, for grid tiles & carousel
 *   <slug>-full.webp   → ≤1600px contain, for the lightbox
 *
 * Run from website/:  node scripts/optimize-wolff.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..", "public", "images", "infrastructure", "wolff");

const files = (await readdir(dir)).filter((f) => /^wolff-\d+\.jpg$/i.test(f));
files.sort();

let beforeTotal = 0;
let afterTotal = 0;

for (const file of files) {
  const stem = file.replace(/\.jpg$/i, "");
  const src = join(dir, file);
  beforeTotal += (await stat(src)).size;

  const thumbPath = join(dir, `${stem}-thumb.webp`);
  const fullPath = join(dir, `${stem}-full.webp`);

  await sharp(src)
    .rotate() // respect EXIF orientation
    .resize(800, 600, { fit: "cover", position: "centre" })
    .webp({ quality: 78 })
    .toFile(thumbPath);

  await sharp(src)
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(fullPath);

  afterTotal += (await stat(thumbPath)).size + (await stat(fullPath)).size;
  process.stdout.write(`✓ ${stem}\n`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `\nDone: ${files.length} photos. ${mb(beforeTotal)}MB source → ${mb(afterTotal)}MB webp (thumb+full).`
);
