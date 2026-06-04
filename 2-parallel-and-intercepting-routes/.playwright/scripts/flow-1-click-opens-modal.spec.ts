import { test, expect } from "@playwright/test"

/**
 * Flow 1 — clicking a photo opens the modal via intercepting route; URL changes.
 */
test("flow 1 — click photo opens modal and updates URL", async ({ page }) => {
    await page.goto("/")

    // Step 1: click the link
    await page.getByTestId("photo-link-1").click()

    // Step 2: modal shown, URL changed
    await expect(page.getByTestId("photo-modal")).toBeVisible()
    await expect(page).toHaveURL(/\/photos\/1$/)

    // Step 3: home content still rendered below
    await expect(page.getByTestId("home-title")).toBeVisible()
})
