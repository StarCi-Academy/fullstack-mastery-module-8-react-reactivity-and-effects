import type { ReactNode } from "react"

/**
 * Root layout (EN: Root layout).
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export const metadata = {
    title: "M8 L3 — Middleware auth & i18n",
}
