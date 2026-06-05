import { HeroUIProvider } from "./components/providers"
import { Local } from "./components/Local"
import { Sandbox } from "./components/Sandbox"

/** Lesson label (shown above the content in both modes). */
const TITLE = "Interactive Brush & Zoom"
/** Lesson description (shown under the label in both modes). */
const DESCRIPTION =
  "A Recharts Brush selects a sub-range of the series; a summary recomputes sum/count for the selected window. Preset buttons set the range for deterministic testing."

/**
 * App root — shared Label + Description, then the content switches on the
 * `?sandbox` query param: `<Sandbox/>` for the embedded preview, `<Local/>`
 * otherwise (what Playwright drives). Single-client lesson, so both render the
 * same content.
 */
export default function App(): JSX.Element {
  // embedded preview loads `/?sandbox=1`; cloned-repo + Playwright load `/`
  const isSandbox = new URLSearchParams(window.location.search).has("sandbox")

  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-background p-3">
        <div className="mx-auto max-w-2xl">
          {/* Label */}
          <div className="text-base font-semibold text-foreground">{TITLE}</div>
          <div className="h-3" />
          {/* Description */}
          <div className="text-sm text-muted">{DESCRIPTION}</div>
          <div className="h-6" />
          {/* Content */}
          {isSandbox ? <Sandbox /> : <Local />}
        </div>
      </main>
    </HeroUIProvider>
  )
}
