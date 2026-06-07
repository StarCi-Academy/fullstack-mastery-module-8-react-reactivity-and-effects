import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Cleanup actually aborts the superseded request.
 *
 * The fixed panel passes an `AbortController.signal` to the mock API and aborts
 * it in the effect cleanup. When "Run race" supersedes the slow "re" query with
 * "react", the in-flight "re" request is cancelled — surfacing as a non-zero
 * `fixed-aborted-count`. This proves cancellation happened, not just that a
 * stale commit was ignored.
 */
test("flow 3 — superseded request is aborted (fixed-aborted-count > 0)", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: trigger the scripted slow-then-fast race
    await page.getByTestId("btn-run-race").click()
    await expect(page.getByTestId("current-query")).toHaveText("react")

    // Step 3: two requests fired (slow "re" then fast "react"), one aborted
    await expect(page.getByTestId("fixed-request-count")).toHaveText("2")
    await expect(page.getByTestId("fixed-aborted-count")).toHaveText("1")

    // Step 4: the surviving request committed the latest query
    await expect(page.getByTestId("fixed-committed-query")).toHaveText("react")
})
