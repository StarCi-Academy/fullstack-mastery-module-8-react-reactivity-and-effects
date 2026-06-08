import { EffectClient } from "../EffectClient"

/**
 * Local — the default (no `?sandbox`) content: the effect-vs-derived demo.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export const Local = (): JSX.Element => {
    return <EffectClient />
}
