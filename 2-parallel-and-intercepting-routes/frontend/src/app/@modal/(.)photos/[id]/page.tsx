import Link from "next/link"

/**
 * Intercepting route `(.)photos/[id]` — chặn navigation từ "/" qua "/photos/[id]"
 * và render modal vào slot @modal thay vì navigate full-page.
 *
 * (EN: Intercepting route `(.)photos/[id]` — intercepts navigation from "/" to
 * "/photos/[id]" and renders a modal into the @modal slot instead of a full-page nav.)
 */
export default function PhotoModalPage({
    params,
}: {
    params: { id: string }
}): JSX.Element {
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
                <h2 data-testid="modal-title">Photo {params.id} — modal</h2>
                <p data-testid="modal-marker">Rendered via intercepting route.</p>
                <Link href="/" data-testid="modal-close">Close</Link>
            </article>
        </div>
    )
}
