import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Default metric (revenue) shows the correct KPI total and all three charts.
 *
 * Revenue monthly total computed from src/lib/data.ts:
 *   12400 + 14800 + 13200 + 15600 + 17900 + 16400 + 19200 + 21500
 *   + 20100 + 22800 + 25300 + 28600 = 227,800
 *
 * The DOM renders total.toLocaleString() — en-US default produces "227,800".
 */
test("flow 1 — default metric (revenue) shows KPI total 227,800 and all charts", async ({ page }) => {
    // Step 1: navigate to the dashboard
    await page.goto("/")

    // Step 2: the KPI total must equal the revenue grand total
    await expect(page.getByTestId("kpi-total")).toHaveText("227,800")

    // Step 3: all three chart containers must be visible
    await expect(page.getByTestId("chart-line")).toBeVisible()
    await expect(page.getByTestId("chart-bar")).toBeVisible()
    await expect(page.getByTestId("chart-pie")).toBeVisible()
})
