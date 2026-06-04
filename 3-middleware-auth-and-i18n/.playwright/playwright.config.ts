import { defineConfig, devices } from "@playwright/test"

/**
 * Playwright config.
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: "http://localhost:3280",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: [
        {
            command: "npm install --prefer-offline && node -e \"process.env.PORT='3281'; process.env.FRONTEND_ORIGIN='http://localhost:3280'; require('child_process').spawn('npx',['nest','start'],{stdio:'inherit',shell:true,env:process.env})\"",
            cwd: "../backend",
            port: 3281,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
        {
            command: "npm install --prefer-offline && node -e \"process.env.NEXT_PUBLIC_API_BASE='http://localhost:3281'; require('child_process').spawn('npm',['run','dev'],{stdio:'inherit',shell:true,env:process.env})\"",
            cwd: "../frontend",
            port: 3280,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
    ],
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
