import { Chip } from "@heroui/react"
import { TOTAL_VALUE, AVG_VALUE } from "../../../lib/data"

/**
 * ChartSummary — deterministic stat row rendered below the chart.
 *
 * Values are derived from the static MONTHLY_REVENUE dataset so Playwright
 * can assert `data-testid="total-value"` and `data-testid="avg-value"` without
 * hovering or triggering any event.
 */
export function ChartSummary(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Total revenue stat */}
      <Chip variant="soft" color="accent" size="sm">
        total{" "}
        <span data-testid="total-value" className="font-semibold">
          {TOTAL_VALUE}
        </span>
      </Chip>

      {/* Average revenue stat */}
      <Chip variant="soft" color="success" size="sm">
        avg{" "}
        <span data-testid="avg-value" className="font-semibold">
          {AVG_VALUE}
        </span>
      </Chip>
    </div>
  )
}
