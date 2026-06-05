import { test, expect } from "@playwright/test"

/**
 * Flow 3 — All three chart containers remain visible after switching metric.
 *
 * Switching the active metric must never unmount any chart card;
 * only the data fed into each chart changes. This test verifies the
 * Dashboard's composed layout is stable across metric transitions.
 */
test("flow 3 — all three charts visible on revenue and remain visible after switching to orders", async ({ page }) => {
    // Step 1: navigate to the dashboard (default metric = revenue)
    await page.goto("/")

    // Step 2: assert all three chart containers are present on the default metric
    await expect(page.getByTestId("chart-line")).toBeVisible()
    await expect(page.getByTestId("chart-bar")).toBeVisible()
    await expect(page.getByTestId("chart-pie")).toBeVisible()

    // Step 3: switch to Orders metric
    await page.getByTestId("metric-orders").click()

    // Step 4: all three chart containers must still be visible after the switch
    await expect(page.getByTestId("chart-line")).toBeVisible()
    await expect(page.getByTestId("chart-bar")).toBeVisible()
    await expect(page.getByTestId("chart-pie")).toBeVisible()
})
