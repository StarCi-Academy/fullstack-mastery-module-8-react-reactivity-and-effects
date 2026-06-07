import { Card } from "@heroui/react"
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
        <Card data-testid="window-panel" className="border border-default-200/60 rounded-large p-5">
            <Card.Content className="flex gap-8 pt-4 p-0">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground/70">width</span>
                    <span
                        data-testid="window-width"
                        className="text-2xl font-bold tabular-nums text-foreground"
                    >
                        {width}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground/70">height</span>
                    <span
                        data-testid="window-height"
                        className="text-2xl font-bold tabular-nums text-foreground"
                    >
                        {height}
                    </span>
                </div>
            </Card.Content>
        </Card>
    )
}
