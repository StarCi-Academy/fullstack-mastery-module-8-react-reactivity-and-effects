import { Card, Input, Typography } from "@heroui/react"
import { useEffect, useRef, useState } from "react"
import { USERS, filterUsers, type User } from "../../../lib"
import { RenderMetric } from "../RenderMetric"
import { UserList } from "../UserList"

/**
 * BuggyPanel — the ANTI-PATTERN: derived state mirrored into state via an effect.
 *
 * `query` is real state. `filtered` is fully derivable from `query` + `USERS`,
 * yet here it is kept in a SECOND piece of state and synced inside a
 * `useEffect`. Two consequences the lesson makes observable:
 *
 *  1. Double render per keystroke — typing sets `query` (render #1), then the
 *     effect runs and calls `setFiltered` (render #2). The render counter grows
 *     by 2 for every change instead of 1.
 *  2. Stale first paint — on the very first render `filtered` is still its
 *     initial `[]`, so the list is momentarily empty / out of sync until the
 *     effect has had a chance to run. The fixed panel never has this gap.
 */
export function BuggyPanel(): JSX.Element {
    const [query, setQuery] = useState("")
    // Anti-pattern: derived data duplicated into state and synced by an effect.
    const [filtered, setFiltered] = useState<User[]>([])

    useEffect(() => {
        // Mirrors a value we already have everything to compute during render.
        setFiltered(filterUsers(USERS, query))
    }, [query])

    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <Card data-testid="buggy-panel" className="flex flex-col gap-3 p-3">
            <Card.Header className="p-0">
                <Typography.Heading level={6} weight="semibold">
                    Buggy — effect + setState
                </Typography.Heading>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 p-0">
                <Input
                    data-testid="buggy-search"
                    variant="secondary"
                    aria-label="Search users (buggy panel)"
                    placeholder="Search by name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <Typography.Paragraph size="xs" color="muted">
                        Matches
                    </Typography.Paragraph>
                    <Typography.Paragraph
                        data-testid="buggy-count"
                        size="sm"
                        weight="semibold"
                        className="tabular-nums"
                    >
                        {filtered.length}
                    </Typography.Paragraph>
                </div>
                <UserList users={filtered} testIdPrefix="buggy" />
                <Typography.Paragraph size="xs" color="muted">
                    {"Stores the filtered list in "}
                    <span className="font-semibold">useState</span>
                    {" and syncs it inside "}
                    <span className="font-semibold">useEffect</span>
                    {" — every keystroke renders twice."}
                </Typography.Paragraph>
            </Card.Content>
            <Card.Footer className="border-t border-default-200/60 bg-default-100 p-0">
                <RenderMetric
                    label="Renders (buggy)"
                    value={renderRef.current}
                    testId="buggy-renders"
                />
            </Card.Footer>
        </Card>
    )
}
