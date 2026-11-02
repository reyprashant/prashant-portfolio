import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => {
  if (["error", "warning"].includes(m.type()))
    console.log("CONSOLE", m.type(), m.text().slice(0, 400));
});
page.on("pageerror", (e) => console.log("PAGEERROR", e.message.slice(0, 400)));
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const el = document.querySelector("#what-i-do h2");
  const cs = el && getComputedStyle(el);
  const wrap = el?.closest("[style]");
  return {
    h2: el?.textContent,
    color: cs?.color,
    opacity: cs?.opacity,
    wrapStyle: wrap?.getAttribute("style"),
    wrapTag: wrap?.tagName,
    hydrated: !!document.querySelector("[data-reactroot], #__next"),
  };
});
console.log(JSON.stringify(info));
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(1200);
console.log(
  await page.evaluate(() => {
    const el = document.querySelector("#what-i-do h2");
    const w = el?.closest("[style]");
    return w?.getAttribute("style");
  }),
);
await browser.close();
