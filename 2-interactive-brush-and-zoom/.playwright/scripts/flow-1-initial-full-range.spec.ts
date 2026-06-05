import { test, expect } from "@playwright/test"

/**
 * Flow 1 — On initial load the brush covers the full 24-point range.
 *
 * Expected values computed from DAY_DATA (data.ts, 24 points, indices 0–23):
 *   range-start : 0
 *   range-end   : 23
 *   range-count : 24
 *   range-sum   : 5475  (sum of all .value fields)
 */
test("flow 1 — initial load shows full range with correct aggregate stats", async ({ page }) => {
    // Step 1: navigate to the app
    await page.goto("/")

    // Step 2: chart container is visible
    await expect(page.getByTestId("chart")).toBeVisible()

    // Step 3: brush start index is 0 (first point)
    await expect(page.getByTestId("range-start")).toHaveText("0")

    // Step 4: brush end index is 23 (last of 24 points)
    await expect(page.getByTestId("range-end")).toHaveText("23")

    // Step 5: count = 24 points in window
    await expect(page.getByTestId("range-count")).toHaveText("24")

    // Step 6: sum of all value fields = 5475
    await expect(page.getByTestId("range-sum")).toHaveText("5475")
})
