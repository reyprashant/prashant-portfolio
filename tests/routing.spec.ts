/**
 * Redirects, 404, robots, sitemap, OG image rendering and internal link crawl.
 */
import { expect, test } from "@playwright/test";

test("permanent redirects", async ({ request }) => {
  const cases: Array<[string, string]> = [
    ["/events", "/community#events"],
    ["/notes", "/blog"],
    ["/notes/some-post", "/blog/some-post"],
    ["/home", "/"],
    ["/index.html", "/"],
  ];
  for (const [from, to] of cases) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toContain(to.split("#")[0]);
  }
});

test("custom 404 returns 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("LOST");
  await expect(page.getByRole("link", { name: "Go home" })).toBeVisible();
});

test("robots and sitemap", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ["/about", "/work", "/community", "/blog", "/contact", "/privacy"]) {
    expect(xml).toContain(path);
  }
});

test("open graph images render", async ({ request }) => {
  for (const path of [
    "/opengraph-image",
    "/about/opengraph-image",
    "/blog/opengraph-image",
    "/contact/opengraph-image",
  ]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()["content-type"], path).toContain("image/png");
  }
});

test("no broken internal links", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const start of ["/", "/about", "/work", "/community", "/blog", "/contact", "/privacy"]) {
    await page.goto(start);
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((els) =>
        els.map((el) => (el as HTMLAnchorElement).getAttribute("href") ?? ""),
      );
    for (const href of hrefs) {
      const path = href.split("#")[0] || "/";
      if (seen.has(path)) continue;
      seen.add(path);
      const res = await request.get(path, { maxRedirects: 5 });
      expect(res.status(), `${href} from ${start}`).toBeLessThan(400);
    }
  }
  expect(seen.size).toBeGreaterThan(5);
});

test("structured data is present and valid JSON", async ({ page }) => {
  await page.goto("/about");
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(scripts.length).toBeGreaterThanOrEqual(2);
  const types = scripts.flatMap((s) => {
    const parsed = JSON.parse(s);
    return (Array.isArray(parsed) ? parsed : [parsed]).map(
      (d: { "@type": string }) => d["@type"],
    );
  });
  expect(types).toEqual(
    expect.arrayContaining([
      "Person",
      "EducationalOrganization",
      "Organization",
      "WebSite",
      "BreadcrumbList",
    ]),
  );
});
