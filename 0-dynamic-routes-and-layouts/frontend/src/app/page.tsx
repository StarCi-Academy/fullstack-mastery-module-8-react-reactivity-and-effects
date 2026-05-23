import Link from "next/link"

/**
 * Trang chủ — link sang /products và route-group (marketing).
 * (EN: Home — links to /products and to the (marketing) route group.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main>
            <h1 data-testid="home-title">M8 L0 — Dynamic Routes</h1>
            <ul>
                <li>
                    <Link href="/products/123" data-testid="link-product-123">Product 123</Link>
                </li>
                <li>
                    <Link href="/products/abc" data-testid="link-product-abc">Product abc</Link>
                </li>
                <li>
                    <Link href="/about" data-testid="link-about">About (marketing group)</Link>
                </li>
            </ul>
        </main>
    )
}
