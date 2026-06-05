import { Tabs } from "@heroui/react"
import type { MetricKey } from "../../../lib/data"

interface MetricToggleProps {
  /** Currently selected metric key. */
  active: MetricKey
  /** Called when the user picks a different metric. */
  onChange: (metric: MetricKey) => void
}

/**
 * MetricToggle — a HeroUI Tabs selector that switches the active metric.
 *
 * Revenue/Orders are mutually-exclusive views, so this is a Tabs selector
 * (indicator, no Panel) rather than two toggle buttons. The
 * `metric-revenue` / `metric-orders` testids stay on the tabs so the Playwright
 * specs keep clicking them.
 */
export function MetricToggle({ active, onChange }: MetricToggleProps): JSX.Element {
  return (
    <Tabs
      selectedKey={active}
      onSelectionChange={(key) => onChange(key as MetricKey)}
    >
      <Tabs.ListContainer>
        <Tabs.List aria-label="Metric">
          <Tabs.Tab id="revenue" data-testid="metric-revenue">
            Revenue
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="orders" data-testid="metric-orders">
            Orders
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  )
}
