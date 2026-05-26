import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname.replace(/^\/(\w):/, '$1:');

const files = await readdir(PUBLIC_DIR);
const jpegs = files.filter((f) => /\.(jpe?g)$/i.test(f));

if (jpegs.length === 0) {
  console.log('No JPEGs found in /public');
  process.exit(0);
}

let converted = 0;
let skipped = 0;
let totalSrc = 0;
let totalOut = 0;

for (const file of jpegs) {
  const src = join(PUBLIC_DIR, file);
  const out = join(PUBLIC_DIR, `${parse(file).name}.webp`);

  try {
    const outStat = await stat(out).catch(() => null);
    const srcStat = await stat(src);
    if (outStat && outStat.mtimeMs > srcStat.mtimeMs) {
      skipped++;
      continue;
    }

    await sharp(src).webp({ quality: 82 }).toFile(out);
    const finalStat = await stat(out);
    totalSrc += srcStat.size;
    totalOut += finalStat.size;
    converted++;
    console.log(
      `  ${file} → ${parse(file).name}.webp ` +
        `(${Math.round(srcStat.size / 1024)}KB → ${Math.round(finalStat.size / 1024)}KB)`,
    );
  } catch (err) {
    console.error(`  Failed: ${file}`, err.message);
  }
}

const pct = totalSrc ? Math.round((1 - totalOut / totalSrc) * 100) : 0;
console.log(
  `\nDone. Converted: ${converted}, skipped: ${skipped}. Savings: ${pct}% ` +
    `(${Math.round(totalSrc / 1024)}KB → ${Math.round(totalOut / 1024)}KB)`,
);
