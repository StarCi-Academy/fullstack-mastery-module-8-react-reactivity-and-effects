import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Nested layout render header chung trên mọi product page.
 * (EN: Flow 2 — Nested layout renders the shared header on every product page.)
 */
test("flow 2 — products layout header persists across [id] pages", async ({ page }) => {
    // Bước 1: navigate to first product (EN: Step 1: visit first product)
    await page.goto("/products/123")
    await expect(page.getByTestId("products-header")).toBeVisible()

    // Bước 2: navigate to another product (EN: Step 2: visit another product)
    await page.goto("/products/abc")
    await expect(page.getByTestId("products-header")).toBeVisible()
    await expect(page.getByTestId("product-title")).toContainText("abc")
})
