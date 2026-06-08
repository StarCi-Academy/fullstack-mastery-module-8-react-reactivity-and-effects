import { Typography } from "@heroui/react"
import { HeroUIProvider } from "./components/providers"
import { Local } from "./components/Local"
import { Sandbox } from "./components/Sandbox"

/** Lesson label (shown above the content in both modes). */
const TITLE = "useSyncExternalStore"
/** Lesson description (shown under the label in both modes). */
const DESCRIPTION =
    "Subscribe to an external store the right way. Two readers of the same store always show identical values (no tearing); a useEffect mirror goes stale; browser size and a latest-wins async query are read through the same primitive."

/**
 * App root — shared Label + Description, then the content switches on the
 * `?sandbox` query param: `<Sandbox/>` for the embedded preview, `<Local/>`
 * otherwise (what Playwright drives). The external stores are module-level
 * singletons; no provider is needed. Single-client lesson, so both render the
 * same content.
 */
const App = (): JSX.Element => {
    // embedded preview loads `/?sandbox=1`; cloned-repo + Playwright load `/`
    const isSandbox = new URLSearchParams(window.location.search).has("sandbox")

    return (
        <HeroUIProvider>
            <main className="min-h-screen bg-background p-3">
                <div className="mx-auto flex max-w-2xl flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <Typography.Heading level={4} className="text-sm font-semibold">
                            {TITLE}
                        </Typography.Heading>
                        <Typography.Paragraph size="sm" color="muted">
                            {DESCRIPTION}
                        </Typography.Paragraph>
                    </div>
                    {/* Content */}
                    {isSandbox ? <Sandbox /> : <Local />}
                </div>
            </main>
        </HeroUIProvider>
    )
}

export default App
