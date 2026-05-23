import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout — render hai slot song song: children và modal.
 * (EN: Root layout — renders two parallel slots: children and modal.)
 *
 * Slot `@modal` được Next.js fill khi route matching intercepting hoạt động.
 * (EN: The `@modal` slot is filled by Next.js when an intercepting route matches.)
 */
export default function RootLayout({
    children,
    modal,
}: {
    children: ReactNode
    modal: ReactNode
}): JSX.Element {
    return (
        <html lang="en">
            <body>
                <HeroUIProvider>
                    {children}
                {modal}
                </HeroUIProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: "M8 L2 — Parallel & intercepting routes",
}
