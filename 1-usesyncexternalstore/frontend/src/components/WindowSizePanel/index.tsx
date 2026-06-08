import { MetricCard } from "../MetricCard"
import { SectionLabel } from "../SectionLabel"
import { useWindowSize } from "../../lib"

/**
 * WindowSizePanel — reads a real BROWSER store (window dimensions) through
 * `useSyncExternalStore`. The subscribe function wires the native `resize`
 * event and getSnapshot reads `window.innerWidth/innerHeight`, so the values
 * stay in sync with the viewport with no effect-based mirroring.
 */
export function WindowSizePanel(): JSX.Element {
    const { width, height } = useWindowSize()

    return (
        <section data-testid="window-panel" className="flex flex-col gap-3">
            <SectionLabel>Window size</SectionLabel>
            <div className="flex gap-3">
                <MetricCard
                    label="Width"
                    value={width}
                    testId="window-width"
                    valueClassName="text-2xl font-bold tabular-nums text-foreground"
                />
                <MetricCard
                    label="Height"
                    value={height}
                    testId="window-height"
                    valueClassName="text-2xl font-bold tabular-nums text-foreground"
                />
            </div>
        </section>
    )
}
