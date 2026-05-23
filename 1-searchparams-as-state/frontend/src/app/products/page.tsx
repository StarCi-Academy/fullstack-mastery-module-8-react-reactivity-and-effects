import { ProductsFilterPanel } from "../../components/products-filter-panel"

/**
 * Products page — host của filter panel.
 * (EN: Products page — host of the filter panel.)
 *
 * Wrapper Server Component, panel là Client Component (đọc useSearchParams).
 * (EN: Wrapper is a Server Component; panel is Client (reads useSearchParams).)
 */
export default function ProductsPage(): JSX.Element {
    return (
        <main>
            <h1 data-testid="products-title">Products</h1>
            <ProductsFilterPanel />
        </main>
    )
}
