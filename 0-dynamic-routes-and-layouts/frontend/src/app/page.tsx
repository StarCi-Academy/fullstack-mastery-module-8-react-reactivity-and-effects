"use client"
import Link from "next/link"
import { Card, Button, Chip } from "@heroui/react"

/**
 * Home — links to /products and to the (marketing) route group.
 */
export default function HomePage(): JSX.Element {
    const items: Array<{ id: string; href: string; testId: string; label: string; variant: "primary" | "secondary" | "tertiary" }> = [
        { id: "123", href: "/products/123", testId: "link-product-123", label: "Product 123", variant: "primary" },
        { id: "abc", href: "/products/abc", testId: "link-product-abc", label: "Product abc", variant: "secondary" },
        { id: "about", href: "/about", testId: "link-about", label: "About (marketing group)", variant: "tertiary" },
    ]
    return (
        <main className="mx-auto max-w-3xl p-6">
            <Card className="mb-6">
                <Card.Header>
                    <h1 data-testid="home-title" className="text-xl font-semibold">M8 L0 — Dynamic Routes</h1>
                </Card.Header>
                <Card.Content>
                    <p className="text-default-500 text-sm">Explore dynamic segments + nested layouts + route groups</p>
                </Card.Content>
            </Card>
            <div className="flex flex-col gap-4">
                {items.map((it) => (
                    <Card key={it.id}>
                        <Card.Content className="flex flex-row items-center justify-between gap-4 p-4">
                            <div className="flex items-center gap-3">
                                <span className="font-medium">{it.label}</span>
                                <Chip color="accent" variant="soft" size="sm">link</Chip>
                            </div>
                            <Link href={it.href} data-testid={it.testId}>
                                <Button variant={it.variant} size="sm">Open</Button>
                            </Link>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        </main>
    )
}
