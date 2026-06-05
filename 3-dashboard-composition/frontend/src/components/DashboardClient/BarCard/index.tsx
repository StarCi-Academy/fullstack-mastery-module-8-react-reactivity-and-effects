import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { CategoryPoint } from "../../../lib/data"

interface BarCardProps {
  /** Per-category data points to render. */
  data: CategoryPoint[]
  /** Label for the metric (used in tooltip). */
  label: string
}

/**
 * BarCard — per-category bar chart wrapped in a responsive container.
 * The outer div carries data-testid="chart-bar" for Playwright.
 */
export function BarCard({ data, label }: BarCardProps): JSX.Element {
  return (
    <div data-testid="chart-bar" className="w-full">
      {/* Card title */}
      <div className="mb-2 text-xs font-medium text-muted">By Category</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="category" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={45} />
          {/* Tooltip shows the active metric label */}
          <Tooltip formatter={(v: number) => [v, label]} />
          <Bar dataKey="value" fill="#22c55e" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
