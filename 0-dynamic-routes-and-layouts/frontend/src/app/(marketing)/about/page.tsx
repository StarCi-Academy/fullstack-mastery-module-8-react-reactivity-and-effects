/**
 * Route group `(marketing)` — folder name in parentheses does NOT appear in URL.
 *
 * Actual URL is /about, NOT /(marketing)/about.
 */
export default function AboutPage(): JSX.Element {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <h2 data-testid="about-title" className="text-xl font-semibold">About</h2>
                    <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success">route group</span>
                </div>
                <p data-testid="about-url-hint" className="text-default-700">Folder is (marketing) but URL is /about.</p>
            </article>
        </main>
    )
}
