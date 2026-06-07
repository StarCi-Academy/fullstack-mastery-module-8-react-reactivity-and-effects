import { defineConfig, devices } from "@playwright/test"

/**
 * Playwright config — FE-only lesson; port + baseURL configurable via env (FE_PORT).
 * Default 3200. Matches the M6/M7 webServer pattern without a backend.
 */
const FE_PORT = Number(process.env.FE_PORT ?? "3200")
// Bind to 127.0.0.1 (not localhost) to avoid IPv6/::1 resolution flakiness on Windows.
const BASE_URL = process.env.PW_BASE_URL ?? `http://127.0.0.1:${FE_PORT}`

export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    workers: 1,
    fullyParallel: false,
    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: {
        command: `npm install --prefer-offline && npx vite --host 127.0.0.1 --port ${FE_PORT}`,
        cwd: "../frontend",
        port: FE_PORT,
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
