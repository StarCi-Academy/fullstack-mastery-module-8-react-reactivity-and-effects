import { HeroUIProvider } from "./components/providers"
import { ResponsiveChart } from "./components"

/**
 * App root — HeroUI provider wrapping the responsive chart panel.
 * Recharts needs no provider; it renders pure SVG via React components.
 */
export default function App(): JSX.Element {
    return (
        <HeroUIProvider>
            <main className="min-h-screen bg-background p-3">
                <div className="mx-auto max-w-2xl">
                    <ResponsiveChart />
                </div>
            </main>
        </HeroUIProvider>
    )
}
