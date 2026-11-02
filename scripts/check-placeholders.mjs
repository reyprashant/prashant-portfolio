/**
 * Lists everything that still needs real content before launch:
 *   - "[ADD:" markers and TODO_CONTENT entries in src/data
 *   - images flagged placeholder: true in src/data/images.ts
 *
 * Warns by default. Run with --strict (used at launch) to exit non-zero
 * when anything remains.
 *
 * Usage: node scripts/check-placeholders.mjs [--strict]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const strict = process.argv.includes("--strict");
const DATA_DIR = "src/data";

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

const findings = [];
for (const file of walk(DATA_DIR)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const where = `${relative(process.cwd(), file)}:${i + 1}`;
    if (line.includes("[ADD:")) findings.push(`${where}  ${line.trim()}`);
    if (/TODO_CONTENT/.test(line) && !/^\s*\/\//.test(line))
      findings.push(`${where}  ${line.trim()}`);
    // A literal placeholder: true marks a temporary stand-in image.
    if (/placeholder:\s*true/.test(line)) findings.push(`${where}  placeholder image`);
  });
}

if (findings.length === 0) {
  console.log("check-placeholders: nothing outstanding.");
  process.exit(0);
}
console.log(`check-placeholders: ${findings.length} item(s) still need real content:\n`);
for (const f of findings) console.log("  " + f);
if (strict) process.exit(1);
