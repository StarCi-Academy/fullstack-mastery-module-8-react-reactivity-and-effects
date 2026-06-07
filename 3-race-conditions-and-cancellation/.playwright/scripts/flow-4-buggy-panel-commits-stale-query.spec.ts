import { test, expect } from "@playwright/test"

/**
 * Flow 4 — The buggy panel commits the STALE query after a race.
 *
 * This is the contrast to Flow 2/3: the buggy panel has no cleanup, so the slow
 * "re" response resolves last and overwrites the fast "react" results. After
 * "Run race", `current-query` is "react" but `buggy-committed-query` drifts to
 * "re" — last-write-wins by arrival order, the classic effect race bug.
 */
test("flow 4 — buggy panel ends on the stale query while fixed stays correct", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: trigger the scripted slow-then-fast race
    await page.getByTestId("btn-run-race").click()
    await expect(page.getByTestId("current-query")).toHaveText("react")

    // Step 3: wait past the slow "re" delay window so the stale response lands
    await expect(page.getByTestId("buggy-committed-query")).toHaveText("re")

    // Step 4: buggy results belong to the stale "re" query, not "react"
    await expect(page.getByTestId("buggy-results")).toContainText("re result 1")
    await expect(page.getByTestId("buggy-results")).not.toContainText("react result 1")

    // Step 5: side-by-side proof — same input, fixed panel is correct
    await expect(page.getByTestId("fixed-committed-query")).toHaveText("react")
})
