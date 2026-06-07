import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Imperative scroll + DOM measurement through the list handle.
 *
 * The list is seeded taller than its viewport, so it starts NOT at the bottom.
 * The parent calls `listRef.current.scrollToBottom()` and `isAtBottom()` via the
 * handle, and a ResizeObserver-backed getBoundingClientRect height is surfaced.
 */
test("flow 3 — scrollToBottom pins the list to bottom and height is measured", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: the list box reports a real measured height (> 0) from getBoundingClientRect
    const measured = await page.getByTestId("measured-height").innerText()
    expect(Number(measured)).toBeGreaterThan(0)

    // Step 3: scroll the container to the top so we are demonstrably not at bottom
    await page.getByTestId("message-list").evaluate((el) => {
        el.scrollTop = 0
    })
    await page.getByTestId("btn-check-bottom").click()
    await expect(page.getByTestId("at-bottom")).toHaveText("no")

    // Step 4: parent imperatively scrolls to bottom → isAtBottom() becomes true
    await page.getByTestId("btn-scroll-bottom").click()
    await expect(page.getByTestId("at-bottom")).toHaveText("yes")
})
