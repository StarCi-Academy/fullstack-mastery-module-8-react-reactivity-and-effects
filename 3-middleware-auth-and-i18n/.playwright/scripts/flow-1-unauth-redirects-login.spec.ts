import { test, expect } from "@playwright/test"

/**
 * Flow 1 — unauthenticated /dashboard → /login.
 */
test("flow 1 — unauthenticated /en/dashboard redirects to /login", async ({ page, context }) => {
    // Step 1: clear session cookie
    await context.clearCookies()

    // Step 2: visit protected route
    await page.goto("/en/dashboard")

    // Step 3: assert redirect
    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByTestId("login-title")).toBeVisible()
})
