/**
 * Static monthly revenue dataset — 12 deterministic points used by the
 * ResponsiveChart lesson demo. Values are fixed so Playwright assertions
 * remain stable across runs.
 */
export interface DataPoint {
  /** Short month label shown on the x-axis. */
  month: string
  /** Revenue value in USD cents (integer). */
  value: number
}

/** Twelve months of deterministic revenue data (Jan–Dec). */
export const MONTHLY_REVENUE: DataPoint[] = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 5800 },
  { month: "Mar", value: 7100 },
  { month: "Apr", value: 6400 },
  { month: "May", value: 8900 },
  { month: "Jun", value: 11200 },
  { month: "Jul", value: 9700 },
  { month: "Aug", value: 10500 },
  { month: "Sep", value: 13300 },
  { month: "Oct", value: 12100 },
  { month: "Nov", value: 15600 },
  { month: "Dec", value: 18400 },
]

/** Pre-computed sum of all revenue values. */
export const TOTAL_VALUE: number = MONTHLY_REVENUE.reduce(
  (acc, d) => acc + d.value,
  0,
)

/** Pre-computed rounded average of all revenue values. */
export const AVG_VALUE: number = Math.round(TOTAL_VALUE / MONTHLY_REVENUE.length)
