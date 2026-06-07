import { Card, Typography } from "@heroui/react"
import { useEffect, useRef, useState } from "react"
import { searchApi } from "../../../lib"

/**
 * Props — the live query string driven by the parent input.
 */
interface BuggySearchProps {
    /** Current search query (controlled by the parent SearchClient). */
    query: string
}

/**
 * BuggySearch — the WRONG way to fetch inside an effect.
 *
 * It fires `searchApi(query)` on every query change but does **nothing** in the
 * cleanup, so a stale (slow) response can resolve *after* a newer (fast) one and
 * overwrite the UI with results for an old query. This is "last write wins" —
 * and the last write is whichever request happens to finish last, not the one
 * the user actually wants. Watch `buggy-committed-query` show an outdated query
 * after a slow-then-fast sequence.
 */
export function BuggySearch({ query }: BuggySearchProps): JSX.Element {
    // Results currently shown, plus the query they actually belong to. The
    // committed query is the observable proof of the race: it can differ from
    // the latest `query` prop when a stale response wins.
    const [results, setResults] = useState<string[]>([])
    const [committedQuery, setCommittedQuery] = useState<string>("")

    // How many requests this panel has fired (one per query change).
    const requestRef = useRef(0)
    const [requestCount, setRequestCount] = useState(0)

    useEffect(() => {
        if (query.trim() === "") {
            setResults([])
            setCommittedQuery("")
            return
        }
        // Count the request the moment we fire it.
        requestRef.current += 1
        setRequestCount(requestRef.current)

        // BUG: no cleanup, no cancellation. Whatever resolves LAST wins, even if
        // it belongs to a query the user already moved past. The captured
        // `query` is committed unconditionally when the promise settles.
        searchApi(query).then((rows) => {
            setResults(rows)
            setCommittedQuery(query)
        })
    }, [query])

    return (
        <Card data-testid="buggy-panel" className="flex flex-col gap-3 p-3">
            <Card.Header className="p-0">
                <Typography.Heading level={6} weight="semibold">
                    Buggy — no cleanup
                </Typography.Heading>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 p-0">
                <Typography.Paragraph size="xs" color="muted">
                    {"Commits "}
                    <span className="font-semibold">whichever response lands last</span>
                    {" — a stale slow query can overwrite a newer one."}
                </Typography.Paragraph>
                <div className="flex items-center justify-between">
                    <Typography.Paragraph size="xs" color="muted">
                        Committed query
                    </Typography.Paragraph>
                    <span
                        data-testid="buggy-committed-query"
                        className="text-sm font-semibold tabular-nums text-foreground"
                    >
                        {committedQuery}
                    </span>
                </div>
                <ul
                    data-testid="buggy-results"
                    className="flex flex-col gap-1 text-sm text-foreground"
                >
                    {results.map((row) => (
                        <li key={row}>{row}</li>
                    ))}
                </ul>
            </Card.Content>
            <Card.Footer className="border-t border-default-200/60 bg-default-100">
                <div className="mt-3 flex w-full items-center justify-between">
                    <span className="text-sm text-muted">Requests fired</span>
                    <span
                        data-testid="buggy-request-count"
                        className="text-sm font-semibold tabular-nums text-foreground"
                    >
                        {requestCount}
                    </span>
                </div>
            </Card.Footer>
        </Card>
    )
}
