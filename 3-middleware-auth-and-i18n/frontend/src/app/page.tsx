/**
 * Root page — middleware redirects every `/` request to `/en`.
 */
export default function RootPage(): JSX.Element {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <h1 className="text-xl font-semibold">Root</h1>
                    <span className="rounded-full bg-warning-50 px-2 py-0.5 text-xs font-medium text-warning">should be redirected</span>
                </div>
                <p data-testid="root-marker" className="text-default-700">If you see this, middleware did NOT redirect.</p>
            </article>
        </main>
    )
}
