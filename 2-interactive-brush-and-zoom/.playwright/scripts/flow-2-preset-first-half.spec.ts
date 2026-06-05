import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Clicking "First half" preset narrows the brush to indices 0–11.
 *
 * Expected values computed from DAY_DATA indices 0–11 (12 points):
 *   D1–D12 values: 120+95+140+160+130+175+200+185+210+195+230+215 = 2055
 *   range-end   : 11
 *   range-count : 12
 *   range-sum   : 2055
 */
test("flow 2 — preset-first-half selects indices 0–11 and shows correct aggregate stats", async ({ page }) => {
    // Step 1: navigate to the app
    await page.goto("/")

    // Step 2: chart container is visible
    await expect(page.getByTestId("chart")).toBeVisible()

    // Step 3: click the "First half" preset button
    await page.getByTestId("preset-first-half").click()

    // Step 4: start index remains 0
    await expect(page.getByTestId("range-start")).toHaveText("0")

    // Step 5: end index moves to 11 (floor(24/2) - 1)
    await expect(page.getByTestId("range-end")).toHaveText("11")

    // Step 6: count = 12 points in window
    await expect(page.getByTestId("range-count")).toHaveText("12")

    // Step 7: sum of values for indices 0–11 = 2055
    await expect(page.getByTestId("range-sum")).toHaveText("2055")
})
