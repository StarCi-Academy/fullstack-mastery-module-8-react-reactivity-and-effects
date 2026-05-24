"use client"
import { useRouter } from "next/navigation"
import { use } from "react"

/**
 * Intercepting route `(.)photos/[id]` — chặn navigation từ "/" qua "/photos/[id]"
 * và render modal vào slot @modal thay vì navigate full-page.
 *
 * (EN: Intercepting route `(.)photos/[id]` — intercepts navigation from "/" to
 * "/photos/[id]" and renders a modal into the @modal slot instead of a full-page nav.)
 *
 * Close button gọi router.back() — đẩy history pop để Next.js dispose @modal slot.
 * Link href="/" KHÔNG đóng modal vì Next.js coi đó là navigation mới và giữ slot.
 * (EN: Close button calls router.back() so Next.js pops history and disposes the @modal
 * slot. Link href="/" does NOT close it because Next.js treats that as a new nav and
 * keeps the slot mounted.)
 */
export default function PhotoModalPage({
    params,
}: {
    params: Promise<{ id: string }>
}): JSX.Element {
    const { id } = use(params)
    const router = useRouter()
    return (
        <div
            data-testid="photo-modal"
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <article style={{ background: "white", padding: 24, minWidth: 320 }}>
                <h2 data-testid="modal-title">Photo {id} — modal</h2>
                <p data-testid="modal-marker">Rendered via intercepting route.</p>
                <button data-testid="modal-close" type="button" onClick={() => router.back()}>
                    Close
                </button>
            </article>
        </div>
    )
}
