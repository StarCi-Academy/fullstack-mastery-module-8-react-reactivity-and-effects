/**
 * Mock search API with a per-query, deterministic delay.
 *
 * This is a client-side stand-in for a real backend search endpoint. The whole
 * point of the lesson is that responses can arrive **out of order**: a query
 * typed earlier may resolve *after* a query typed later. To make that race
 * reproducible (so Playwright can assert on it), the delay is keyed off the
 * query length rather than being random:
 *
 *   - SHORT prefixes are SLOW   (e.g. "re"  -> 600ms)
 *   - LONGER prefixes are FAST  (e.g. "react" -> 80ms)
 *
 * So if a user types "re" then quickly extends it to "react", the slow "re"
 * response lands last and — without cancellation — clobbers the correct
 * "react" results. That is the classic effect race condition.
 */

/** Tunable base latency (ms). Longer queries resolve faster, shorter slower. */
const SLOW_MS = 600
const FAST_MS = 80

/** Compute a deterministic delay so the race is reproducible across runs. */
export const delayForQuery = (query: string): number => {
    // Each extra character shaves latency; clamp to FAST_MS as the floor.
    const computed = SLOW_MS - query.trim().length * 130
    return Math.max(FAST_MS, computed)
}

/** Build the fake result rows for a query. */
const resultsFor = (query: string): string[] => {
    const q = query.trim()
    if (q === "") return []
    // Deterministic, query-derived rows so assertions can match on text.
    return [`${q} result 1`, `${q} result 2`, `${q} result 3`]
}

/**
 * Run a mock search. Rejects with an `AbortError` if the optional `signal`
 * aborts before the delay elapses — mirroring how `fetch(url, { signal })`
 * behaves, so the fixed component can cancel an in-flight request.
 */
export const searchApi = (query: string, signal?: AbortSignal): Promise<string[]> => {
    const ms = delayForQuery(query)
    return new Promise<string[]>((resolve, reject) => {
        // Already aborted before we even start — reject immediately.
        if (signal?.aborted) {
            reject(new DOMException("Aborted", "AbortError"))
            return
        }
        const timer = setTimeout(() => {
            signal?.removeEventListener("abort", onAbort)
            resolve(resultsFor(query))
        }, ms)
        // When the caller aborts, clear the pending timer and reject.
        const onAbort = (): void => {
            clearTimeout(timer)
            reject(new DOMException("Aborted", "AbortError"))
        }
        signal?.addEventListener("abort", onAbort, { once: true })
    })
}
