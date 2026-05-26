import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright (EN: Playwright config).
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: "http://localhost:3140",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        channel: "chrome",
    },
    webServer: {
        command: "npm install --prefer-offline && npm run dev",
        cwd: "../frontend",
        port: 3140,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"], channel: "chrome" },
        },
    ],
})
