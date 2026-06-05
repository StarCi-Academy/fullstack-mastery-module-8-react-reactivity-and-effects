import { defineConfig, devices } from "@playwright/test"

/**
 * Playwright config — testDir points to ./scripts (same folder as .playwright/).
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 120_000,
    use: {
        baseURL: "http://localhost:3200",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: {
        command: "npm install --prefer-offline && npm run dev",
        cwd: "../frontend",
        port: 3200,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "head",
            use: { ...devices["Desktop Chrome"], channel: "chrome" },
        },
    ],
})
