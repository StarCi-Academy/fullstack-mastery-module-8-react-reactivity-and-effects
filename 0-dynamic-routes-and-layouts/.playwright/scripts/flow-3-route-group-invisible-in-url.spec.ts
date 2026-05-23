import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Route group `(marketing)` không xuất hiện trong URL.
 * (EN: Flow 3 — Route group `(marketing)` is not visible in the URL.)
 */
test("flow 3 — /about works without (marketing) prefix", async ({ page }) => {
    // Bước 1: visit /about (EN: Step 1: visit /about)
    await page.goto("/about")
    await expect(page).toHaveURL(/\/about$/)

    // Bước 2: assert page rendered (EN: Step 2: page rendered)
    await expect(page.getByTestId("about-title")).toBeVisible()
})
