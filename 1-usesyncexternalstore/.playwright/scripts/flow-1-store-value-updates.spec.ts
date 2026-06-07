import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Subscribing to the external store via useSyncExternalStore yields the
 * exact current value, and a reader re-renders only when the store changes.
 */
test("flow 1 — incrementing the external store updates the reader value", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: baseline value must be the store's initial snapshot (0)
    await expect(page.getByTestId("tick-a")).toHaveText("0")

    // Step 3: capture reader A's render count before any change
    const initialRenders = await page.getByTestId("render-a").innerText()

    // Step 4: click +1 → the snapshot advances to 1
    await page.getByTestId("btn-inc").click()
    await expect(page.getByTestId("tick-a")).toHaveText("1")

    // Step 5: the reader re-rendered (render count strictly increased)
    const afterRenders = await page.getByTestId("render-a").innerText()
    expect(Number(afterRenders)).toBeGreaterThan(Number(initialRenders))
})
