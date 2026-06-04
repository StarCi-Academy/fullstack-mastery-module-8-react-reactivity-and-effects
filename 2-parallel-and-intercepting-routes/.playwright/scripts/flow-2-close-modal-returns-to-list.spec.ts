import { test, expect } from "@playwright/test"

/**
 * Flow 2 — closing the modal returns to the list; URL back to /.
 */
test("flow 2 — closing modal returns to list", async ({ page }) => {
    await page.goto("/")
    await page.getByTestId("photo-link-2").click()
    await expect(page.getByTestId("photo-modal")).toBeVisible()

    // Step 1: click Close
    await page.getByTestId("modal-close").click()

    // Step 2: URL back to /, modal hidden
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByTestId("photo-modal")).toHaveCount(0)
})
