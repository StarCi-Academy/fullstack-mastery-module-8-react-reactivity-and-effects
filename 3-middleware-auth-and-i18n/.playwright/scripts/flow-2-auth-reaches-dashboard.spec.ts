import { test, expect } from "@playwright/test"

/**
 * Flow 2 — authenticated (valid cookie) reaches /dashboard.
 */
test("flow 2 — valid session cookie reaches /en/dashboard", async ({ page, context }) => {
    // Step 1: set valid cookie
    await context.addCookies([
        {
            name: "session",
            value: "valid-token",
            url: "http://localhost:3280",
            httpOnly: false,
        },
    ])

    // Step 2: visit
    await page.goto("/en/dashboard")

    // Step 3: dashboard rendered
    await expect(page.getByTestId("dashboard-title")).toContainText("Dashboard (en)")
})
