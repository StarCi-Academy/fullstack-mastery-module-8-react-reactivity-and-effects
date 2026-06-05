import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { MonthPoint } from "../../../lib/data"

interface LineCardProps {
  /** Monthly data points to render. */
  data: MonthPoint[]
  /** Label for the metric (used in tooltip). */
  label: string
}

/**
 * LineCard — monthly trend line chart wrapped in a responsive container.
 * The outer div carries data-testid="chart-line" for Playwright.
 */
export function LineCard({ data, label }: LineCardProps): JSX.Element {
  return (
    <div data-testid="chart-line" className="w-full">
      {/* Card title */}
      <div className="mb-2 text-xs font-medium text-muted">Monthly Trend</div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={45} />
          {/* Tooltip shows the active metric label */}
          <Tooltip formatter={(v: number) => [v, label]} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
