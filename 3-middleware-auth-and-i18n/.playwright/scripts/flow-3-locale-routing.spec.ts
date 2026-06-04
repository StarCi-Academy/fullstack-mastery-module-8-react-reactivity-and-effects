import { test, expect } from "@playwright/test"

/**
 * Flow 3 — middleware enforces locale prefix; /en/about renders English.
 */
test("flow 3 — /en/about renders English content", async ({ page }) => {
    // Step 1: visit /en/about
    await page.goto("/en/about")

    // Step 2: assert English content
    await expect(page.getByTestId("about-title")).toHaveText("About")
    await expect(page.getByTestId("about-locale")).toContainText("en")
})
