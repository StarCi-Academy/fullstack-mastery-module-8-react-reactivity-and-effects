import { Button } from "@heroui/react"
import { SectionLabel } from "../SectionLabel"
import { burstTick, incrementTick, resetTick } from "../../lib"

/**
 * ControlPanel — buttons that imperatively mutate the EXTERNAL store. None of
 * these handlers touch React state directly; they call store mutators, and the
 * store notifies its subscribers, which is what drives every reader to render.
 *
 * The "+5 burst" applies five synchronous increments in one click — used to
 * expose the lag of a `useEffect`-mirror reader versus a `useSyncExternalStore`
 * reader.
 */
export function ControlPanel(): JSX.Element {
    return (
        <section data-testid="control-panel" className="flex flex-col gap-2">
            <SectionLabel>Controls</SectionLabel>
            <div className="flex flex-wrap gap-2">
                <Button data-testid="btn-inc" variant="primary" onPress={() => incrementTick()}>
                    +1
                </Button>
                <Button data-testid="btn-burst" variant="outline" onPress={() => burstTick(5)}>
                    +5 Burst
                </Button>
                <Button data-testid="btn-reset" variant="danger" onPress={() => resetTick()}>
                    Reset
                </Button>
            </div>
        </section>
    )
}
