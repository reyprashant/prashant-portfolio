/**
 * Blog: the index renders, and when a post is published (or drafts are
 * included with SHOW_DRAFT_POSTS=true at build time) the post page has one
 * H1, Article JSON-LD, a canonical URL and a rendering OG image.
 */
import { expect, test } from "@playwright/test";

test("blog index and first post", async ({ page, request }) => {
  await page.goto("/blog");
  await expect(page.locator("h1")).toHaveCount(1);

  const first = page.locator("main article h2 a").first();
  if ((await first.count()) === 0) {
    test.info().annotations.push({
      type: "note",
      description: "No published posts; post page checks skipped.",
    });
    await expect(page.getByText("Nothing published yet.")).toBeVisible();
    return;
  }

  const href = await first.getAttribute("href");
  expect(href).toMatch(/^\/blog\//);
  await page.goto(href!);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Blog");

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(new URL(canonical!).pathname).toBe(href);

  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = scripts.flatMap((s) => {
    const parsed = JSON.parse(s);
    return (Array.isArray(parsed) ? parsed : [parsed]).map((d: { "@type": string }) => d["@type"]);
  });
  expect(types).toContain("Article");

  const og = await request.get(`${href}/opengraph-image`);
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(href);
});
