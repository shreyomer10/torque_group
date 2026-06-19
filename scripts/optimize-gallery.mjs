/**
 * Optimize raw gallery source images into the standard encodings used across
 * the infrastructure galleries:
 *   <slug>-thumb.webp  → 800×600 cover, for grid tiles & carousel
 *   <slug>-full.webp   → ≤1600px contain, for the lightbox
 *
 * Usage from website/:
 *   node scripts/optimize-gallery.mjs subhag torque-pune
 *   node scripts/optimize-gallery.mjs            # all infrastructure folders
 *
 * Source files (.jpg/.jpeg/.png) keep their stem as the slug. Existing
 * *-thumb.webp / *-full.webp outputs are skipped as inputs.
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "public", "images", "infrastructure");

const SRC_RE = /\.(jpe?g|png)$/i;
const isSource = (f) => SRC_RE.test(f) && !/-(thumb|full)\.webp$/i.test(f);

const folders = process.argv.slice(2);
const targets = folders.length
  ? folders
  : (await readdir(root, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

let beforeTotal = 0;
let afterTotal = 0;
let count = 0;

for (const folder of targets) {
  const dir = join(root, folder);
  let files;
  try {
    files = (await readdir(dir)).filter(isSource);
  } catch {
    console.warn(`! skip ${folder} (no such folder)`);
    continue;
  }
  if (!files.length) {
    console.log(`— ${folder}: no raw sources, already optimized`);
    continue;
  }
  files.sort();
  console.log(`\n${folder}/`);

  for (const file of files) {
    const stem = basename(file, extname(file));
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
    count++;
    process.stdout.write(`  ✓ ${stem}\n`);
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `\nDone: ${count} photos. ${mb(beforeTotal)}MB source → ${mb(afterTotal)}MB webp (thumb+full).`
);
