import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Parent calls the child's imperative clear() through a ref.
 *
 * The input is uncontrolled (its text lives in the DOM, not React state). The
 * parent wipes it by calling `inputRef.current.clear()` exposed via the handle —
 * proving the parent can drive the child without owning its value.
 */
test("flow 2 — Clear input empties the uncontrolled field via the handle", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/")

    // Step 2: type into the uncontrolled input
    const input = page.getByTestId("message-input")
    await input.fill("draft message")
    await expect(input).toHaveValue("draft message")

    // Step 3: parent calls the imperative clear()
    await page.getByTestId("btn-clear").click()

    // Step 4: the field is empty again
    await expect(input).toHaveValue("")
})
