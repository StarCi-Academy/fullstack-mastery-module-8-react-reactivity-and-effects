import Link from "next/link"

/**
 * Trang chủ — grid ảnh; click vào ảnh sẽ mở modal nhờ intercepting route.
 * (EN: Home — image grid; clicking an image opens a modal via intercepting route.)
 */
const PHOTO_IDS = ["1", "2", "3"]

export default function HomePage(): JSX.Element {
    return (
        <main>
            <h1 data-testid="home-title">Photo gallery</h1>
            <ul data-testid="photo-grid">
                {PHOTO_IDS.map((id) => (
                    <li key={id}>
                        <Link href={`/photos/${id}`} data-testid={`photo-link-${id}`}>
                            Photo {id}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
