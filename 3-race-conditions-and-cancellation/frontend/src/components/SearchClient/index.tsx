import { Button, Card, Input, Typography } from "@heroui/react"
import { useState } from "react"
import { BuggySearch } from "./BuggySearch"
import { FixedSearch } from "./FixedSearch"

/**
 * The scripted race sequence: a SLOW short prefix immediately followed by a
 * FAST longer one. `searchApi` resolves shorter queries slower, so "re" lands
 * AFTER "react" even though it was typed first — the canonical effect race.
 */
const SLOW_QUERY = "re"
const FAST_QUERY = "react"

/**
 * SearchClient — search-as-you-type lab demonstrating an effect race condition.
 *
 * One controlled input drives `query`. Two sibling panels each fetch from the
 * same mock API inside an effect:
 *   - `<BuggySearch>` has no cleanup, so a slow stale response can overwrite the
 *     latest one (last-write-wins by arrival order). Its `buggy-committed-query`
 *     can therefore drift away from the current input.
 *   - `<FixedSearch>` uses an `ignore` flag + `AbortController` in cleanup, so its
 *     `fixed-committed-query` always converges to the latest query.
 *
 * The "Run race" button scripts a deterministic slow-then-fast sequence so the
 * race is reproducible — each `setQuery` lands in its own commit (separate timer
 * tick) so both panels fire a request for the intermediate slow query before the
 * fast one supersedes it. Each panel exposes its own request counter (and the
 * fixed one an aborted counter) so Playwright can prove the race window was
 * exercised. Mock delays are query-derived (short queries slow, long ones fast)
 * so the race is deterministic.
 */
export function SearchClient(): JSX.Element {
    const [query, setQuery] = useState("")

    // Script the slow-then-fast race. Two timers (not one batched render) so the
    // effect actually runs for the slow query before the fast one supersedes it.
    const runRace = (): void => {
        setQuery(SLOW_QUERY)
        window.setTimeout(() => setQuery(FAST_QUERY), 20)
    }

    return (
        <div className="flex flex-col gap-3">
            <Card className="flex flex-col gap-3 p-3">
                <Card.Content className="flex flex-col gap-3 p-0">
                    <Typography.Paragraph size="sm" color="muted">
                        {"Type to search, or press "}
                        <span className="font-semibold text-foreground">Run race</span>
                        {" to fire a slow query then a fast one. Both panels see the same query — only the effect cleanup differs."}
                    </Typography.Paragraph>
                    <Input
                        data-testid="search-input"
                        variant="secondary"
                        aria-label="Search query"
                        placeholder="Type a query…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            data-testid="btn-run-race"
                            variant="primary"
                            onPress={runRace}
                        >
                            Run race
                        </Button>
                        <Button
                            data-testid="btn-clear"
                            variant="outline"
                            onPress={() => setQuery("")}
                        >
                            Clear
                        </Button>
                        <span className="text-sm text-foreground">
                            {"Current query: "}
                            <span data-testid="current-query" className="font-semibold">
                                {query}
                            </span>
                        </span>
                    </div>
                </Card.Content>
            </Card>
            <div className="grid gap-3 sm:grid-cols-2">
                <BuggySearch query={query} />
                <FixedSearch query={query} />
            </div>
        </div>
    )
}
