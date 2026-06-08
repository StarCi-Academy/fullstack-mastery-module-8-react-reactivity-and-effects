import { Card, Typography } from "@heroui/react"
import { useEffect, useRef, useState } from "react"
import { searchApi } from "../../../lib"

/**
 * Props — the live query string driven by the parent input.
 */
interface FixedSearchProps {
    /** Current search query (controlled by the parent SearchClient). */
    query: string
}

/**
 * FixedSearch — the CORRECT way to fetch inside an effect.
 *
 * Two guards work together:
 *   1. An `ignore` flag flipped in cleanup — when the effect re-runs (query
 *      changed) or the component unmounts, the old run's pending `.then` checks
 *      `ignore` and refuses to call `setResults`. So a stale response can never
 *      commit, even if it resolves last.
 *   2. An `AbortController` whose `signal` is passed to `searchApi` and aborted
 *      in cleanup — this actually *cancels* the in-flight request (mirrors
 *      `fetch(url, { signal })`), so we stop wasting work on a query the user
 *      already abandoned.
 *
 * The result: `fixed-committed-query` always reflects the **latest** query,
 * regardless of which response physically resolves last.
 */
export const FixedSearch = ({ query }: FixedSearchProps): JSX.Element => {
    // Results shown plus the query they belong to. With the guards in place the
    // committed query always converges to the latest input.
    const [results, setResults] = useState<string[]>([])
    const [committedQuery, setCommittedQuery] = useState<string>("")

    // Total requests fired and how many were cancelled by an abort in cleanup.
    const requestRef = useRef(0)
    const [requestCount, setRequestCount] = useState(0)
    const abortedRef = useRef(0)
    const [abortedCount, setAbortedCount] = useState(0)

    useEffect(() => {
        if (query.trim() === "") {
            setResults([])
            setCommittedQuery("")
            return
        }
        // `ignore` belongs to THIS effect run; cleanup flips it so a late
        // response from a superseded run cannot commit stale state.
        let ignore = false
        const controller = new AbortController()

        // Count the request the moment we fire it.
        requestRef.current += 1
        setRequestCount(requestRef.current)

        searchApi(query, controller.signal)
            .then((rows) => {
                if (ignore) return
                setResults(rows)
                setCommittedQuery(query)
            })
            .catch((err: unknown) => {
                // Aborted requests reject with AbortError — count it and swallow;
                // any other error is left to surface (kept minimal for the lesson).
                if (err instanceof DOMException && err.name === "AbortError") {
                    abortedRef.current += 1
                    setAbortedCount(abortedRef.current)
                    return
                }
            })

        // Cleanup: runs before the next effect and on unmount. Ignore the stale
        // run AND abort its in-flight request.
        return () => {
            ignore = true
            controller.abort()
        }
    }, [query])

    return (
        <Card data-testid="fixed-panel" className="flex h-full flex-col gap-3 border border-default-200 p-3 shadow-none">
            <Card.Header className="p-0">
                <Typography.Heading level={6} weight="semibold">
                    Fixed — AbortController + ignore
                </Typography.Heading>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 p-0">
                <Typography.Paragraph size="xs" color="muted">
                    {"Cleanup "}
                    <span className="font-semibold">ignores and aborts</span>
                    {" stale runs, so the latest query always wins."}
                </Typography.Paragraph>
                <div className="flex items-center justify-between">
                    <Typography.Paragraph size="xs" color="muted">
                        Committed query
                    </Typography.Paragraph>
                    <span
                        data-testid="fixed-committed-query"
                        className="text-sm font-semibold tabular-nums text-foreground"
                    >
                        {committedQuery}
                    </span>
                </div>
                <ul
                    data-testid="fixed-results"
                    className="flex flex-col gap-1 text-sm text-foreground"
                >
                    {results.map((row) => (
                        <li key={row}>{row}</li>
                    ))}
                </ul>
            </Card.Content>
            <Card.Footer className="border-t p-0">
                <div className="mt-3 flex w-full flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">Requests fired</span>
                        <span
                            data-testid="fixed-request-count"
                            className="text-sm font-semibold tabular-nums text-foreground"
                        >
                            {requestCount}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">Aborted (stale)</span>
                        <span
                            data-testid="fixed-aborted-count"
                            className="text-sm font-semibold tabular-nums text-foreground"
                        >
                            {abortedCount}
                        </span>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}
