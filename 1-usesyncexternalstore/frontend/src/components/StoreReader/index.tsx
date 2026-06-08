import { Card } from "@heroui/react"
import { useRef } from "react"
import { SubLabel } from "../SubLabel"
import { useTick } from "../../lib"

/** Props for a single store reader row. */
interface StoreReaderProps {
    /** Human label shown above the tick value. */
    label: string
    /** testid suffix so two instances stay distinguishable (`a` / `b`). */
    slot: string
}

/**
 * StoreReader — subscribes to the shared tick store via `useSyncExternalStore`
 * (through the `useTick` hook). Two instances sit side by side; because both
 * read the SAME external snapshot, their values are always identical — the
 * concrete demonstration that React renders external-store readers consistently
 * (no tearing).
 *
 * A `useRef` render counter proves the component re-renders exactly when the
 * store value changes, without itself triggering extra renders.
 *
 * @param props.label Human label for this reader row.
 * @param props.slot Playwright suffix (`a` / `b`).
 */
export function StoreReader({ label, slot }: StoreReaderProps): JSX.Element {
    const tick = useTick()

    // Count renders via a ref so reading the count does not cause a render.
    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <Card
            data-testid={`reader-${slot}`}
            className="flex min-w-0 flex-1 flex-col gap-2 border p-3 shadow-none"
        >
            <Card.Content className="flex flex-col gap-2 p-0">
                <SubLabel>{label}</SubLabel>
                <span
                    data-testid={`tick-${slot}`}
                    className="text-4xl font-bold tabular-nums text-foreground"
                >
                    {tick}
                </span>
                <div className="flex items-center justify-between">
                    <SubLabel>Renders</SubLabel>
                    <span
                        data-testid={`render-${slot}`}
                        className="text-sm font-semibold tabular-nums text-foreground"
                    >
                        {renderRef.current}
                    </span>
                </div>
            </Card.Content>
        </Card>
    )
}
