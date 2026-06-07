import { useEffect, useState, useSyncExternalStore } from "react"
import {
    getWindowSizeServerSnapshot,
    getWindowSizeSnapshot,
    queryStore,
    subscribeToWindowSize,
    tickStore,
    type QueryState,
    type WindowSize,
} from "./store"

/**
 * Read the shared tick value the RIGHT way: subscribe to the external store with
 * `useSyncExternalStore`. React guarantees every component reading this store
 * within one render pass sees the SAME value — no tearing — and the value is
 * always exactly the store's current snapshot.
 */
export function useTick(): number {
    return useSyncExternalStore(tickStore.subscribe, tickStore.getSnapshot)
}

/**
 * Read the tick value the WRONG way: copy the external value into local state
 * inside an effect. This is the anti-pattern the lesson warns against. The
 * mirror updates only AFTER React commits and runs the effect, so during a
 * synchronous burst of store updates it can lag behind the real snapshot.
 */
export function useBuggyTickMirror(): number {
    // Bug on purpose: an effect-based mirror that snapshots ONCE on mount and
    // never subscribes, so once the store moves on the mirror stays stale and
    // visibly tears away from the `useSyncExternalStore` reader.
    const [mirror, setMirror] = useState<number>(0)

    useEffect(() => {
        // Reconcile a single time after the first commit, then go silent — later
        // store changes never reach `mirror`. This is the classic effect-mirror
        // anti-pattern that `useSyncExternalStore` exists to replace.
        setMirror(tickStore.getSnapshot())
    }, [])

    return mirror
}

/**
 * Read the live browser window size through `useSyncExternalStore`, passing a
 * server snapshot so the same hook is safe under SSR. This is the production
 * pattern for `useWindowSize` / `useMediaQuery` / `useOnlineStatus`.
 */
export function useWindowSize(): WindowSize {
    return useSyncExternalStore(
        subscribeToWindowSize,
        getWindowSizeSnapshot,
        getWindowSizeServerSnapshot,
    )
}

/**
 * Read the async query external store through `useSyncExternalStore`. The
 * latest-wins logic lives in the store (see `runQuery`), so the UI always shows
 * the most recent committed result even when a slow earlier request resolves
 * after a fast later one.
 */
export function useQuery(): QueryState {
    return useSyncExternalStore(
        queryStore.subscribe,
        queryStore.getSnapshot,
        queryStore.getServerSnapshot,
    )
}
