import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — reload trên URL modal render full-page (intercept không kích hoạt).
 * (EN: Flow 3 — reload on modal URL renders the full-page route — interception doesn't fire.)
 */
test("flow 3 — direct visit/reload renders full-page route", async ({ page }) => {
    // Bước 1: direct deep-link (EN: direct deep-link)
    await page.goto("/photos/3")

    // Bước 2: full-page marker hiện, modal không hiện (EN: full-page marker visible, no modal)
    await expect(page.getByTestId("fullpage-title")).toContainText("Photo 3")
    await expect(page.getByTestId("photo-modal")).toHaveCount(0)
})
