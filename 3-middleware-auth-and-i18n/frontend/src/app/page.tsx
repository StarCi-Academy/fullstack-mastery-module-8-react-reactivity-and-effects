/**
 * Root page — middleware sẽ redirect mọi request `/` sang `/en`.
 * (EN: Root page — middleware redirects every `/` request to `/en`.)
 */
export default function RootPage(): JSX.Element {
    return (
        <main>
            <p data-testid="root-marker">If you see this, middleware did NOT redirect.</p>
        </main>
    )
}
