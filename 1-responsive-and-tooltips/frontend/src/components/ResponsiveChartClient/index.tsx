import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { MONTHLY_REVENUE } from "../../lib/data"
import { ChartTooltip } from "./ChartTooltip"
import { ChartSummary } from "./ChartSummary"

/**
 * ResponsiveChartClient — the shared lesson content for "Responsive & Tooltips".
 * Used by both Local and Sandbox (single-client lesson, no view-switcher).
 *
 * Renders a Recharts LineChart inside a ResponsiveContainer so the chart adapts
 * to whatever column width the layout provides. A custom Tooltip component
 * (ChartTooltip) formats the hovered data point as USD currency. The
 * ChartSummary below the chart exposes pre-computed stats as testable DOM nodes.
 *
 * The lesson title/description now live in App.tsx, so this component renders
 * only the chart body.
 */
export function ResponsiveChartClient(): JSX.Element {
  return (
    <div className="flex flex-col">
      {/* Chart wrapper — data-testid anchors Playwright assertions on the SVG area */}
      <div data-testid="chart">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={MONTHLY_REVENUE}
            margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
          >
            {/* Subtle grid */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

            {/* Month labels on x-axis */}
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            {/* Value axis — hide line/ticks for a cleaner look */}
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              width={48}
            />

            {/* Custom tooltip via the content prop */}
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "4 4" }} />

            {/* Single revenue line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#3b82f6", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Spacer before summary */}
      <div className="h-4" />

      {/* Deterministic summary — total and avg exposed as test-ids */}
      <ChartSummary />
    </div>
  )
}
