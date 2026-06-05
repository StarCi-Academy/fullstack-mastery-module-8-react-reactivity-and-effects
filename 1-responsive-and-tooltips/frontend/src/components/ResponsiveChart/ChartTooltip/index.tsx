import type { TooltipProps } from "recharts"
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

/** USD formatter — reused on every render but created once per module load. */
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

/**
 * ChartTooltip — custom Recharts tooltip that formats the hovered value as USD.
 *
 * Rendered via `<Tooltip content={<ChartTooltip />}` on the LineChart.
 * The wrapping div carries `data-testid="tooltip"` so Playwright can assert
 * visibility; the value span carries `data-testid="tooltip-value"`.
 */
export function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>): JSX.Element | null {
  // Only render when Recharts signals an active hover point with data.
  if (!active || !payload || payload.length === 0) return null

  const raw = payload[0].value
  // Coerce to number; guard against undefined edge cases.
  const numeric = typeof raw === "number" ? raw : Number(raw ?? 0)

  return (
    <div
      data-testid="tooltip"
      className="rounded-lg border border-border bg-background px-3 py-2 shadow-md"
    >
      {/* Month label */}
      <p className="mb-1 text-xs font-medium text-muted">{label}</p>
      {/* Currency-formatted value */}
      <p className="text-sm font-semibold text-foreground">
        <span data-testid="tooltip-value">{usdFormatter.format(numeric)}</span>
      </p>
    </div>
  )
}
