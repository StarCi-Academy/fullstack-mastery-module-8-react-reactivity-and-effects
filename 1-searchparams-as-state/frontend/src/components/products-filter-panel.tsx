"use client"
import { Button, Input, Label, TextField } from "@heroui/react"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

type Sort = "asc" | "desc"

/**
 * ProductsFilterPanel — UI filter (category, sort, priceMin) đồng bộ vào URL.
 * (EN: ProductsFilterPanel — filter UI [category, sort, priceMin] synced to URL.)
 *
 * Đọc state qua useSearchParams; ghi state qua router.replace để không thêm history.
 * (EN: Reads state via useSearchParams; writes via router.replace to avoid history bloat.)
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
            // Bước 1: clone hiện tại (EN: clone current params)
            const next = new URLSearchParams(params.toString())
            if (value === "") {
                next.delete(key)
            } else {
                next.set(key, value)
            }
            // Bước 2: replace URL không thêm history entry (EN: replace, no history push)
            const qs = next.toString()
            router.replace(qs ? `${pathname}?${qs}` : pathname)
        },
        [params, pathname, router],
    )

    const clearAll = useCallback(() => {
        router.replace(pathname)
    }, [pathname, router])

    return (
        <section data-testid="filter-panel">
            <label>
                Category
                <select
                    data-testid="filter-category"
                    value={category}
                    onChange={(e) => updateParam("category", e.target.value)}
                >
                    <option value="">(all)</option>
                    <option value="book">book</option>
                    <option value="game">game</option>
                </select>
            </label>

            <label>
                Sort
                <select
                    data-testid="filter-sort"
                    value={sort}
                    onChange={(e) => updateParam("sort", e.target.value)}
                >
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>
            </label>

            <label>
                Min price
                <Input
                    data-testid="filter-price-min"
                    type="number"
                    value={priceMin}
                    onChange={(e) => updateParam("priceMin", e.target.value)}
                />
            </label>

            <Button type="button" data-testid="filter-clear" onPress={clearAll}>
                Clear all
            </Button>

            <pre data-testid="filter-state">
                {JSON.stringify({ category, sort, priceMin }, null, 2)}
            </pre>
        </section>
    )
}
