import type { ReactNode } from "react"
import Link from "next/link"

/**
 * Nested layout cho /products/* — render header chung cho mọi product page.
 * (EN: Nested layout for /products/* — renders a shared header across all product pages.)
 */
export default function ProductsLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <section>
            <header data-testid="products-header">
                <Link href="/" data-testid="products-home-link">Home</Link>
                <span> / Products</span>
            </header>
            <div data-testid="products-slot">{children}</div>
        </section>
    )
}
