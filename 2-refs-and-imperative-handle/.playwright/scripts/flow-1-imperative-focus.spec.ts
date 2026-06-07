import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Parent calls the child's imperative focus() through a ref.
 *
 * The input starts unfocused. Clicking "Focus input" makes the parent call
 * `inputRef.current.focus()` (exposed via useImperativeHandle), which moves
 * keyboard focus onto the underlying <input> element.
 */
test("flow 1 — clicking Focus input focuses the child input via the handle", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: the input is not focused initially
    await expect(page.getByTestId("focus-state")).toHaveText("no")
    await expect(page.getByTestId("message-input")).not.toBeFocused()

    // Step 3: trigger the parent-driven imperative focus
    await page.getByTestId("btn-focus").click()

    // Step 4: the underlying input now holds DOM focus + status reflects it
    await expect(page.getByTestId("message-input")).toBeFocused()
    await expect(page.getByTestId("focus-state")).toHaveText("yes")
})
