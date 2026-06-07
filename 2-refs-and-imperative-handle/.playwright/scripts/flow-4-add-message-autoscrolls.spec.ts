import { test, expect } from "@playwright/test"

/**
 * Flow 4 — Submitting a message appends it AND the parent auto-scrolls to the
 * newest entry by calling the list handle imperatively.
 *
 * Combines declarative state (the messages array) with the imperative escape
 * hatch: after React renders the new node, the parent calls scrollToBottom() so
 * the just-added message is visible and isAtBottom() reports true.
 */
test("flow 4 — sending a message appends it and auto-scrolls to the newest", async ({ page }) => {
    // Step 1: navigate, capture the starting message count
    await page.goto("/")
    const before = Number(await page.getByTestId("message-count").innerText())

    // Step 2: type a new message and submit with Enter
    const input = page.getByTestId("message-input")
    await input.fill("hello refs")
    await input.press("Enter")

    // Step 3: the new message is appended and the count grows by one
    await expect(page.getByTestId("message-count")).toHaveText(String(before + 1))
    await expect(page.getByTestId(`message-${before + 1}`)).toHaveText("hello refs")

    // Step 4: the parent imperatively auto-scrolled to the bottom
    await expect(page.getByTestId("at-bottom")).toHaveText("yes")

    // Step 5: the input was cleared after submit (uncontrolled reset)
    await expect(input).toHaveValue("")
})
