/**
 * Monthly revenue dataset — 12 fully static entries.
 * Values are deterministic so Playwright tests are stable.
 */
export interface MonthlyRevenue {
  /** Abbreviated month name (Jan–Dec). */
  month: string
  /** Revenue in thousands of USD. */
  revenue: number
}

/** Static 12-month revenue series for the line/bar chart demo. */
export const MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: "Jan", revenue: 120 },
  { month: "Feb", revenue: 145 },
  { month: "Mar", revenue: 132 },
  { month: "Apr", revenue: 178 },
  { month: "May", revenue: 165 },
  { month: "Jun", revenue: 210 },
  { month: "Jul", revenue: 198 },
  { month: "Aug", revenue: 225 },
  { month: "Sep", revenue: 190 },
  { month: "Oct", revenue: 240 },
  { month: "Nov", revenue: 215 },
  { month: "Dec", revenue: 260 },
]
