import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — chọn filter cập nhật URL.
 * (EN: Flow 1 — selecting a filter updates the URL.)
 */
test("flow 1 — selecting category updates URL", async ({ page }) => {
    await page.goto("/products")

    // Bước 1: chọn category=book (EN: pick category=book)
    await page.getByTestId("filter-category").selectOption("book")

    // Bước 2: assert URL chứa category=book (EN: URL contains category=book)
    await expect(page).toHaveURL(/category=book/)
    await expect(page.getByTestId("filter-state")).toContainText('"category": "book"')
})
