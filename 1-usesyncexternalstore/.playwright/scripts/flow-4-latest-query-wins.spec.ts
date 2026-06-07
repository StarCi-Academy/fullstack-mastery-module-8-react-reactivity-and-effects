import { test, expect } from "@playwright/test"

/**
 * Flow 4 — Latest wins. A slow earlier request ("alpha", 300ms) is fired right
 * before a fast later one ("beta", 50ms). The async external store drops any
 * response that is no longer the latest, so the committed result settles on
 * "beta" even though "alpha" resolves afterward.
 */
test("flow 4 — committed result is the latest query, not the slow earlier one", async ({ page }) => {
    // Step 1: navigate; no result yet
    await page.goto("/")
    await expect(page.getByTestId("query-result")).toHaveText("—")

    // Step 2: fire slow-then-fast in a single handler
    await page.getByTestId("btn-race").click()

    // Step 3: the fast query commits first → "beta"
    await expect(page.getByTestId("query-result")).toHaveText("beta")

    // Step 4: wait past the slow query's delay; it must NOT overwrite "beta"
    await page.waitForTimeout(400)
    await expect(page.getByTestId("query-result")).toHaveText("beta")
    await expect(page.getByTestId("query-pending")).toHaveText("idle")
})
