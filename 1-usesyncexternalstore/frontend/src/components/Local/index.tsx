import { StoreClient } from "../StoreClient"

/**
 * Local — the default (no `?sandbox`) content: a single store client.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export const Local = (): JSX.Element => {
    return <StoreClient />
}
