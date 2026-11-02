/**
 * Converts supplied JPG and PNG photographs under public/images to WebP,
 * resized to a sane maximum width, so real photos ship optimised at source.
 * next/image still serves AVIF/WebP on top of this.
 *
 * Usage: node scripts/optimize-images.mjs [--max 2880] [--quality 82]
 * Output: a sibling .webp next to each source file. Originals are kept.
 */
import { readdirSync, statSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? Number(args[i + 1]) : fallback;
};
const MAX_WIDTH = flag("max", 2880);
const QUALITY = flag("quality", 82);
const ROOT = "public/images";

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png)$/i.test(entry)) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
if (files.length === 0) {
  console.log("optimize-images: no JPG or PNG files found under public/images.");
  process.exit(0);
}

for (const file of files) {
  const out = join(dirname(file), basename(file, extname(file)) + ".webp");
  const image = sharp(file).rotate();
  const meta = await image.metadata();
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);
  await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const info = await sharp(out).metadata();
  console.log(`${file} -> ${out} (${info.width}x${info.height})`);
}
console.log(`optimize-images: converted ${files.length} file(s).`);
