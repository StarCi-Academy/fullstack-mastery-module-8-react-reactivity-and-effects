/**
 * Static deterministic datasets for the Dashboard Composition lesson.
 * All values are hard-coded — no randomness, no Date(), no fetch().
 */

/** A single month data point for the line chart. */
export interface MonthPoint {
  /** Three-letter month abbreviation. */
  month: string
  /** Metric value for this month. */
  value: number
}

/** A category data point for bar and pie charts. */
export interface CategoryPoint {
  /** Category name. */
  category: string
  /** Metric value for this category. */
  value: number
}

/** Full dataset for one metric. */
export interface MetricDataset {
  /** Human-readable metric label. */
  label: string
  /** Monthly trend series (12 months). */
  monthly: MonthPoint[]
  /** Per-category breakdown. */
  byCategory: CategoryPoint[]
}

/** Revenue dataset — monthly totals and per-category breakdown. */
const revenueDataset: MetricDataset = {
  label: "Revenue ($)",
  monthly: [
    { month: "Jan", value: 12400 },
    { month: "Feb", value: 14800 },
    { month: "Mar", value: 13200 },
    { month: "Apr", value: 15600 },
    { month: "May", value: 17900 },
    { month: "Jun", value: 16400 },
    { month: "Jul", value: 19200 },
    { month: "Aug", value: 21500 },
    { month: "Sep", value: 20100 },
    { month: "Oct", value: 22800 },
    { month: "Nov", value: 25300 },
    { month: "Dec", value: 28600 },
  ],
  byCategory: [
    { category: "SaaS", value: 98400 },
    { category: "Consulting", value: 47200 },
    { category: "Training", value: 31600 },
    { category: "Support", value: 14600 },
  ],
}

/** Orders dataset — monthly counts and per-category breakdown. */
const ordersDataset: MetricDataset = {
  label: "Orders",
  monthly: [
    { month: "Jan", value: 340 },
    { month: "Feb", value: 420 },
    { month: "Mar", value: 390 },
    { month: "Apr", value: 460 },
    { month: "May", value: 510 },
    { month: "Jun", value: 480 },
    { month: "Jul", value: 560 },
    { month: "Aug", value: 620 },
    { month: "Sep", value: 590 },
    { month: "Oct", value: 650 },
    { month: "Nov", value: 710 },
    { month: "Dec", value: 780 },
  ],
  byCategory: [
    { category: "SaaS", value: 2840 },
    { category: "Consulting", value: 1360 },
    { category: "Training", value: 920 },
    { category: "Support", value: 380 },
  ],
}

/** Keyed map of available metrics. */
export const DATASETS = {
  revenue: revenueDataset,
  orders: ordersDataset,
} as const

/** Union of valid metric keys. */
export type MetricKey = keyof typeof DATASETS

/**
 * Compute the grand total for a dataset's monthly series.
 * @param dataset - The metric dataset to sum.
 * @returns Sum of all monthly values.
 */
export const computeTotal = (dataset: MetricDataset): number =>
  dataset.monthly.reduce((acc, p) => acc + p.value, 0)
