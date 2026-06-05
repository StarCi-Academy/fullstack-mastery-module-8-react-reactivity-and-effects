import { DashboardClient } from "../DashboardClient"

/**
 * Local — the default (no `?sandbox`) content: a single dashboard client.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export function Local(): JSX.Element {
  return <DashboardClient />
}
