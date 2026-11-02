/**
 * Header navigation: desktop dropdowns open on hover and keyboard, close on
 * Escape, and every dropdown target exists on its page. Mobile menu lists
 * the same children under their parent.
 */
import { expect, test } from "@playwright/test";

const dropdowns = [
  { label: "Work", children: ["Zenox Academy", "Diorite Innovation"] },
  {
    label: "Community",
    children: ["Code For Change", "AI Community in Nepal", "NIC Student Ambassadors Program"],
  },
];

test("desktop dropdowns", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation only");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });

  for (const group of dropdowns) {
    const button = nav.getByRole("button", { name: `${group.label} submenu` });
    await expect(button).toHaveAttribute("aria-expanded", "false");

    // Hover opens.
    await nav.getByRole("link", { name: group.label, exact: true }).hover();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    for (const child of group.children) {
      await expect(nav.getByRole("link", { name: child })).toBeVisible();
    }

    // Escape closes and returns focus to the button.
    await button.focus();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();

    // Keyboard opens and moves into the first item.
    await page.keyboard.press("ArrowDown");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: group.children[0]! })).toBeFocused();
    await page.keyboard.press("Escape");
    await page.mouse.move(0, 0);
  }
});

test("dropdown targets exist", async ({ page }) => {
  const targets = [
    ["/work", ["zenox", "diorite"]],
    ["/community", ["code-for-change", "aicn", "nic"]],
  ] as const;
  for (const [path, ids] of targets) {
    await page.goto(path);
    for (const id of ids) {
      await expect(page.locator(`#${id}`), `${path}#${id}`).toHaveCount(1);
    }
  }
});

test("mobile menu lists dropdown children", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const panel = page.getByRole("navigation", { name: "Primary" });
  for (const group of dropdowns) {
    for (const child of group.children) {
      await expect(panel.getByRole("link", { name: child })).toBeVisible();
    }
  }
  await expect(panel.getByRole("link", { name: "Blog" })).toBeVisible();
});
