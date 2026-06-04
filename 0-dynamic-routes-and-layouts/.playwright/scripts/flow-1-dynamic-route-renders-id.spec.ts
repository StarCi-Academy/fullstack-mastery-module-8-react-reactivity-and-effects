import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Dynamic route renders params.id.
 */
test("flow 1 — /products/123 renders dynamic id", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/products/123")

    // Step 2: title contains the id
    await expect(page.getByTestId("product-title")).toContainText("123")
    await expect(page.getByTestId("product-id")).toContainText("id = 123")
})
