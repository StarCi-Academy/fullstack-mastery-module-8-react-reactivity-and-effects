import { Button, Card } from "@heroui/react"
import { resetQuery, runQuery, useQuery } from "../../lib"

/**
 * SearchPanel — demonstrates "latest wins" against an async external store read
 * via `useSyncExternalStore`. Clicking "slow then fast" fires a slow query for
 * "alpha" (300ms) immediately followed by a fast query for "beta" (50ms). The
 * store's `runQuery` drops any response that is no longer the latest, so the
 * committed result settles on "beta" even though "alpha" resolves last.
 */
export function SearchPanel(): JSX.Element {
    const { result, pending } = useQuery()

    return (
        <Card data-testid="search-panel" className="border border-default-200/60 rounded-large p-5">
            <Card.Content className="flex flex-col gap-4 pt-4 p-0">
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
                        slow then fast
                    </Button>
                    <Button data-testid="btn-query-reset" variant="ghost" onPress={() => resetQuery()}>
                        reset
                    </Button>
                </div>
                <span
                    data-testid="query-result"
                    className="text-2xl font-bold tabular-nums text-foreground"
                >
                    {result === "" ? "—" : result}
                </span>
                <span data-testid="query-pending" className="text-sm font-medium text-foreground/70">
                    {pending ? "pending" : "idle"}
                </span>
            </Card.Content>
        </Card>
    )
}
