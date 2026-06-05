import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Line chart renders with correct deterministic summary values.
 *
 * MONTHLY_REVENUE has 12 entries; max revenue is 260 (December).
 */
test("flow 1 — line chart renders with point-count 12 and max-value 260", async ({ page }) => {
    // Step 1: navigate to app root
    await page.goto("/")

    // Step 2: assert point-count summary reflects all 12 data points
    await expect(page.getByTestId("point-count")).toHaveText("12")

    // Step 3: assert max-value summary reflects December revenue (260)
    await expect(page.getByTestId("max-value")).toHaveText("260")

    // Step 4: chart container must be visible (Recharts SVG is mounted)
    await expect(page.getByTestId("chart")).toBeVisible()
})
