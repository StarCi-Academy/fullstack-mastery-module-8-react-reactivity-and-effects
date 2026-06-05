import { useState } from "react"
import { DATASETS, computeTotal, type MetricKey } from "../../lib/data"
import { MetricToggle } from "./MetricToggle"
import { LineCard } from "./LineCard"
import { BarCard } from "./BarCard"
import { PieCard } from "./PieCard"

/**
 * DashboardClient — the shared lesson content. Used by both Local and Sandbox
 * (single-client lesson, no multi-pane).
 *
 * Owns the active metric state; all child charts and the KPI total derive from
 * the same selected dataset so switching metric updates everything. The lesson
 * title/description now live in App.tsx.
 */
export function DashboardClient(): JSX.Element {
  // Active metric key — drives all charts and the KPI total
  const [metric, setMetric] = useState<MetricKey>("revenue")

  // Derive the full dataset and total from the active metric key
  const dataset = DATASETS[metric]
  const total = computeTotal(dataset)

  return (
    <div className="flex flex-col">
      {/* KPI row — metric toggle + grand total */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MetricToggle active={metric} onChange={setMetric} />
        {/* KPI total — Playwright target */}
        <div className="text-sm text-muted">
          Total:{" "}
          <span
            data-testid="kpi-total"
            className="font-semibold text-foreground"
          >
            {total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="h-4" />

      {/* Responsive chart grid — stacks on small screens, 2-col on medium+ */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Line chart — monthly trend */}
        <LineCard data={dataset.monthly} label={dataset.label} />
        {/* Bar chart — per-category breakdown */}
        <BarCard data={dataset.byCategory} label={dataset.label} />
        {/* Pie chart — category share, spans full width on small, 2 cols on md */}
        <div className="md:col-span-2">
          <PieCard data={dataset.byCategory} label={dataset.label} />
        </div>
      </div>
    </div>
  )
}
