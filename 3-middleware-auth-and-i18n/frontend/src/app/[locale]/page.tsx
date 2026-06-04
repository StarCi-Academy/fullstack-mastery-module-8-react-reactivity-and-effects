import Link from "next/link"

/**
 * /<locale> home — links to dashboard and about.
 */
export default async function LocaleHomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
    const { locale } = await params
    const other = locale === "en" ? "vi" : "en"
    return (
        <main className="mx-auto max-w-3xl p-6">
            <section className="mb-6 rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-accent text-background font-semibold">{locale.toUpperCase()}</div>
                    <h1 data-testid="locale-home" className="text-xl font-semibold">{locale} home</h1>
                </div>
                <nav className="inline-flex gap-2 rounded-medium border border-default-200 bg-default-50 p-1 text-sm">
                    <span className="rounded-medium bg-background px-3 py-1 font-medium text-foreground shadow-sm">{locale.toUpperCase()}</span>
                    <Link href={`/${other}`} className="rounded-medium px-3 py-1 text-default-500 hover:text-foreground">{other.toUpperCase()}</Link>
                </nav>
            </section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-large border border-default-200 bg-background p-4 shadow-sm flex items-center justify-between">
                    <span className="font-medium">Dashboard (protected)</span>
                    <Link href={`/${locale}/dashboard`} data-testid="link-dashboard" className="rounded-medium bg-accent px-3 py-1.5 text-sm font-medium text-background hover:opacity-90">
                        Open
                    </Link>
                </div>
                <div className="rounded-large border border-default-200 bg-background p-4 shadow-sm flex items-center justify-between">
                    <span className="font-medium">About</span>
                    <Link href={`/${locale}/about`} data-testid="link-about" className="rounded-medium bg-default-200 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-default-300">
                        Open
                    </Link>
                </div>
            </div>
        </main>
    )
}
