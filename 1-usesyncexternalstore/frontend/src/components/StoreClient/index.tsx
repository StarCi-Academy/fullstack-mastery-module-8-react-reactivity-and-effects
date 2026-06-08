import { ControlPanel } from "../ControlPanel"
import { MirrorComparePanel } from "../MirrorComparePanel"
import { SearchPanel } from "../SearchPanel"
import { SectionLabel } from "../SectionLabel"
import { StoreReader } from "../StoreReader"
import { SubscriptionLegend } from "../SubscriptionLegend"
import { WindowSizePanel } from "../WindowSizePanel"

/**
 * StoreClient — shared lesson content used by both Local and Sandbox.
 *
 * Layout: legend, two reader cards of one external store (side by side), controls,
 * sync-vs-mirror comparison, live window size, and async query demo — each
 * section labeled and stacked top to bottom.
 */
export const StoreClient = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-6">
            <SubscriptionLegend />
            <section className="flex flex-col gap-3">
                <SectionLabel>Store readers</SectionLabel>
                <div className="flex gap-3">
                    <StoreReader label="Reader A" slot="a" />
                    <StoreReader label="Reader B" slot="b" />
                </div>
            </section>
            <ControlPanel />
            <MirrorComparePanel />
            <WindowSizePanel />
            <SearchPanel />
        </div>
    )
}
