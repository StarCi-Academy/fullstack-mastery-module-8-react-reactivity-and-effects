import { RefsClient } from "../RefsClient"

/**
 * Local — the default (no `?sandbox`) content: a single refs/imperative-handle client.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export function Local(): JSX.Element {
    return <RefsClient />
}
