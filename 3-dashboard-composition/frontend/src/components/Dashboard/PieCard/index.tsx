import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { CategoryPoint } from "../../../lib/data"

/** Fixed colour palette for pie slices — readable on dark and light backgrounds. */
const SLICE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"] as const

interface PieCardProps {
  /** Per-category data points to render as slices. */
  data: CategoryPoint[]
  /** Label for the metric (used in tooltip). */
  label: string
}

/**
 * PieCard — category share pie chart wrapped in a responsive container.
 * The outer div carries data-testid="chart-pie" for Playwright.
 */
export function PieCard({ data, label }: PieCardProps): JSX.Element {
  return (
    <div data-testid="chart-pie" className="w-full">
      {/* Card title */}
      <div className="mb-2 text-xs font-medium text-muted">Category Share</div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label={false}
          >
            {/* Each slice gets a colour from the fixed palette */}
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={SLICE_COLORS[index % SLICE_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => [v, label]} />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
