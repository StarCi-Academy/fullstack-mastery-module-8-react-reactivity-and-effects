import { Button, Card } from "@heroui/react"
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
        <Card data-testid="control-panel" className="border border-default-200/60 rounded-large p-5">
            <Card.Content className="flex flex-wrap gap-2 pt-4 p-0">
                <Button data-testid="btn-inc" variant="primary" onPress={() => incrementTick()}>
                    +1
                </Button>
                <Button data-testid="btn-burst" variant="outline" onPress={() => burstTick(5)}>
                    +5 burst
                </Button>
                <Button data-testid="btn-reset" variant="ghost" onPress={() => resetTick()}>
                    reset
                </Button>
            </Card.Content>
        </Card>
    )
}
