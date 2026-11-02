/**
 * Shared test helpers.
 */
import type { Page } from "@playwright/test";

/**
 * Scrolls through the whole document in viewport-sized steps so every
 * section's reveal has fired, then returns to the top. Mirrors a reader.
 */
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await wait(60);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await wait(120);
    window.scrollTo(0, 0);
    await wait(650);
  });
}
