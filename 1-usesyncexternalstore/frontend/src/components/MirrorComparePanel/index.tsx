import { Card } from "@heroui/react"
import { useBuggyTickMirror, useTick } from "../../lib"

/**
 * MirrorComparePanel — side-by-side of the two strategies reading the SAME
 * external store:
 *
 * - `sync-value` (`useSyncExternalStore`) is always the exact current snapshot.
 * - `mirror-value` (`useEffect` + `useState` copy) snapshots once on mount and
 *   then never updates, so it visibly tears away (stays stale) as the store moves.
 *
 * The lesson uses this to argue you should read external sources with
 * `useSyncExternalStore`, not mirror them into state via an effect.
 */
export function MirrorComparePanel(): JSX.Element {
    const syncValue = useTick()
    const mirrorValue = useBuggyTickMirror()

    return (
        <Card data-testid="mirror-panel" className="border border-default-200/60 rounded-large p-5">
            <Card.Content className="flex gap-8 pt-4 p-0">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground/70">
                        useSyncExternalStore
                    </span>
                    <span
                        data-testid="sync-value"
                        className="text-3xl font-bold tabular-nums text-foreground"
                    >
                        {syncValue}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground/70">
                        useEffect mirror (buggy)
                    </span>
                    <span
                        data-testid="mirror-value"
                        className="text-3xl font-bold tabular-nums text-foreground"
                    >
                        {mirrorValue}
                    </span>
                </div>
            </Card.Content>
        </Card>
    )
}
