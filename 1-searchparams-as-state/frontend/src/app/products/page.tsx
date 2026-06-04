import { ProductsFilterPanel } from "../../components/products-filter-panel"

/**
 * Products page — host of the filter panel.
 *
 * Wrapper is a Server Component; panel is Client (reads useSearchParams).
 */
export default function ProductsPage(): JSX.Element {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <section className="rounded-large border border-default-200 bg-background shadow-sm">
                <header className="flex items-center gap-3 border-b border-default-200 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-primary text-background font-semibold">P</div>
                    <h1 data-testid="products-title" className="text-xl font-semibold">Products</h1>
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary">URL ↔ state</span>
                </header>
                <div className="p-4">
                    <ProductsFilterPanel />
                </div>
            </section>
        </main>
    )
}
