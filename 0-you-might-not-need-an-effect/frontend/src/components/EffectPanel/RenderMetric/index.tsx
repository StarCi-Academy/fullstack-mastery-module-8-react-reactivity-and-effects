interface RenderMetricProps {
    /** Row label shown beside the render count. */
    label: string
    /** Current render count from the parent component ref. */
    value: number
    /** Playwright hook for the numeric value. */
    testId: string
}

/**
 * RenderMetric — footer row showing how many times a panel rendered.
 *
 * The number is fed from a `useRef` in the parent (incremented during render),
 * so reading it never triggers an extra render of its own.
 */
export const RenderMetric = (props: RenderMetricProps): JSX.Element => {
    const { label, value, testId } = props

    return (
        <div className="mt-3 flex w-full items-center justify-between">
            <span className="text-sm text-muted">{label}</span>
            <span
                data-testid={testId}
                className="text-sm font-semibold tabular-nums text-foreground"
            >
                {value}
            </span>
        </div>
    )
}
