/**
 * Full-page version cho /photos/[id] — render khi reload hoặc deep-link.
 * (EN: Full-page version of /photos/[id] — rendered on reload or deep-link.)
 */
export default async function PhotoFullPage({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<JSX.Element> {
    const { id } = await params
    return (
        <main>
            <h1 data-testid="fullpage-title">Photo {id} — full page</h1>
            <p data-testid="fullpage-marker">Rendered as the destination route, not intercepted.</p>
        </main>
    )
}
