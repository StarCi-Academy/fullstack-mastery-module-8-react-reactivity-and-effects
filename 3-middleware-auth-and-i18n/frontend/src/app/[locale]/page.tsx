import Link from "next/link"

/**
 * /<locale> home — link sang dashboard và about.
 * (EN: /<locale> home — links to dashboard and about.)
 */
export default async function LocaleHomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
    const { locale } = await params
    return (
        <main>
            <h1 data-testid="locale-home">{locale} home</h1>
            <ul>
                <li>
                    <Link href={`/${locale}/dashboard`} data-testid="link-dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href={`/${locale}/about`} data-testid="link-about">
                        About
                    </Link>
                </li>
            </ul>
        </main>
    )
}
