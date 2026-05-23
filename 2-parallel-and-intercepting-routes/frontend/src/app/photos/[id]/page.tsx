/**
 * Full-page version cho /photos/[id] — render khi reload hoặc deep-link.
 * (EN: Full-page version of /photos/[id] — rendered on reload or deep-link.)
 */
export default function PhotoFullPage({
    params,
}: {
    params: { id: string }
}): JSX.Element {
    return (
        <main>
            <h1 data-testid="fullpage-title">Photo {params.id} — full page</h1>
            <p data-testid="fullpage-marker">Rendered as the destination route, not intercepted.</p>
        </main>
    )
}
