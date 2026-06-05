import { ResponsiveChartClient } from "../ResponsiveChartClient"

/**
 * Local — the default (no `?sandbox`) content: a single responsive chart client.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export function Local(): JSX.Element {
  return <ResponsiveChartClient />
}
