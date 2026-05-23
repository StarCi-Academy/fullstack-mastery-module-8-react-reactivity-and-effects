/**
 * Route group `(marketing)` — folder tên có ngoặc không xuất hiện trong URL.
 * (EN: Route group `(marketing)` — folder name in parentheses does NOT appear in URL.)
 *
 * URL thực tế là /about chứ không phải /(marketing)/about.
 * (EN: Actual URL is /about, NOT /(marketing)/about.)
 */
export default function AboutPage(): JSX.Element {
    return (
        <main>
            <h2 data-testid="about-title">About</h2>
            <p data-testid="about-url-hint">Folder is (marketing) but URL is /about.</p>
        </main>
    )
}
