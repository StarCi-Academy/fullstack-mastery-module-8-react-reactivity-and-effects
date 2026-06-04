import { test, expect } from "@playwright/test"

/**
 * Flow 2 — reload preserves the filter from URL.
 */
test("flow 2 — reload preserves filter state from URL", async ({ page }) => {
    // Step 1: visit URL with query params
    await page.goto("/products?category=game&sort=desc&priceMin=10")

    // Step 2: reload the page
    await page.reload()

    // Step 3: UI still reflects params
    await expect(page.getByTestId("filter-category")).toHaveValue("game")
    await expect(page.getByTestId("filter-sort")).toHaveValue("desc")
    await expect(page.getByTestId("filter-price-min")).toHaveValue("10")
})
