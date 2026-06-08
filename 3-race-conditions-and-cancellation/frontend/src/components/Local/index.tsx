import { SearchClient } from "../SearchClient"

/**
 * Local — the default (no `?sandbox`) content: the search-as-you-type lab.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export const Local = (): JSX.Element => {
    return <SearchClient />
}
