import { Card } from "@heroui/react"
import { useRef } from "react"
import { useTick } from "../../lib"

/** Props for a single store reader card. */
interface StoreReaderProps {
    /** Human label shown on the card. */
    label: string
    /** testid suffix so two instances stay distinguishable (`a` / `b`). */
    slot: string
}

/**
 * StoreReader — subscribes to the shared tick store via `useSyncExternalStore`
 * (through the `useTick` hook). Two instances render side by side; because both
 * read the SAME external snapshot, their values are always identical — the
 * concrete demonstration that React renders external-store readers consistently
 * (no tearing).
 *
 * A `useRef` render counter proves the component re-renders exactly when the
 * store value changes, without itself triggering extra renders.
 */
export function StoreReader({ label, slot }: StoreReaderProps): JSX.Element {
    const tick = useTick()

    // Count renders via a ref so reading the count does not cause a render.
    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <Card data-testid={`reader-${slot}`} className="flex flex-col gap-3 border border-default-200/60 rounded-large p-3">
            <Card.Content className="flex flex-col gap-3 p-0">
                <span className="text-sm font-medium text-foreground/70">{label}</span>
                <span
                    data-testid={`tick-${slot}`}
                    className="text-4xl font-bold tabular-nums text-foreground"
                >
                    {tick}
                </span>
                <span
                    data-testid={`render-${slot}`}
                    className="text-sm font-semibold tabular-nums text-foreground"
                >
                    {renderRef.current}
                </span>
            </Card.Content>
        </Card>
    )
}
