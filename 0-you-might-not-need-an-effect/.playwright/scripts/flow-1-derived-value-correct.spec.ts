import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Derived value is correct in the fixed panel.
 *
 * Typing a query computes the filtered list inline during render; the match
 * count and the rendered rows must reflect the query immediately.
 */
test("flow 1 — typing a query filters the fixed list to the matching rows", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: empty query shows all 6 seed users
    await expect(page.getByTestId("fixed-count")).toHaveText("6")

    // Step 3: type "ar" — only Carol matches
    await page.getByTestId("fixed-search").fill("ar")
    await expect(page.getByTestId("fixed-count")).toHaveText("1")
    await expect(page.getByTestId("fixed-row-3")).toBeVisible()

    // Step 4: clear query — back to all 6
    await page.getByTestId("fixed-search").fill("")
    await expect(page.getByTestId("fixed-count")).toHaveText("6")
})
