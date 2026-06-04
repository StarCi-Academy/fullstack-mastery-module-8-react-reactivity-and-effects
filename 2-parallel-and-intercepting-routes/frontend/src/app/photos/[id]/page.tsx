/**
 * Full-page version of /photos/[id] — rendered on reload or deep-link.
 */
export default async function PhotoFullPage({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<JSX.Element> {
    const { id } = await params
    return (
        <main className="mx-auto max-w-3xl p-6">
            <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-accent text-background font-semibold">{id}</div>
                    <h1 data-testid="fullpage-title" className="text-xl font-semibold">Photo {id} — full page</h1>
                    <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success">full page</span>
                </div>
                <p data-testid="fullpage-marker" className="text-default-700">Rendered as the destination route, not intercepted.</p>
            </article>
        </main>
    )
}
