import { test, expect } from "@playwright/test"

/**
 * Flow 2 — The buggy panel renders twice per keystroke; the fixed panel once.
 *
 * The buggy panel mirrors the filtered list into state inside a `useEffect`, so
 * each keystroke produces two renders (state set, then effect setState). The
 * fixed panel derives the list during render, so each keystroke produces one.
 * We type the same N characters into each and compare how much the render
 * counters grew.
 */
test("flow 2 — buggy render growth is larger than fixed render growth for the same typing", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: capture baseline render counters
    const buggyStart = Number(await page.getByTestId("buggy-renders").innerText())
    const fixedStart = Number(await page.getByTestId("fixed-renders").innerText())

    // Step 3: type 3 characters into each panel, one keystroke at a time
    await page.getByTestId("buggy-search").pressSequentially("car", { delay: 20 })
    await page.getByTestId("fixed-search").pressSequentially("car", { delay: 20 })

    // Step 4: both filtered to Carol
    await expect(page.getByTestId("buggy-count")).toHaveText("1")
    await expect(page.getByTestId("fixed-count")).toHaveText("1")

    // Step 5: compare growth — buggy double-renders, so it grew strictly more
    const buggyEnd = Number(await page.getByTestId("buggy-renders").innerText())
    const fixedEnd = Number(await page.getByTestId("fixed-renders").innerText())
    const buggyGrowth = buggyEnd - buggyStart
    const fixedGrowth = fixedEnd - fixedStart

    expect(buggyGrowth).toBeGreaterThan(fixedGrowth)
    // fixed panel renders exactly once per keystroke (3 chars → 3 renders)
    expect(fixedGrowth).toBe(3)
})
