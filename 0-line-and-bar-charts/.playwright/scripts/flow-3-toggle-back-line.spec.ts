import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Toggling Bar then back to Line keeps the chart visible.
 *
 * Round-trip: default Line -> Bar -> Line must always show a mounted chart.
 */
test("flow 3 — toggling bar then back to line keeps chart visible", async ({ page }) => {
    // Step 1: navigate to app root
    await page.goto("/")

    // Step 2: switch to bar chart
    await page.getByTestId("chart-type-bar").click()

    // Step 3: switch back to line chart
    await page.getByTestId("chart-type-line").click()

    // Step 4: chart container must be visible after the round-trip
    await expect(page.getByTestId("chart")).toBeVisible()
})
