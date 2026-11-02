// Full-page screenshots for visual review. Not part of the test suite.
import { chromium } from "@playwright/test";
const out = process.argv[2];
const base = "http://localhost:3100";
const browser = await chromium.launch();
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const path of [
    "/",
    "/about",
    "/work",
    "/community",
    "/contact",
    "/privacy",
    "/nope",
  ]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const step = Math.floor(window.innerHeight * 0.8);
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await wait(60);
      }
    });
    // IntersectionObserver callbacks are delivered after the evaluate returns; give them time, then the 0.5s transition.
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    const file = `${out}/${name}${path === "/" ? "-home" : path.replace(/\//g, "-")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
  }
  await ctx.close();
}
await browser.close();
