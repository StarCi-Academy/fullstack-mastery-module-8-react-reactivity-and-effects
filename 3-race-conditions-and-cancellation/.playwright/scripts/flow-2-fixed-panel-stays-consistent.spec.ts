import { test, expect } from "@playwright/test"

/**
 * Flow 2 — The fixed panel stays consistent with the latest query after a race.
 *
 * "Run race" dispatches a SLOW query ("re") immediately followed by a FAST one
 * ("react"). The slow response physically resolves last, but the fixed panel's
 * cleanup (ignore flag + abort) prevents the stale run from committing, so
 * `fixed-committed-query` and `fixed-results` always reflect "react".
 */
test("flow 2 — fixed panel commits the newest query, not the stale one", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: trigger the scripted slow-then-fast race
    await page.getByTestId("btn-run-race").click()
    await expect(page.getByTestId("current-query")).toHaveText("react")

    // Step 3: fixed panel converges to the latest query and never drifts to "re".
    // Wait past the slow "re" delay window so a stale commit would have happened.
    await expect(page.getByTestId("fixed-committed-query")).toHaveText("react")
    await page.waitForTimeout(800)
    await expect(page.getByTestId("fixed-committed-query")).toHaveText("react")

    // Step 4: fixed results belong to "react"
    await expect(page.getByTestId("fixed-results")).toContainText("react result 1")
    await expect(page.getByTestId("fixed-results")).not.toContainText("re result 1")
})
