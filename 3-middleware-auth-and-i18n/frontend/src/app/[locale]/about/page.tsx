const TRANSLATIONS = {
    en: { title: "About", body: "This is the English about page." },
    vi: { title: "Giới thiệu", body: "Đây là trang giới thiệu tiếng Việt." },
} as const

type Locale = keyof typeof TRANSLATIONS

/**
 * Locale-aware about page — đọc params.locale, fallback `en`.
 * (EN: Locale-aware about page — reads params.locale with `en` fallback.)
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
        <main>
            <h1 data-testid="about-title">{t.title}</h1>
            <p data-testid="about-body">{t.body}</p>
            <p data-testid="about-locale">locale = {lang}</p>
        </main>
    )
}
