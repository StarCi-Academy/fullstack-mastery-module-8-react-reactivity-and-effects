import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout — bọc <html>/<body> + HeroUIProvider, áp dụng cho mọi route.
 * (EN: Root layout wrapping html/body + HeroUIProvider; applied to every route.)
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <HeroUIProvider>{children}</HeroUIProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: "M8 L0 — Dynamic Routes & Layouts",
}
