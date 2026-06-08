import { Card } from "@heroui/react"
import { SubLabel } from "../SubLabel"

/** Props for {@link MetricCard}. */
interface MetricCardProps {
    /** Muted sub-label above the value. */
    label: string
    /** Value rendered prominently below the label. */
    value: string | number
    /** Playwright hook on the value element. */
    testId: string
    /** Tailwind classes for the value span. */
    valueClassName?: string
}

/**
 * MetricCard — labeled metric in a bordered card, sized to share a flex row.
 *
 * @param props.label Muted field label.
 * @param props.value Display value.
 * @param props.testId Playwright hook on the value.
 * @param props.valueClassName Optional typography override for the value.
 */
export function MetricCard({
    label,
    value,
    testId,
    valueClassName = "text-3xl font-bold tabular-nums text-foreground",
}: MetricCardProps): JSX.Element {
    return (
        <Card className="flex min-w-0 flex-1 flex-col gap-2 border p-3 shadow-none">
            <Card.Content className="flex flex-col gap-2 p-0">
                <SubLabel>{label}</SubLabel>
                <span data-testid={testId} className={valueClassName}>
                    {value}
                </span>
            </Card.Content>
        </Card>
    )
}
