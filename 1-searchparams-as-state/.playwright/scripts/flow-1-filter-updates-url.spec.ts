import { test, expect } from "@playwright/test"

/**
 * Flow 1 — selecting a filter updates the URL.
 */
test("flow 1 — selecting category updates URL", async ({ page }) => {
    await page.goto("/products")

    // Step 1: pick category=book
    await page.getByTestId("filter-category").selectOption("book")

    // Step 2: URL contains category=book
    await expect(page).toHaveURL(/category=book/)
    await expect(page.getByTestId("filter-state")).toContainText('"category": "book"')
})
