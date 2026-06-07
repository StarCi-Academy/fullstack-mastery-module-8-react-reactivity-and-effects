import { Typography } from "@heroui/react"

/**
 * SubscriptionLegend — a short caption explaining what to watch on the page:
 * two readers subscribed to one external store always agree, and the buggy
 * effect-mirror is the contrast.
 */
export function SubscriptionLegend(): JSX.Element {
    return (
        <Typography.Paragraph size="sm" color="muted">
            Both readers subscribe to the same external store via
            useSyncExternalStore, so their tick values are always identical. The
            buggy useEffect mirror copies the value into state and can lag behind.
        </Typography.Paragraph>
    )
}
