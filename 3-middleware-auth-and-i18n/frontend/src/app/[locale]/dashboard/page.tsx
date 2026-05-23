/**
 * Dashboard — middleware chỉ cho qua khi cookie session hợp lệ.
 * (EN: Dashboard — middleware lets through only when session cookie is valid.)
 */
export default function DashboardPage({ params }: { params: { locale: string } }): JSX.Element {
    return (
        <main>
            <h1 data-testid="dashboard-title">Dashboard ({params.locale})</h1>
            <p data-testid="dashboard-marker">You reached the protected route.</p>
        </main>
    )
}
