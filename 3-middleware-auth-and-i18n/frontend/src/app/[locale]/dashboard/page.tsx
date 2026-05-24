/**
 * Dashboard — middleware chỉ cho qua khi cookie session hợp lệ.
 * (EN: Dashboard — middleware lets through only when session cookie is valid.)
 */
export default async function DashboardPage({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
    const { locale } = await params
    return (
        <main>
            <h1 data-testid="dashboard-title">Dashboard ({locale})</h1>
            <p data-testid="dashboard-marker">You reached the protected route.</p>
        </main>
    )
}
