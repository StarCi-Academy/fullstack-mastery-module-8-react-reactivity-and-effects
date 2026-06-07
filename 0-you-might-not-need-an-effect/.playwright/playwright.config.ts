import { defineConfig, devices } from "@playwright/test"

/**
 * Playwright config — FE-only lesson; port + baseURL configurable via env (FE_PORT).
 * Default 3200 for L0. Matches M6 webServer pattern without backend.
 */
const FE_PORT = Number(process.env.FE_PORT ?? "3200")
const BASE_URL = process.env.PW_BASE_URL ?? `http://localhost:${FE_PORT}`

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
        // Use the frontend's locally-installed vite via its npm script (the dev
        // port is pinned in vite.config.ts). `npx vite` would fetch a separate
        // copy into the npm cache that cannot resolve the local config's plugins.
        command: `npm run dev`,
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
