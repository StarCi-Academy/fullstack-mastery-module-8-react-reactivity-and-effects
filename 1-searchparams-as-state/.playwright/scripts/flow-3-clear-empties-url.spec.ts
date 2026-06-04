import { test, expect } from "@playwright/test"

/**
 * Flow 3 — clear all empties the query string.
 */
test("flow 3 — clear button empties the URL", async ({ page }) => {
    await page.goto("/products?category=book&sort=desc")

    // Step 1: click clear
    await page.getByTestId("filter-clear").click()

    // Step 2: URL has no query
    await expect(page).toHaveURL(/\/products$/)
})
