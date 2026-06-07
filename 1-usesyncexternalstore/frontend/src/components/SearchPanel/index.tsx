import { Button, Card, Chip } from "@heroui/react"
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
        <Card data-testid="search-panel" className="flex flex-col gap-3 border border-default-200/60 rounded-large p-3">
            <Card.Content className="flex flex-col gap-3 p-0">
                <div className="flex flex-wrap gap-3">
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
                <span
                    data-testid="query-result"
                    className="text-2xl font-bold tabular-nums text-foreground"
                >
                    {result === "" ? "—" : result}
                </span>
                <Chip
                    data-testid="query-pending"
                    variant="secondary"
                    color={pending ? "warning" : "default"}
                    size="sm"
                    className="w-fit"
                >
                    {pending ? "pending" : "idle"}
                </Chip>
            </Card.Content>
        </Card>
    )
}
