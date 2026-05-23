import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — reload giữ nguyên filter từ URL.
 * (EN: Flow 2 — reload preserves the filter from URL.)
 */
test("flow 2 — reload preserves filter state from URL", async ({ page }) => {
    // Bước 1: vào URL có query params (EN: visit URL with query params)
    await page.goto("/products?category=game&sort=desc&priceMin=10")

    // Bước 2: reload (EN: reload the page)
    await page.reload()

    // Bước 3: assert UI vẫn phản chiếu params (EN: UI still reflects params)
    await expect(page.getByTestId("filter-category")).toHaveValue("game")
    await expect(page.getByTestId("filter-sort")).toHaveValue("desc")
    await expect(page.getByTestId("filter-price-min")).toHaveValue("10")
})
