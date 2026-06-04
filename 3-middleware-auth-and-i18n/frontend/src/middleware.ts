import { NextRequest, NextResponse } from "next/server"

/**
 * Next.js middleware running edge-side before render with two duties:
 *   1) Auth: validate `session` cookie via POST to backend /auth/verify-session;
 *      if invalid and path is /dashboard → redirect to /login.
 *   2) i18n: if URL lacks /en or /vi prefix and isn't login/api/_next,
 *      redirect to /en + original path.
 */

const LOCALES = ["en", "vi"] as const
type Locale = (typeof LOCALES)[number]

const BACKEND = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

function hasLocalePrefix(pathname: string): boolean {
    return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
}

function stripLocale(pathname: string): string {
    for (const l of LOCALES) {
        if (pathname === `/${l}`) {
            return "/"
        }
        if (pathname.startsWith(`/${l}/`)) {
            return pathname.slice(l.length + 1)
        }
    }
    return pathname
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
    const { pathname } = req.nextUrl

    // Skip Next internals
    if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
        return NextResponse.next()
    }

    // ── i18n: ensure locale prefix exists
    if (!hasLocalePrefix(pathname) && pathname !== "/login") {
        const url = req.nextUrl.clone()
        const defaultLocale: Locale = "en"
        url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
        return NextResponse.redirect(url)
    }

    // ── auth gate for /<locale>/dashboard
    const stripped = stripLocale(pathname)
    if (stripped.startsWith("/dashboard")) {
        const token = req.cookies.get("session")?.value ?? null
        let valid = false
        if (token) {
            try {
                const res = await fetch(`${BACKEND}/auth/verify-session`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ token }),
                })
                if (res.ok) {
                    const data = (await res.json()) as { valid: boolean }
                    valid = data.valid
                }
            } catch {
                valid = false
            }
        }
        if (!valid) {
            const url = req.nextUrl.clone()
            url.pathname = "/login"
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    // Applied to everything except assets
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
