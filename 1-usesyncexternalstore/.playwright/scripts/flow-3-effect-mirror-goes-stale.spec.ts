import { test, expect } from "@playwright/test"

/**
 * Flow 3 — The useSyncExternalStore reader tracks the store exactly, while the
 * useEffect mirror snapshots once and then goes stale. This is the concrete
 * failure of the effect-mirror anti-pattern the lesson warns against.
 */
test("flow 3 — sync reader advances, effect mirror stays stale", async ({ page }) => {
    // Step 1: navigate; both start at 0
    await page.goto("/")
    await expect(page.getByTestId("sync-value")).toHaveText("0")
    await expect(page.getByTestId("mirror-value")).toHaveText("0")

    // Step 2: increment the store three times
    await page.getByTestId("btn-inc").click()
    await page.getByTestId("btn-inc").click()
    await page.getByTestId("btn-inc").click()

    // Step 3: the useSyncExternalStore reader is exact (3)
    await expect(page.getByTestId("sync-value")).toHaveText("3")

    // Step 4: the effect mirror never subscribed → stays at its mounted snapshot (0)
    await expect(page.getByTestId("mirror-value")).toHaveText("0")
})
