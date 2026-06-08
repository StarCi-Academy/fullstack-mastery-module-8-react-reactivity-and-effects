/**
 * A single user row rendered by both demo panels.
 */
export interface User {
    /** Stable unique id, used as the React list key. */
    id: number
    /** Display name shown in the list and matched against the query. */
    name: string
    /** Role label shown beside the name (not part of the filter). */
    role: string
}

/**
 * Static seed list — a client-side mock so the lesson stays FE-only (no backend).
 *
 * The list is deliberately small and deterministic so Playwright can assert exact
 * filtered counts for a given query.
 */
export const USERS: User[] = [
    { id: 1, name: "Alice", role: "Engineer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Carol", role: "Engineer" },
    { id: 4, name: "Dave", role: "Manager" },
    { id: 5, name: "Erin", role: "Engineer" },
    { id: 6, name: "Frank", role: "Designer" },
]

/**
 * Pure derived-state function — given the full list and a query, return the
 * matching subset. Case-insensitive prefix-free substring match on `name`.
 *
 * This is the single piece of "computation" the lesson is about: the FIXED panel
 * calls it inline during render, while the BUGGY panel mirrors its result into
 * extra state via an effect.
 */
export const filterUsers = (users: User[], query: string): User[] => {
    const q = query.trim().toLowerCase()
    if (q === "") return users
    return users.filter((u) => u.name.toLowerCase().includes(q))
}
