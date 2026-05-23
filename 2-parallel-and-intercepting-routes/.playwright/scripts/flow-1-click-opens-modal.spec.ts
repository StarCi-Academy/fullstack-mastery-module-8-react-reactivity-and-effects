import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — click photo mở modal qua intercepting route, URL đổi.
 * (EN: Flow 1 — clicking a photo opens the modal via intercepting route; URL changes.)
 */
test("flow 1 — click photo opens modal and updates URL", async ({ page }) => {
    await page.goto("/")

    // Bước 1: click link (EN: click the link)
    await page.getByTestId("photo-link-1").click()

    // Bước 2: modal hiện, URL đổi (EN: modal shown, URL changed)
    await expect(page.getByTestId("photo-modal")).toBeVisible()
    await expect(page).toHaveURL(/\/photos\/1$/)

    // Bước 3: home content vẫn render bên dưới (EN: home content still rendered below)
    await expect(page.getByTestId("home-title")).toBeVisible()
})
