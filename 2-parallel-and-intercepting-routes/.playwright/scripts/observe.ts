import type { Page } from "@playwright/test"

/**
 * observe() helper — pauses Playwright in headed mode so learners can inspect
 * the UI before the script proceeds to the next assertion or click.
 *
 * In CI (headless / no PWDEBUG) this becomes a no-op so the pipeline doesn't hang.
 */
export async function observe(page: Page): Promise<void> {
    if (process.env.PWDEBUG || process.env.HEADED === "1") {
        await page.pause()
    }
}
