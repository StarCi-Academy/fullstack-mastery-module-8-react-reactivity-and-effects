import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright (EN: Playwright config).
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})
