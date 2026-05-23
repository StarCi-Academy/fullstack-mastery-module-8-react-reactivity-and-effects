import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — unauth /dashboard → /login.
 * (EN: Flow 1 — unauthenticated /dashboard → /login.)
 */
test("flow 1 — unauthenticated /en/dashboard redirects to /login", async ({ page, context }) => {
    // Bước 1: xóa cookie session (EN: clear session cookie)
    await context.clearCookies()

    // Bước 2: visit protected route (EN: visit protected route)
    await page.goto("/en/dashboard")

    // Bước 3: assert redirect (EN: assert redirect)
    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByTestId("login-title")).toBeVisible()
})
