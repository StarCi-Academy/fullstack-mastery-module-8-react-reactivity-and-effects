"use client"
import Link from "next/link"
import { Card, Button } from "@heroui/react"

/**
 * Home — links to /products.
 */
export default function HomePage(): JSX.Element {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <Card>
                <Card.Header>
                    <h1 className="text-xl font-semibold">M8 L1 — searchParams as state</h1>
                </Card.Header>
                <Card.Content className="p-4">
                    <Link href="/products" data-testid="link-products">
                        <Button variant="primary">Go to Products</Button>
                    </Link>
                </Card.Content>
            </Card>
        </main>
    )
}
