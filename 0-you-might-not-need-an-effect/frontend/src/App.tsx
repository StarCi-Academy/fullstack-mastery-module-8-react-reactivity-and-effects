import { Typography } from "@heroui/react"
import { HeroUIProvider } from "./components/providers"
import { Local } from "./components/Local"
import { Sandbox } from "./components/Sandbox"

/** Lesson label (shown above the content in both modes). */
const TITLE = "You Might Not Need an Effect"
/** Lesson description (shown under the label in both modes). */
const DESCRIPTION =
    "Two search filters, same data. The buggy panel mirrors the filtered list into state via useEffect — it renders twice per keystroke. The fixed panel derives the list during render — one render, never stale."

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
                    <Typography.Heading level={4} weight="semibold">
                        {TITLE}
                    </Typography.Heading>
                    <div className="h-3" />
                    <Typography.Paragraph size="sm" color="muted">
                        {DESCRIPTION}
                    </Typography.Paragraph>
                    <div className="h-6" />
                    {/* Content */}
                    {isSandbox ? <Sandbox /> : <Local />}
                </div>
            </main>
        </HeroUIProvider>
    )
}
