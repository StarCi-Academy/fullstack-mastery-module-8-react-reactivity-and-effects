"use client"
import Link from "next/link"
import { Card, Chip } from "@heroui/react"

/**
 * Home — image grid; clicking an image opens a modal via intercepting route.
 */
const PHOTO_IDS = ["1", "2", "3"]

export default function HomePage(): JSX.Element {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <Card className="mb-6">
                <Card.Header>
                    <div className="flex items-center gap-3">
                        <h1 data-testid="home-title" className="text-xl font-semibold">Photo gallery</h1>
                        <Chip size="sm" color="accent" variant="soft">parallel + intercept</Chip>
                    </div>
                </Card.Header>
            </Card>
            <ul data-testid="photo-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-3 list-none p-0">
                {PHOTO_IDS.map((id) => (
                    <li key={id}>
                        <Link href={`/photos/${id}`} data-testid={`photo-link-${id}`} className="block">
                            <Card className="hover:shadow-medium transition-shadow">
                                <Card.Content className="flex flex-col items-center gap-2 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-large bg-accent/15 text-accent text-lg font-semibold">{id}</div>
                                    <span className="text-default-700 font-medium">Photo {id}</span>
                                </Card.Content>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
