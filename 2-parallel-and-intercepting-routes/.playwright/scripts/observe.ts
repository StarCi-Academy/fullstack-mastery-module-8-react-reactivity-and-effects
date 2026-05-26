import type { Page } from "@playwright/test"

/**
 * Helper observe — pause Playwright trong headed mode để học viên quan sát UI
 * trước khi script chạy assertion / click tiếp.
 * (EN: observe() helper — pauses Playwright in headed mode so learners can inspect
 * the UI before the script proceeds to the next assertion or click.)
 *
 * Trong CI (headless / PWDEBUG không set) noop để không treo pipeline.
 * (EN: In CI (headless / no PWDEBUG) this becomes a no-op so the pipeline doesn't hang.)
 */
export async function observe(page: Page): Promise<void> {
    if (process.env.PWDEBUG || process.env.HEADED === "1") {
        await page.pause()
    }
}
