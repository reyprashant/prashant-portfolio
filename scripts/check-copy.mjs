/**
 * Copy lint: fails the build when banned characters or words appear in
 * site content or components.
 *
 * Checks (from IMPLEMENTATION_PLAN.md section 2 and brief 1.6):
 *   - no em dashes (U+2014)
 *   - no emoji code points
 *   - no banned marketing words
 *
 * Usage: node scripts/check-copy.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src/data", "src/app", "src/components", "src/content"];
const BANNED_WORDS = [
  "visionary",
  "disruptor",
  "thought leader",
  "empire",
  "crushing it",
  "game-changer",
  "revolutionising",
  "revolutionizing",
  "synergy",
  "world-class",
  "passionate",
  "guru",
  "serial entrepreneur",
  "10x",
];
const EM_DASH = /—/g;
// Emoji presentation characters and common emoji blocks.
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}\u{FE0F}]/u;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|css|mdx?)$/.test(entry)) out.push(full);
  }
  return out;
}

let problems = 0;
for (const root of ROOTS) {
  let files = [];
  try {
    files = walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      const where = `${relative(process.cwd(), file)}:${i + 1}`;
      if (EM_DASH.test(line)) {
        console.error(`${where}: em dash found`);
        problems++;
      }
      if (EMOJI.test(line)) {
        console.error(`${where}: emoji found`);
        problems++;
      }
      const lower = line.toLowerCase();
      for (const word of BANNED_WORDS) {
        // Only flag prose-like occurrences, skip the banned list itself.
        if (lower.includes(word) && !file.endsWith("check-copy.mjs")) {
          console.error(`${where}: banned word "${word}"`);
          problems++;
        }
      }
    });
  }
}

if (problems > 0) {
  console.error(`\ncheck-copy: ${problems} problem(s) found.`);
  process.exit(1);
}
console.log("check-copy: clean.");
