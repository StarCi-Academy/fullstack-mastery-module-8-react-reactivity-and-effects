const TRANSLATIONS = {
    en: { title: "About", body: "This is the English about page." },
    vi: { title: "Giới thiệu", body: "Đây là trang giới thiệu tiếng Việt." },
} as const

type Locale = keyof typeof TRANSLATIONS

/**
 * Locale-aware about page — reads params.locale with `en` fallback.
 */
export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
    const { locale } = await params
    const lang = (TRANSLATIONS[locale as Locale] ? locale : "en") as Locale
    const t = TRANSLATIONS[lang]
    return (
        <main className="mx-auto max-w-3xl p-6">
            <article className="rounded-large border border-default-200 bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-medium bg-secondary text-background font-semibold">{lang.toUpperCase()}</div>
                    <h1 data-testid="about-title" className="text-xl font-semibold">{t.title}</h1>
                    <span data-testid="about-locale" className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary">locale = {lang}</span>
                </div>
                <p data-testid="about-body" className="text-default-700">{t.body}</p>
            </article>
        </main>
    )
}
