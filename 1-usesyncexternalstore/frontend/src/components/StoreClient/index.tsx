import { ControlPanel } from "../ControlPanel"
import { MirrorComparePanel } from "../MirrorComparePanel"
import { SearchPanel } from "../SearchPanel"
import { StoreReader } from "../StoreReader"
import { SubscriptionLegend } from "../SubscriptionLegend"
import { WindowSizePanel } from "../WindowSizePanel"

/**
 * StoreClient — shared lesson content used by both Local and Sandbox.
 *
 * Layout: a legend, two readers of one external store (consistency demo), the
 * control buttons, the sync-vs-mirror comparison, and a live window-size panel
 * (a real browser store read through useSyncExternalStore).
 */
export function StoreClient(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <SubscriptionLegend />
            <div className="grid gap-3 sm:grid-cols-2">
                <StoreReader label="Reader A" slot="a" />
                <StoreReader label="Reader B" slot="b" />
            </div>
            <ControlPanel />
            <MirrorComparePanel />
            <WindowSizePanel />
            <SearchPanel />
        </div>
    )
}
