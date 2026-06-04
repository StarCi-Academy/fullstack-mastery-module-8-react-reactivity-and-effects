"use client"
import { Button, Input, Card, Chip } from "@heroui/react"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

type Sort = "asc" | "desc"

/**
 * ProductsFilterPanel — filter UI [category, sort, priceMin] synced to URL.
 *
 * Reads state via useSearchParams; writes via router.replace to avoid history bloat.
 *
 * We keep native <select> rather than HeroUI Select because Playwright `.selectOption()`
 * only works on native form elements. Styling is done with Tailwind for polished look.
 */
export function ProductsFilterPanel(): JSX.Element {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const category = params.get("category") ?? ""
    const sort = (params.get("sort") as Sort | null) ?? "asc"
    const priceMin = params.get("priceMin") ?? ""

    const updateParam = useCallback(
        (key: string, value: string) => {
            // Step 1: clone current params
            const next = new URLSearchParams(params.toString())
            if (value === "") {
                next.delete(key)
            } else {
                next.set(key, value)
            }
            // Step 2: replace URL, no history push
            const qs = next.toString()
            router.replace(qs ? `${pathname}?${qs}` : pathname)
        },
        [params, pathname, router],
    )

    const clearAll = useCallback(() => {
        router.replace(pathname)
    }, [pathname, router])

    const activeChips: Array<{ key: string; label: string; color: "accent" | "warning" | "success" }> = []
    if (category) activeChips.push({ key: "category", label: `category: ${category}`, color: "accent" })
    if (sort !== "asc") activeChips.push({ key: "sort", label: `sort: ${sort}`, color: "warning" })
    if (priceMin) activeChips.push({ key: "priceMin", label: `min: ${priceMin}`, color: "success" })

    const selectClass =
        "h-10 rounded-medium border border-default-200 bg-default-50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"

    return (
        <section data-testid="filter-panel" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 min-h-8">
                {activeChips.length === 0 ? (
                    <Chip size="sm" variant="soft" color="default">no active filter</Chip>
                ) : (
                    activeChips.map((c) => (
                        <Chip key={c.key} size="sm" color={c.color} variant="soft">{c.label}</Chip>
                    ))
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label className="flex flex-col gap-1">
                    <span className="text-default-500 text-sm">Category</span>
                    <select
                        data-testid="filter-category"
                        value={category}
                        onChange={(e) => updateParam("category", e.target.value)}
                        className={selectClass}
                    >
                        <option value="">(all)</option>
                        <option value="book">book</option>
                        <option value="game">game</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-default-500 text-sm">Sort</span>
                    <select
                        data-testid="filter-sort"
                        value={sort}
                        onChange={(e) => updateParam("sort", e.target.value)}
                        className={selectClass}
                    >
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-default-500 text-sm">Min price</span>
                    <Input
                        data-testid="filter-price-min"
                        type="number"
                        value={priceMin}
                        onChange={(e) => updateParam("priceMin", e.target.value)}
                    />
                </label>
            </div>

            <div>
                <Button type="button" data-testid="filter-clear" onPress={clearAll} variant="danger" size="sm">
                    Clear all
                </Button>
            </div>

            <Card>
                <Card.Content className="p-4">
                    <pre data-testid="filter-state" className="text-xs text-default-700 whitespace-pre-wrap">
                        {JSON.stringify({ category, sort, priceMin }, null, 2)}
                    </pre>
                </Card.Content>
            </Card>
        </section>
    )
}
