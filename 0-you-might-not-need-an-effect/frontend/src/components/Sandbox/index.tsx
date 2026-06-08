import { EffectClient } from "../EffectClient"

/**
 * Sandbox — the `?sandbox=1` content for the embedded preview.
 *
 * Single-client lesson, so the sandbox renders the same content as Local — no
 * multi-pane tabs. The split is kept for a uniform `?sandbox` switch across the
 * whole course.
 */
export const Sandbox = (): JSX.Element => {
    return <EffectClient />
}
