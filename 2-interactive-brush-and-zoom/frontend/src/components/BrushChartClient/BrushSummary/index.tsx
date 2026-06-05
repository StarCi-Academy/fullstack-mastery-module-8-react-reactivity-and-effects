import type { DayPoint } from "../../../lib/data"

/** Props for BrushSummary. */
interface BrushSummaryProps {
  /** The slice of data currently selected by the brush. */
  selected: DayPoint[]
  /** Absolute start index in the full dataset. */
  startIndex: number
  /** Absolute end index in the full dataset. */
  endIndex: number
}

/**
 * BrushSummary — displays aggregate statistics for the active brush window.
 *
 * Each key stat is wrapped in a data-testid span so Playwright can assert
 * deterministic values without touching SVG internals.
 */
export function BrushSummary({ selected, startIndex, endIndex }: BrushSummaryProps): JSX.Element {
  // Compute sum of the primary `value` field over the selected window
  const sum = selected.reduce((acc, pt) => acc + pt.value, 0)
  const count = selected.length

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
      {/* range indices */}
      <span>
        Range:{" "}
        <span data-testid="range-start" className="font-medium text-foreground">
          {startIndex}
        </span>
        {" – "}
        <span data-testid="range-end" className="font-medium text-foreground">
          {endIndex}
        </span>
      </span>

      {/* point count */}
      <span>
        <span data-testid="range-count" className="font-medium text-foreground">
          {count}
        </span>{" "}
        points
      </span>

      {/* sum of values */}
      <span>
        sum{" "}
        <span data-testid="range-sum" className="font-medium text-foreground">
          {sum}
        </span>
      </span>
    </div>
  )
}
