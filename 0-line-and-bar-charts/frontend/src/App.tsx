import { HeroUIProvider } from "./components/providers"
import { ChartsPanel } from "./components"

/**
 * App — root component; wraps the tree in HeroUIProvider and centers
 * the ChartsPanel in a max-width container.
 */
export default function App(): JSX.Element {
  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-background p-3">
        <div className="mx-auto max-w-2xl">
          <ChartsPanel />
        </div>
      </main>
    </HeroUIProvider>
  )
}
