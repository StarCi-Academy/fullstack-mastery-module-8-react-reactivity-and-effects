import { useState } from "react"
import { Button } from "@heroui/react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts"
import { DAY_DATA } from "../../lib/data"
import { BrushSummary } from "./BrushSummary"

/** Shape Recharts passes to the Brush `onChange` callback. */
interface BrushChangeRange {
  /** Start index of the selected window (may be undefined mid-drag). */
  startIndex?: number
  /** End index of the selected window (may be undefined mid-drag). */
  endIndex?: number
}

/** Brush selection range stored in state. */
interface BrushRange {
  /** Start index within DAY_DATA (inclusive). */
  start: number
  /** End index within DAY_DATA (inclusive). */
  end: number
}

const DATA_LEN = DAY_DATA.length // 24

/** Full range preset — selects all 24 points. */
const PRESET_ALL: BrushRange = { start: 0, end: DATA_LEN - 1 }

/** First-half preset — selects points 0..11 (floor(24/2)-1). */
const PRESET_FIRST_HALF: BrushRange = { start: 0, end: Math.floor(DATA_LEN / 2) - 1 }

/**
 * BrushChartClient — the shared lesson content. Used by both Local and Sandbox
 * (single-client lesson, no view-switcher).
 *
 * Renders a Recharts LineChart with a Brush widget that drives a summary panel.
 * Preset buttons set the range imperatively (the Brush can also free-drag it),
 * so they stay action `<Button>`s rather than a Tabs selector. The lesson
 * title/description now live in App.tsx.
 */
export function BrushChartClient(): JSX.Element {
  // Controlled brush range
  const [range, setRange] = useState<BrushRange>(PRESET_ALL)

  // Slice of the dataset visible in the current window
  const selected = DAY_DATA.slice(range.start, range.end + 1)

  /** Handle Recharts Brush onChange — keep state in sync with drag. */
  const handleBrushChange = (newRange: BrushChangeRange) => {
    const start = newRange.startIndex ?? 0
    const end = newRange.endIndex ?? DATA_LEN - 1
    setRange({ start, end })
  }

  return (
    <div className="flex flex-col">
      {/* Preset controls */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          data-testid="preset-all"
          onPress={() => setRange(PRESET_ALL)}
        >
          All ({DATA_LEN})
        </Button>
        <Button
          size="sm"
          variant="secondary"
          data-testid="preset-first-half"
          onPress={() => setRange(PRESET_FIRST_HALF)}
        >
          First half ({PRESET_FIRST_HALF.end + 1})
        </Button>
      </div>

      <div className="h-4" />

      {/* Chart — wrapped in data-testid for Playwright */}
      <div data-testid="chart">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={DAY_DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />

            {/* Primary metric line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Active users"
            />

            {/* Secondary metric line */}
            <Line
              type="monotone"
              dataKey="signups"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="Signups"
            />

            {/* Brush — controlled via startIndex/endIndex props */}
            <Brush
              dataKey="label"
              startIndex={range.start}
              endIndex={range.end}
              onChange={handleBrushChange}
              height={28}
              stroke="#3b82f6"
              fill="#f0f9ff"
              travellerWidth={8}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-4" />

      {/* Summary panel */}
      <BrushSummary
        selected={selected}
        startIndex={range.start}
        endIndex={range.end}
      />
    </div>
  )
}
