import { useState } from "react"
import { MONTHLY_REVENUE } from "../../lib/data"
import { ChartToggle } from "./ChartToggle"
import type { ChartType } from "./ChartToggle"
import { RevenueChart } from "./RevenueChart"

/** Pre-computed max revenue value — deterministic, no runtime randomness. */
const MAX_REVENUE = Math.max(...MONTHLY_REVENUE.map((d) => d.revenue))

/**
 * ChartsPanel — lesson sandbox panel demonstrating Recharts LineChart and
 * BarChart with a HeroUI toggle.
 *
 * Header rhythm: title -> h-3 -> description (text-muted) -> h-6 -> content.
 */
export function ChartsPanel(): JSX.Element {
  /** Active chart type controlled by the toggle buttons. */
  const [chartType, setChartType] = useState<ChartType>("line")

  return (
    <div className="flex flex-col">
      {/* Panel title */}
      <div className="text-base font-semibold text-foreground">
        Line &amp; Bar Charts
      </div>

      {/* Spacer after title */}
      <div className="h-3" />

      {/* Panel description */}
      <div className="text-sm text-muted">
        Render a dataset as a Recharts LineChart, toggle to a BarChart — axes,
        grid, legend, responsive container.
      </div>

      {/* Spacer after description */}
      <div className="h-6" />

      {/* Toggle: Line / Bar */}
      <ChartToggle value={chartType} onChange={setChartType} />

      <div className="h-4" />

      {/* Recharts responsive chart */}
      <RevenueChart data={MONTHLY_REVENUE} chartType={chartType} />

      <div className="h-3" />

      {/* Summary line with deterministic test anchors */}
      <div className="text-sm text-muted">
        <span data-testid="point-count">{MONTHLY_REVENUE.length}</span>
        {" points · max "}
        <span data-testid="max-value">{MAX_REVENUE}</span>
      </div>
    </div>
  )
}
