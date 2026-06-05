import { ChartsClient } from "../ChartsClient"

/**
 * Local — the default (no `?sandbox`) content: a single charts client.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export function Local(): JSX.Element {
  return <ChartsClient />
}
