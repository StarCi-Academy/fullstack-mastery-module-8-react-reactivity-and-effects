import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Toggling to bar chart renders the chart and preserves summary values.
 *
 * Clicking chart-type-bar must switch to BarChart while keeping point-count = 12.
 */
test("flow 2 — clicking Bar toggle renders chart and keeps point-count 12", async ({ page }) => {
    // Step 1: navigate to app root
    await page.goto("/")

    // Step 2: click the Bar toggle button
    await page.getByTestId("chart-type-bar").click()

    // Step 3: chart container must remain visible after the toggle
    await expect(page.getByTestId("chart")).toBeVisible()

    // Step 4: point-count is data-driven and must not change on toggle
    await expect(page.getByTestId("point-count")).toHaveText("12")
})
