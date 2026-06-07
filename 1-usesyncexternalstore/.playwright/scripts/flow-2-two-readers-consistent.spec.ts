import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Two components subscribed to the SAME external store always render
 * identical values: no tearing. useSyncExternalStore guarantees consistency
 * across every reader within a render pass.
 */
test("flow 2 — both readers stay consistent through a burst of updates", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: both readers start at 0 and agree
    await expect(page.getByTestId("tick-a")).toHaveText("0")
    await expect(page.getByTestId("tick-b")).toHaveText("0")

    // Step 3: apply a synchronous burst of 5 increments in one click
    await page.getByTestId("btn-burst").click()

    // Step 4: both readers reflect the same committed value (5), never tearing
    await expect(page.getByTestId("tick-a")).toHaveText("5")
    await expect(page.getByTestId("tick-b")).toHaveText("5")

    // Step 5: one more single increment — still consistent
    await page.getByTestId("btn-inc").click()
    await expect(page.getByTestId("tick-a")).toHaveText("6")
    await expect(page.getByTestId("tick-b")).toHaveText("6")
})
