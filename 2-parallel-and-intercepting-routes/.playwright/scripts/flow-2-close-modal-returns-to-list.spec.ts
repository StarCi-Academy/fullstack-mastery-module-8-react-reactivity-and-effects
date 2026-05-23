import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — đóng modal về list, URL về /.
 * (EN: Flow 2 — closing the modal returns to the list; URL back to /.)
 */
test("flow 2 — closing modal returns to list", async ({ page }) => {
    await page.goto("/")
    await page.getByTestId("photo-link-2").click()
    await expect(page.getByTestId("photo-modal")).toBeVisible()

    // Bước 1: click Close (EN: click Close)
    await page.getByTestId("modal-close").click()

    // Bước 2: URL về /, modal biến mất (EN: URL back to /, modal hidden)
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByTestId("photo-modal")).toHaveCount(0)
})
