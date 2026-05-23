import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout — bọc toàn cây bằng <html>/<body>
                <HeroUIProvider>
                    ; áp dụng cho mọi route.
 * (EN: Root layout wrapping the whole tree with html/body; applied to every route.)
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>{children}
                </HeroUIProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: "M8 L0 — Dynamic Routes & Layouts",
}
