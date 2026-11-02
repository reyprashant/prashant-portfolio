/**
 * Verifies every image referenced in src/data/images.ts.
 *   - remote URLs must answer 200 with an image content type
 *   - local paths must exist under /public
 *
 * Usage: node scripts/verify-images.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync("src/data/images.ts", "utf8");
// Every src string passed to local() or written as a literal.
const srcs = [...new Set([...source.matchAll(/"(\/images\/[^"]+|https?:\/\/[^"]+)"/g)].map((m) => m[1]))];

if (srcs.length === 0) {
  console.error("verify-images: no src entries found in src/data/images.ts");
  process.exit(1);
}

let failures = 0;
for (const src of srcs) {
  if (src.startsWith("http")) {
    try {
      const res = await fetch(src, { method: "HEAD", redirect: "follow" });
      const type = res.headers.get("content-type") ?? "";
      if (!res.ok || !type.startsWith("image/")) {
        console.error(`FAIL ${res.status} ${type || "no content-type"}  ${src}`);
        failures++;
      } else {
        console.log(`ok   ${res.status} ${type.padEnd(12)} ${src.slice(0, 80)}`);
      }
    } catch (error) {
      console.error(`FAIL network  ${src}  ${error.message}`);
      failures++;
    }
  } else {
    const local = join("public", src);
    if (existsSync(local)) console.log(`ok   local  ${src}`);
    else {
      console.error(`FAIL missing ${local}`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`\nverify-images: ${failures} failure(s).`);
  process.exit(1);
}
console.log(`\nverify-images: all ${srcs.length} image(s) reachable.`);
