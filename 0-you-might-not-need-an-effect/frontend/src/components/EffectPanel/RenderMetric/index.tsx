interface RenderMetricProps {
    /** Row label shown beside the render count. */
    label: string
    /** Current render count from the parent component ref. */
    value: number
    /** Playwright hook for the numeric value. */
    testId: string
    /** Optional Tailwind classes merged onto the root row. */
    className?: string
}

/**
 * RenderMetric — footer row showing how many times a panel rendered.
 *
 * The number is fed from a `useRef` in the parent (incremented during render),
 * so reading it never triggers an extra render of its own.
 *
 * @param props.label Row label beside the count.
 * @param props.value Current render count from the parent ref.
 * @param props.testId Playwright hook for the numeric value.
 * @param props.className Optional classes on the root row (e.g. footer spacing).
 */
export const RenderMetric = (props: RenderMetricProps): JSX.Element => {
    const { label, value, testId, className } = props

    return (
        <div className={`flex w-full items-center justify-between${className ? ` ${className}` : ""}`}>
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
