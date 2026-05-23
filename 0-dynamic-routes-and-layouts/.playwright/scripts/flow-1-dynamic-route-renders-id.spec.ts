import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Dynamic route hiển thị params.id.
 * (EN: Flow 1 — Dynamic route renders params.id.)
 */
test("flow 1 — /products/123 renders dynamic id", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/products/123")

    // Bước 2: assert title contains id (EN: Step 2: title contains the id)
    await expect(page.getByTestId("product-title")).toContainText("123")
    await expect(page.getByTestId("product-id")).toContainText("id = 123")
})
