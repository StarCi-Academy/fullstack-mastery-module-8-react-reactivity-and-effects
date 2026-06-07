import { test, expect } from "@playwright/test"

/**
 * Flow 4 — The buggy panel needs an extra effect render to re-sync.
 *
 * Because the filtered list lives in state and is updated by an effect, the
 * buggy panel always trails the query by one render before converging. We prove
 * it still converges (filter then clear → back to all 6) AND that doing so cost
 * extra renders compared with the keystroke count, which is the symptom of the
 * derived-state-in-an-effect anti-pattern.
 */
test("flow 4 — buggy panel re-syncs via its effect and costs more renders than keystrokes", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: after mount the effect has synced the full list
    await expect(page.getByTestId("buggy-count")).toHaveText("6")
    const baseline = Number(await page.getByTestId("buggy-renders").innerText())

    // Step 3: type "erin" (4 keystrokes) — only Erin matches
    await page.getByTestId("buggy-search").pressSequentially("erin", { delay: 20 })
    await expect(page.getByTestId("buggy-count")).toHaveText("1")
    await expect(page.getByTestId("buggy-row-5")).toBeVisible()

    // Step 4: clear → effect re-syncs back to all 6
    await page.getByTestId("buggy-search").fill("")
    await expect(page.getByTestId("buggy-count")).toHaveText("6")

    // Step 5: renders grew by more than the 4 keystrokes (effect added extra renders)
    const after = Number(await page.getByTestId("buggy-renders").innerText())
    expect(after - baseline).toBeGreaterThan(4)
})
