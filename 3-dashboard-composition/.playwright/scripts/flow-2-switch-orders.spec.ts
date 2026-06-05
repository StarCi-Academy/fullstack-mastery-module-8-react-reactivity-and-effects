import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Clicking the Orders toggle updates the KPI total to the orders grand total.
 *
 * Orders monthly total computed from src/lib/data.ts:
 *   340 + 420 + 390 + 460 + 510 + 480 + 560 + 620
 *   + 590 + 650 + 710 + 780 = 6,510
 *
 * The DOM renders total.toLocaleString() — en-US default produces "6,510".
 */
test("flow 2 — switching to orders metric updates KPI total to 6,510", async ({ page }) => {
    // Step 1: navigate to the dashboard
    await page.goto("/")

    // Step 2: click the Orders metric toggle button
    await page.getByTestId("metric-orders").click()

    // Step 3: the KPI total must equal the orders grand total
    await expect(page.getByTestId("kpi-total")).toHaveText("6,510")
})
