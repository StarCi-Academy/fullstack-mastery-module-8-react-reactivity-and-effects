import { Button } from "@heroui/react"

/** Possible chart type values. */
export type ChartType = "line" | "bar"

interface ChartToggleProps {
  /** Currently active chart type. */
  value: ChartType
  /** Called when the user selects a different chart type. */
  onChange: (type: ChartType) => void
}

/**
 * ChartToggle — two HeroUI buttons that switch between Line and Bar chart.
 */
export function ChartToggle({ value, onChange }: ChartToggleProps): JSX.Element {
  return (
    <div className="flex gap-2">
      {/* Line chart toggle button */}
      <Button
        variant={value === "line" ? "solid" : "bordered"}
        size="sm"
        data-testid="chart-type-line"
        onPress={() => onChange("line")}
      >
        Line
      </Button>
      {/* Bar chart toggle button */}
      <Button
        variant={value === "bar" ? "solid" : "bordered"}
        size="sm"
        data-testid="chart-type-bar"
        onPress={() => onChange("bar")}
      >
        Bar
      </Button>
    </div>
  )
}
