import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Route group `(marketing)` is not visible in the URL.
 */
test("flow 3 — /about works without (marketing) prefix", async ({ page }) => {
    // Step 1: visit /about
    await page.goto("/about")
    await expect(page).toHaveURL(/\/about$/)

    // Step 2: page rendered
    await expect(page.getByTestId("about-title")).toBeVisible()
})
