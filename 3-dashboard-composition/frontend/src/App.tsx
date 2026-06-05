import { HeroUIProvider } from "./components/providers"
import { Dashboard } from "./components"

/**
 * App — root entry; wraps the tree in HeroUIProvider then renders the lesson component.
 */
export default function App(): JSX.Element {
  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-background p-3">
        <div className="mx-auto max-w-2xl">
          <Dashboard />
        </div>
      </main>
    </HeroUIProvider>
  )
}
