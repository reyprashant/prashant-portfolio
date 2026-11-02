/**
 * Per-page checks: one H1, title, description length, canonical, OG image,
 * breadcrumbs on inner pages, no horizontal scroll, axe accessibility scan.
 */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { scrollThrough } from "./helpers";

const pages = [
  { path: "/", inner: false },
  { path: "/about", inner: true },
  { path: "/work", inner: true },
  { path: "/community", inner: true },
  { path: "/blog", inner: true },
  { path: "/contact", inner: true },
  { path: "/privacy", inner: true },
];

for (const page of pages) {
  test.describe(page.path, () => {
    test("structure and metadata", async ({ page: browser }) => {
      const response = await browser.goto(page.path);
      expect(response?.status()).toBe(200);

      await expect(browser.locator("h1")).toHaveCount(1);
      await expect(browser).toHaveTitle(/Prashant Adhikari/);

      const description = await browser
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThanOrEqual(140);
      expect(description?.length ?? 0).toBeLessThanOrEqual(160);
      expect(description).toContain("Pokhara");

      const canonical = await browser
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(new URL(canonical!).pathname).toBe(page.path);

      const og = await browser
        .locator('meta[property="og:image"]')
        .first()
        .getAttribute("content");
      expect(og).toContain("opengraph-image");

      if (page.inner) {
        await expect(
          browser.getByRole("navigation", { name: "Breadcrumb" }),
        ).toBeVisible();
      }

      // Skip link is the first focusable element.
      await browser.keyboard.press("Tab");
      await expect(browser.getByRole("link", { name: "Skip to content" })).toBeFocused();

      // No horizontal scroll.
      const overflow = await browser.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("accessibility (axe)", async ({ page: browser }) => {
      await browser.goto(page.path);
      // Let every section reveal before measuring colours.
      await scrollThrough(browser);
      const results = await new AxeBuilder({ page: browser })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  });
}
