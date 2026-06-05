import { HeroUIProvider } from "./components/providers"
import { BrushChart } from "./components"

/**
 * App root — HeroUI provider wrapping the brush chart demo.
 */
export default function App(): JSX.Element {
    return (
        <HeroUIProvider>
            <main className="min-h-screen bg-background p-3">
                <div className="mx-auto max-w-2xl">
                    <BrushChart />
                </div>
            </main>
        </HeroUIProvider>
    )
}
