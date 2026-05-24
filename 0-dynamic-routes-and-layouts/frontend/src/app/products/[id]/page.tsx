/**
 * Dynamic route /products/[id] — Next.js inject params.id (async trong Next 15).
 * (EN: Dynamic route /products/[id] — Next.js injects params.id, async in Next 15.)
 *
 * Server Component mặc định: không cần "use client" vì chỉ đọc params.
 * (EN: Default Server Component: no "use client" needed since we only read params.)
 */
export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<JSX.Element> {
    const { id } = await params
    return (
        <article>
            <h2 data-testid="product-title">Product {id}</h2>
            <p data-testid="product-id">id = {id}</p>
        </article>
    )
}
