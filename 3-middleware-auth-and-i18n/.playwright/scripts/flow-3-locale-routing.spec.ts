import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — middleware đảm bảo locale prefix; /en/about render English.
 * (EN: Flow 3 — middleware enforces locale prefix; /en/about renders English.)
 */
test("flow 3 — /en/about renders English content", async ({ page }) => {
    // Bước 1: visit /en/about (EN: visit /en/about)
    await page.goto("/en/about")

    // Bước 2: assert English content (EN: assert English content)
    await expect(page.getByTestId("about-title")).toHaveText("About")
    await expect(page.getByTestId("about-locale")).toContainText("en")
})
