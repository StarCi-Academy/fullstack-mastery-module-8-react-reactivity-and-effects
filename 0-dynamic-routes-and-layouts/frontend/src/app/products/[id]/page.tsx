/**
 * Dynamic route /products/[id] — Next.js inject params.id.
 * (EN: Dynamic route /products/[id] — Next.js injects params.id.)
 *
 * Server Component mặc định: không cần "use client" vì chỉ đọc params.
 * (EN: Default Server Component: no "use client" needed since we only read params.)
 */
export default function ProductDetailPage({
    params,
}: {
    params: { id: string }
}): JSX.Element {
    return (
        <article>
            <h2 data-testid="product-title">Product {params.id}</h2>
            <p data-testid="product-id">id = {params.id}</p>
        </article>
    )
}
