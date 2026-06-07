import { Legend } from "../EffectPanel/Legend"
import { BuggyPanel } from "../EffectPanel/BuggyPanel"
import { FixedPanel } from "../EffectPanel/FixedPanel"

/**
 * EffectClient — shared lesson content used by both Local and Sandbox.
 *
 * Two side-by-side cards demonstrate the same search filter implemented two
 * ways: the buggy panel mirrors derived data into state via an effect, the
 * fixed panel derives it inline during render. The render counters make the
 * difference observable.
 */
export function EffectClient(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <Legend />
            <div className="grid gap-3 sm:grid-cols-2">
                <BuggyPanel />
                <FixedPanel />
            </div>
        </div>
    )
}
