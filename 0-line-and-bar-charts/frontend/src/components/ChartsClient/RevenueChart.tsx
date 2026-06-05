import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
} from "recharts"
import type { MonthlyRevenue } from "../../lib/data"

/** Possible chart type values, switched by the Tabs selector. */
export type ChartType = "line" | "bar"

/** Stroke/fill color for the revenue series — readable on both light and dark. */
const SERIES_COLOR = "#3b82f6"

interface RevenueChartProps {
  /** Dataset to render. */
  data: MonthlyRevenue[]
  /** Which Recharts chart variant to render. */
  chartType: ChartType
}

/**
 * RevenueChart — renders the monthly revenue data as either a LineChart or
 * BarChart based on the active toggle, wrapped in a ResponsiveContainer.
 */
export function RevenueChart({ data, chartType }: RevenueChartProps): JSX.Element {
  /** Shared axes + decorators used by both chart variants. */
  const commonChildren = (
    <>
      {/* dashed background grid */}
      <CartesianGrid strokeDasharray="3 3" />
      {/* x-axis keyed on month abbreviation */}
      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
      {/* y-axis auto-domain */}
      <YAxis tick={{ fontSize: 12 }} />
      {/* hover tooltip */}
      <Tooltip />
      {/* series legend below chart */}
      <Legend />
    </>
  )

  return (
    // data-testid lets Playwright confirm the chart is mounted
    <div data-testid="chart">
      <ResponsiveContainer width="100%" height={280}>
        {chartType === "line" ? (
          <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            {commonChildren}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={SERIES_COLOR}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            {commonChildren}
            <Bar dataKey="revenue" fill={SERIES_COLOR} radius={[3, 3, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
