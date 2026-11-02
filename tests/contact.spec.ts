/**
 * Contact form behaviour in a non-production build: validation errors,
 * honeypot and minimum fill time. Delivery is logged, not sent.
 */
import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("shows field errors for an empty submit", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await expect(form).toBeVisible();
    // Disable native validation so the server validates.
    await form.evaluate((el) =>
      (el as HTMLFormElement).setAttribute("novalidate", "true"),
    );
    // Wait past the minimum fill time so the timing guard does not trigger first.
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("rejects a submission that is too fast", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name", { exact: true }).fill("Test Person");
    await page.getByLabel("Email", { exact: true }).fill("test@example.com");
    await page.getByLabel("What's this about").selectOption("Other");
    await page
      .getByLabel("Message", { exact: true })
      .fill("This is a sufficiently long test message for the form.");
    await page.getByRole("button", { name: "Send message" }).click();
    // Submitted well under 3 seconds after render: the token check fails.
    await expect(page.getByText(/not sent|try again/i).first()).toBeVisible();
  });

  test("accepts a valid submission after the minimum fill time", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name", { exact: true }).fill("Test Person");
    await page.getByLabel("Email", { exact: true }).fill("test@example.com");
    await page.getByLabel("What's this about").selectOption("Mentorship");
    await page
      .getByLabel("Message", { exact: true })
      .fill("This is a sufficiently long test message for the form.");
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toContainText("Thanks");
  });
});
