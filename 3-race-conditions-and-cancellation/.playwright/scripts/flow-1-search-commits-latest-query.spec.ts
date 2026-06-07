import { test, expect } from "@playwright/test"

/**
 * Flow 1 — A single search commits its results (baseline, no race).
 *
 * Typing one query and waiting fires one request per panel; both the buggy and
 * fixed panels commit that exact query and render its three result rows. This
 * confirms the effect-driven fetch wiring works before we introduce the race.
 */
test("flow 1 — typing a query commits results in both panels", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: type a single query
    await page.getByTestId("search-input").fill("react")
    await expect(page.getByTestId("current-query")).toHaveText("react")

    // Step 3: both panels commit the query (slow base delay → allow time)
    await expect(page.getByTestId("buggy-committed-query")).toHaveText("react")
    await expect(page.getByTestId("fixed-committed-query")).toHaveText("react")

    // Step 4: results render for that query
    await expect(page.getByTestId("buggy-results").getByRole("listitem")).toHaveCount(3)
    await expect(page.getByTestId("fixed-results").getByRole("listitem")).toHaveCount(3)
    await expect(page.getByTestId("fixed-results")).toContainText("react result 1")

    // Step 5: exactly one request fired per panel
    await expect(page.getByTestId("buggy-request-count")).toHaveText("1")
    await expect(page.getByTestId("fixed-request-count")).toHaveText("1")
})
