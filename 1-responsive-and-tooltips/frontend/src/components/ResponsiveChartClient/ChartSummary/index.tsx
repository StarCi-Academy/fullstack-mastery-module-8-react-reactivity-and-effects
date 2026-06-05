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
      {/* Total revenue stat — capitalize is CSS-only so DOM text stays "total" for e2e */}
      <Chip variant="soft" color="accent" size="sm" className="capitalize">
        total{" "}
        <span data-testid="total-value" className="font-semibold normal-case">
          {TOTAL_VALUE}
        </span>
      </Chip>

      {/* Average revenue stat */}
      <Chip variant="soft" color="success" size="sm" className="capitalize">
        avg{" "}
        <span data-testid="avg-value" className="font-semibold normal-case">
          {AVG_VALUE}
        </span>
      </Chip>
    </div>
  )
}
