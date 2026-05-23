import Link from "next/link"

/**
 * /<locale> home — link sang dashboard và about.
 * (EN: /<locale> home — links to dashboard and about.)
 */
export default function LocaleHomePage({ params }: { params: { locale: string } }): JSX.Element {
    return (
        <main>
            <h1 data-testid="locale-home">{params.locale} home</h1>
            <ul>
                <li>
                    <Link href={`/${params.locale}/dashboard`} data-testid="link-dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href={`/${params.locale}/about`} data-testid="link-about">
                        About
                    </Link>
                </li>
            </ul>
        </main>
    )
}
