import { MetricCard } from "../MetricCard"
import { SectionLabel } from "../SectionLabel"
import { useBuggyTickMirror, useTick } from "../../lib"

/**
 * MirrorComparePanel — side-by-side cards comparing the two strategies reading
 * the SAME external store:
 *
 * - `sync-value` (`useSyncExternalStore`) is always the exact current snapshot.
 * - `mirror-value` (`useEffect` + `useState` copy) snapshots once on mount and
 *   then never updates, so it visibly tears away (stays stale) as the store moves.
 *
 * The lesson uses this to argue you should read external sources with
 * `useSyncExternalStore`, not mirror them into state via an effect.
 */
export const MirrorComparePanel = (): JSX.Element => {
    const syncValue = useTick()
    const mirrorValue = useBuggyTickMirror()

    return (
        <section data-testid="mirror-panel" className="flex flex-col gap-3">
            <SectionLabel>Sync vs mirror</SectionLabel>
            <div className="flex gap-3">
                <MetricCard
                    label="useSyncExternalStore"
                    value={syncValue}
                    testId="sync-value"
                />
                <MetricCard
                    label="useEffect mirror (buggy)"
                    value={mirrorValue}
                    testId="mirror-value"
                />
            </div>
        </section>
    )
}
