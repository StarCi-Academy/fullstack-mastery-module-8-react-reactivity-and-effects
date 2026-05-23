import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — auth (cookie valid) truy cập /dashboard thành công.
 * (EN: Flow 2 — authenticated (valid cookie) reaches /dashboard.)
 */
test("flow 2 — valid session cookie reaches /en/dashboard", async ({ page, context }) => {
    // Bước 1: set cookie valid (EN: set valid cookie)
    await context.addCookies([
        {
            name: "session",
            value: "valid-token",
            url: "http://localhost:3001",
            httpOnly: false,
        },
    ])

    // Bước 2: visit (EN: visit)
    await page.goto("/en/dashboard")

    // Bước 3: assert dashboard rendered (EN: dashboard rendered)
    await expect(page.getByTestId("dashboard-title")).toContainText("Dashboard (en)")
})
