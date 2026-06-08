import { Button, Chip } from "@heroui/react"
import { useMemo } from "react"
import { SectionLabel } from "../SectionLabel"
import { SubLabel } from "../SubLabel"
import { resetQuery, runQuery, useQuery } from "../../lib"

/** HeroUI Chip color + background for query pending state (matches M12 upload status chip). */
const queryChipColor = (pending: boolean): {
    textColor: "default" | "warning"
    bgClass: string
} => {
    if (pending) return { textColor: "warning", bgClass: "bg-warning/20" }
    return { textColor: "default", bgClass: "bg-muted/20" }
}

/**
 * SearchPanel — demonstrates "latest wins" against an async external store read
 * via `useSyncExternalStore`. Clicking "slow then fast" fires a slow query for
 * "alpha" (300ms) immediately followed by a fast query for "beta" (50ms). The
 * store's `runQuery` drops any response that is no longer the latest, so the
 * committed result settles on "beta" even though "alpha" resolves last.
 */
export const SearchPanel = (): JSX.Element => {
    const { result, pending } = useQuery()

    const queryStatus = useMemo((): string => (pending ? "pending" : "idle"), [pending])

    const chipStyle = useMemo(() => queryChipColor(pending), [pending])

    return (
        <section data-testid="search-panel" className="flex flex-col gap-3">
            <SectionLabel>Async query (latest wins)</SectionLabel>
            <div className="flex flex-wrap gap-2">
                <Button
                    data-testid="btn-race"
                    variant="primary"
                    onPress={() => {
                        // Start a slow request, then immediately a fast one.
                        runQuery("alpha", 300)
                        runQuery("beta", 50)
                    }}
                >
                    Slow Then Fast
                </Button>
                <Button data-testid="btn-query-reset" variant="danger" onPress={() => resetQuery()}>
                    Reset
                </Button>
            </div>
            <div className="flex flex-col gap-1">
                <SubLabel>Result</SubLabel>
                <span
                    data-testid="query-result"
                    className="text-2xl font-bold tabular-nums text-foreground"
                >
                    {result === "" ? "—" : result}
                </span>
            </div>
            <Chip
                data-testid="query-pending"
                color={chipStyle.textColor}
                size="sm"
                className={`w-fit capitalize ${chipStyle.bgClass}`}
            >
                {queryStatus}
            </Chip>
        </section>
    )
}
