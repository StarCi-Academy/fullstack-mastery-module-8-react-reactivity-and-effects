import type { ReactNode } from "react"
import Link from "next/link"

/**
 * Nested layout for /products/* — renders a shared header across all product pages.
 */
export default function ProductsLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <section className="mx-auto max-w-3xl p-6">
            <nav
                data-testid="products-header"
                className="mb-4 flex items-center gap-2 rounded-large border border-default-200 bg-background p-4 text-sm shadow-sm"
            >
                <Link
                    href="/"
                    data-testid="products-home-link"
                    className="rounded-medium px-2 py-1 text-primary hover:bg-primary-50"
                >
                    Home
                </Link>
                <span className="text-default-400">/</span>
                <span className="text-default-700 font-medium">Products</span>
            </nav>
            <div data-testid="products-slot">{children}</div>
        </section>
    )
}
