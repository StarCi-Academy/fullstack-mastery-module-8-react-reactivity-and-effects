/**
 * Dashboard — middleware lets through only when session cookie is valid.
 */
export default async function DashboardPage({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
    const { locale } = await params
    return (
        <main className="mx-auto max-w-3xl p-6">
            <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-success text-background font-semibold">D</div>
                    <h1 data-testid="dashboard-title" className="text-xl font-semibold">Dashboard ({locale})</h1>
                    <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success">protected</span>
                </div>
                <p data-testid="dashboard-marker" className="text-default-700">You reached the protected route.</p>
            </article>
        </main>
    )
}
