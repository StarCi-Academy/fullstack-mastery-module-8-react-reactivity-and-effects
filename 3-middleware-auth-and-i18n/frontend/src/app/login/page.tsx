/**
 * Login stub — nơi middleware redirect khi unauth.
 * (EN: Login stub — where middleware redirects unauthenticated requests.)
 */
export default function LoginPage(): JSX.Element {
    return (
        <main>
            <h1 data-testid="login-title">Sign in</h1>
            <p data-testid="login-marker">Middleware sent you here because session is missing.</p>
        </main>
    )
}
