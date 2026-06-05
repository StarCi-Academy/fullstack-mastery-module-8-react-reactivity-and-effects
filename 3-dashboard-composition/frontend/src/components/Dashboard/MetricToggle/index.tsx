import { Button } from "@heroui/react"
import type { MetricKey } from "../../../lib/data"

interface MetricToggleProps {
  /** Currently selected metric key. */
  active: MetricKey
  /** Called when the user picks a different metric. */
  onChange: (metric: MetricKey) => void
}

/**
 * MetricToggle — two HeroUI buttons that switch the active metric.
 * data-testid anchors match Playwright spec.
 */
export function MetricToggle({ active, onChange }: MetricToggleProps): JSX.Element {
  return (
    <div className="flex gap-2">
      {/* Revenue toggle */}
      <Button
        variant={active === "revenue" ? "solid" : "bordered"}
        size="sm"
        data-testid="metric-revenue"
        onPress={() => onChange("revenue")}
      >
        Revenue
      </Button>
      {/* Orders toggle */}
      <Button
        variant={active === "orders" ? "solid" : "bordered"}
        size="sm"
        data-testid="metric-orders"
        onPress={() => onChange("orders")}
      >
        Orders
      </Button>
    </div>
  )
}
