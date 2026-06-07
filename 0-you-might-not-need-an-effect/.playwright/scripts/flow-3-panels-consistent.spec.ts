import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Both panels agree on the result for the same query.
 *
 * The buggy and fixed panels compute the same filter two different ways. For any
 * query they must end up showing the same match count and the same rows — the
 * effect-based approach is only worse on renders, not on the final value.
 */
test("flow 3 — buggy and fixed panels show the same matches for the same query", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: query "a" — Alice, Carol, Dave, Frank → 4 matches
    await page.getByTestId("buggy-search").fill("a")
    await page.getByTestId("fixed-search").fill("a")

    await expect(page.getByTestId("buggy-count")).toHaveText("4")
    await expect(page.getByTestId("fixed-count")).toHaveText("4")

    // Step 3: same specific rows visible in both panels (Alice id=1, Frank id=6)
    await expect(page.getByTestId("buggy-row-1")).toBeVisible()
    await expect(page.getByTestId("fixed-row-1")).toBeVisible()
    await expect(page.getByTestId("buggy-row-6")).toBeVisible()
    await expect(page.getByTestId("fixed-row-6")).toBeVisible()
})
