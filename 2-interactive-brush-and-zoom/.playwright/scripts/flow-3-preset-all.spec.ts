import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Clicking "First half" then "All" restores the full 24-point range.
 *
 * Verifies that preset-all correctly resets the brush after a narrowed selection.
 *   range-end   : 23
 *   range-count : 24
 */
test("flow 3 — preset-first-half then preset-all restores full range", async ({ page }) => {
    // Step 1: navigate to the app
    await page.goto("/")

    // Step 2: chart container is visible
    await expect(page.getByTestId("chart")).toBeVisible()

    // Step 3: narrow to first half first
    await page.getByTestId("preset-first-half").click()

    // Step 4: confirm the range is now narrowed (end = 11)
    await expect(page.getByTestId("range-end")).toHaveText("11")

    // Step 5: click "All" to restore the full range
    await page.getByTestId("preset-all").click()

    // Step 6: end index is back to 23
    await expect(page.getByTestId("range-end")).toHaveText("23")

    // Step 7: count is back to 24
    await expect(page.getByTestId("range-count")).toHaveText("24")
})
