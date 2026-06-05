import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Summary stat chips render the correct pre-computed values.
 *
 * TOTAL_VALUE = sum of all 12 MONTHLY_REVENUE entries = 123200
 * AVG_VALUE   = Math.round(123200 / 12)               = 10267
 *
 * Both values are static constants exported from src/lib/data.ts and rendered
 * as plain text inside data-testid spans — no interaction required.
 */
test("flow 1 — summary chips display correct total and average", async ({ page }) => {
    // Step 1: navigate to the app root
    await page.goto("/")

    // Step 2: assert total stat chip shows the exact sum of all 12 revenue values
    await expect(page.getByTestId("total-value")).toHaveText("123200")

    // Step 3: assert avg stat chip shows the rounded average (Math.round(123200/12))
    await expect(page.getByTestId("avg-value")).toHaveText("10267")
})
