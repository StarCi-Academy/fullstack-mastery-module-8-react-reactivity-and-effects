import Link from "next/link"

/**
 * Trang chủ — link sang /products.
 * (EN: Home — links to /products.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main>
            <h1>M8 L1 — searchParams as state</h1>
            <Link href="/products" data-testid="link-products">Go to Products</Link>
        </main>
    )
}
