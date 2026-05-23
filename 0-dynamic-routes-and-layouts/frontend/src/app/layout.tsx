import type { ReactNode } from "react"

/**
 * Root layout — bọc toàn cây bằng <html>/<body>; áp dụng cho mọi route.
 * (EN: Root layout wrapping the whole tree with html/body; applied to every route.)
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export const metadata = {
    title: "M8 L0 — Dynamic Routes & Layouts",
}
