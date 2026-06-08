/**
 * A tiny framework-agnostic external store living at module scope.
 *
 * This is deliberately NOT React state: it is a plain JavaScript object that
 * holds a value plus a set of subscriber callbacks. React connects to it
 * through `useSyncExternalStore`, the correct primitive for reading an external
 * mutable source without mirroring it into `useState` via an effect.
 */

/** A function the store invokes whenever its value changes. */
type Listener = () => void

/** The shape returned by {@link createExternalStore}. */
export interface ExternalStore<T> {
    /**
     * Register a listener. Returns an unsubscribe function — exactly the
     * contract `useSyncExternalStore`'s `subscribe` argument expects.
     */
    subscribe: (listener: Listener) => () => void
    /** Read the current value synchronously (the `getSnapshot` argument). */
    getSnapshot: () => T
    /** Imperatively replace the value and notify every listener. */
    setSnapshot: (next: T) => void
}

/**
 * Create a minimal external store holding a single immutable value.
 *
 * The value must be REPLACED (never mutated) so that `Object.is(prev, next)`
 * inside `useSyncExternalStore` can detect a real change and trigger a render.
 */
export const createExternalStore = <T,>(initial: T): ExternalStore<T> => {
    let value = initial
    const listeners = new Set<Listener>()

    return {
        subscribe(listener: Listener): () => void {
            listeners.add(listener)
            // The returned cleanup detaches the listener — React calls it on unmount.
            return (): void => {
                listeners.delete(listener)
            }
        },
        getSnapshot(): T {
            return value
        },
        setSnapshot(next: T): void {
            // Skip the notify if the reference did not actually change.
            if (Object.is(value, next)) return
            value = next
            // Notify every subscriber; React schedules one consistent re-render.
            listeners.forEach((listener) => listener())
        },
    }
}

/**
 * The demo "tick" store — a module-level counter incremented imperatively from
 * the UI. It is the single source of truth that BOTH reader components observe,
 * which is how we prove they never tear (always render the same value).
 */
export const tickStore = createExternalStore<number>(0)

/** Increment the tick value by one — called from the button handler. */
export const incrementTick = (): void => {
    tickStore.setSnapshot(tickStore.getSnapshot() + 1)
}

/** Reset the tick value back to zero. */
export const resetTick = (): void => {
    tickStore.setSnapshot(0)
}

/**
 * Apply a burst of N synchronous increments. Used to stress the difference
 * between a `useSyncExternalStore` reader (always exact) and a buggy
 * `useEffect`-mirror reader (which can lag behind).
 */
export const burstTick = (times: number): void => {
    for (let i = 0; i < times; i += 1) incrementTick()
}

/** Snapshot of the browser window size — a real external (browser) store. */
export interface WindowSize {
    width: number
    height: number
}

/**
 * Subscribe to the browser `resize` event. This is the canonical
 * `useSyncExternalStore` subscribe function for a browser API: wire the native
 * event, return a cleanup that removes it.
 */
export const subscribeToWindowSize = (listener: Listener): () => void => {
    window.addEventListener("resize", listener)
    return (): void => window.removeEventListener("resize", listener)
}

// Cache the snapshot object so getSnapshot returns a STABLE reference while the
// size is unchanged — returning a fresh object every call would loop forever
// because Object.is would always report a change.
let cachedSize: WindowSize = { width: 0, height: 0 }

/** Read the current window size, returning a cached object when unchanged. */
export const getWindowSizeSnapshot = (): WindowSize => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (width !== cachedSize.width || height !== cachedSize.height) {
        cachedSize = { width, height }
    }
    return cachedSize
}

/** Server snapshot for window size — there is no `window` during SSR. */
export const getWindowSizeServerSnapshot = (): WindowSize => {
    return { width: 0, height: 0 }
}

/** Immutable snapshot of the async "search" external store. */
export interface QueryState {
    /** Query string of the most recently COMMITTED result. */
    result: string
    /** Monotonic id of the committed result (0 = nothing committed yet). */
    committedId: number
    /** Whether a request is currently in flight. */
    pending: boolean
}

/** Cached query snapshot — stable reference until it actually changes. */
let queryState: QueryState = { result: "", committedId: 0, pending: false }

/** Subscribers of the query store. */
const queryListeners = new Set<Listener>()

/** Monotonic id assigned per `runQuery`; the highest id is the "latest". */
let latestQueryId = 0

/** Replace the query snapshot (new reference) and notify subscribers. */
const commitQuery = (next: QueryState): void => {
    queryState = next
    queryListeners.forEach((listener) => listener())
}

/**
 * The async query external store — `subscribe` / `getSnapshot` matching the
 * `useSyncExternalStore` contract. Latest-wins logic lives HERE, not in a
 * component, so every subscriber observes one consistent committed result.
 */
export const queryStore = {
    /** Register a listener; returns the unsubscribe function. */
    subscribe(listener: Listener): () => void {
        queryListeners.add(listener)
        return (): void => {
            queryListeners.delete(listener)
        }
    },
    /** Read the current committed snapshot (stable reference). */
    getSnapshot(): QueryState {
        return queryState
    },
    /** Server snapshot for SSR / first render. */
    getServerSnapshot(): QueryState {
        return { result: "", committedId: 0, pending: false }
    },
}

/**
 * Start an async query that resolves after `delayMs`. The result is committed
 * ONLY if this request is still the latest when it resolves — a slow earlier
 * request that finishes after a fast later one is dropped (latest-wins).
 */
export const runQuery = (query: string, delayMs: number): void => {
    const id = ++latestQueryId
    commitQuery({ ...queryState, pending: true })

    window.setTimeout((): void => {
        // Stale response: a newer query was started — discard it.
        if (id !== latestQueryId) return
        commitQuery({ result: query, committedId: id, pending: false })
    }, delayMs)
}

/** Reset the query store and its id counter to the initial state. */
export const resetQuery = (): void => {
    latestQueryId = 0
    commitQuery({ result: "", committedId: 0, pending: false })
}
