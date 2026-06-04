/**
 * Login stub — where middleware redirects unauthenticated requests.
 */
export default function LoginPage(): JSX.Element {
    return (
        <main className="mx-auto max-w-md p-6">
            <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-warning text-background font-semibold">L</div>
                    <h1 data-testid="login-title" className="text-xl font-semibold">Sign in</h1>
                    <span className="rounded-full bg-warning-50 px-2 py-0.5 text-xs font-medium text-warning">auth required</span>
                </div>
                <p data-testid="login-marker" className="text-default-700">Middleware sent you here because session is missing.</p>
            </article>
        </main>
    )
}
