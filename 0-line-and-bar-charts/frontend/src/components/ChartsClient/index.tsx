import { useState } from "react"
import { Tabs } from "@heroui/react"
import { MONTHLY_REVENUE } from "../../lib/data"
import { RevenueChart } from "./RevenueChart"
import type { ChartType } from "./RevenueChart"

/** Pre-computed max revenue value — deterministic, no runtime randomness. */
const MAX_REVENUE = Math.max(...MONTHLY_REVENUE.map((d) => d.revenue))

/**
 * ChartsClient — the shared lesson content: a Recharts revenue chart with a
 * Tabs selector to switch between Line and Bar. Used by both Local and Sandbox.
 *
 * The chart type is a view-switch, so it is a HeroUI Tabs selector (indicator,
 * no Panel) — never two toggle buttons. The `chart-type-line` / `chart-type-bar`
 * testids stay on the tabs so the Playwright specs keep clicking them.
 */
export function ChartsClient(): JSX.Element {
  /** Active chart type controlled by the Tabs selector. */
  const [chartType, setChartType] = useState<ChartType>("line")

  return (
    <div className="flex flex-col">
      {/* Chart-type selector: Line / Bar (tabs, not buttons) */}
      <Tabs
        selectedKey={chartType}
        onSelectionChange={(key) => setChartType(key as ChartType)}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Chart type">
            <Tabs.Tab id="line" data-testid="chart-type-line">
              Line
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="bar" data-testid="chart-type-bar">
              Bar
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>

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
