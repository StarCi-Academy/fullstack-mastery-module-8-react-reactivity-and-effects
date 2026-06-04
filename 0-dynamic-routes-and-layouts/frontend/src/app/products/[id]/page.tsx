/**
 * Dynamic route /products/[id] — Next.js injects params.id, async in Next 15.
 *
 * Default Server Component: no "use client" needed since we only read params.
 */
export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<JSX.Element> {
    const { id } = await params
    return (
        <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-primary text-background font-semibold">
                    {id.slice(0, 2).toUpperCase()}
                </div>
                <h2 data-testid="product-title" className="text-xl font-semibold">Product {id}</h2>
                <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary">dynamic segment</span>
            </div>
            <p data-testid="product-id" className="text-default-700">id = {id}</p>
        </article>
    )
}
