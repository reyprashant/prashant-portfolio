// Viewport-sized crops of specific regions at 1x for close inspection.
import { chromium } from "@playwright/test";
const out = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.locator("#what-i-do").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.locator("#what-i-do").screenshot({ path: `${out}/crop-cards.png` });
await page.locator("#community").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.locator("#community").screenshot({ path: `${out}/crop-community.png` });
await page.locator("#zenox").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.locator("#zenox").screenshot({ path: `${out}/crop-zenox.png` });
await page.goto("http://localhost:3100/contact", { waitUntil: "networkidle" });
await page.locator("form").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/crop-contact.png` });
// Mobile menu open state
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await m.getByRole("button", { name: "Open menu" }).click();
await m.waitForTimeout(500);
await m.screenshot({ path: `${out}/crop-mobile-menu.png` });
await browser.close();
console.log("crops saved");
