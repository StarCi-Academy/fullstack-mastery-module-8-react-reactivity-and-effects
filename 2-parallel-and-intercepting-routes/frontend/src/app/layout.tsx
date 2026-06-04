import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout — renders two parallel slots: children and modal.
 *
 * The `@modal` slot is filled by Next.js when an intercepting route matches.
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
