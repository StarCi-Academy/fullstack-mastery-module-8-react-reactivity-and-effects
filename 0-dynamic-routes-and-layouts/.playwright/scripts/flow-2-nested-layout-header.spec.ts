import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Nested layout renders the shared header on every product page.
 */
test("flow 2 — products layout header persists across [id] pages", async ({ page }) => {
    // Step 1: visit first product
    await page.goto("/products/123")
    await expect(page.getByTestId("products-header")).toBeVisible()

    // Step 2: visit another product
    await page.goto("/products/abc")
    await expect(page.getByTestId("products-header")).toBeVisible()
    await expect(page.getByTestId("product-title")).toContainText("abc")
})
