import { test, expect } from "@playwright/test"

/**
 * Flow 2 — The Recharts LineChart container is visible in the DOM on load.
 *
 * The chart SVG is wrapped in a div with data-testid="chart" (rendered by
 * ResponsiveChart). Asserting visibility on this wrapper avoids fragile SVG
 * internals while still confirming the chart mounts successfully.
 */
test("flow 2 — chart container is visible after page load", async ({ page }) => {
    // Step 1: navigate to the app root
    await page.goto("/")

    // Step 2: the chart wrapper div must be visible — proves ResponsiveContainer
    // and LineChart rendered without error
    await expect(page.getByTestId("chart")).toBeVisible()
})
