import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — clear all xóa hết query string.
 * (EN: Flow 3 — clear all empties the query string.)
 */
test("flow 3 — clear button empties the URL", async ({ page }) => {
    await page.goto("/products?category=book&sort=desc")

    // Bước 1: bấm clear (EN: click clear)
    await page.getByTestId("filter-clear").click()

    // Bước 2: assert URL không còn query (EN: URL has no query)
    await expect(page).toHaveURL(/\/products$/)
})
