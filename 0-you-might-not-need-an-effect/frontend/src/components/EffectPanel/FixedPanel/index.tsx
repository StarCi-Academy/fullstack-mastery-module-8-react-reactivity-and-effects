import { Card, Input, Typography } from "@heroui/react"
import { useRef, useState } from "react"
import { USERS, filterUsers } from "../../../lib"
import { RenderMetric } from "../RenderMetric"
import { UserList } from "../UserList"

/**
 * FixedPanel — the IDIOMATIC version: derived state computed during render.
 *
 * Only `query` is real state. `filtered` is computed inline on each render from
 * `query` + `USERS`; there is NO second state and NO effect. Consequences:
 *
 *  1. One render per keystroke — typing sets `query` and the component renders
 *     once; `filtered` is already correct in that same render. The render
 *     counter grows by exactly 1 per change.
 *  2. Never stale — on the first render `filtered` already reflects the current
 *     (empty) query, so the list is correct on the very first paint with no
 *     effect-driven catch-up frame.
 */
export function FixedPanel(): JSX.Element {
    const [query, setQuery] = useState("")
    // Derived during render — no extra state, no effect, always in sync.
    const filtered = filterUsers(USERS, query)

    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <Card data-testid="fixed-panel" className="flex flex-col gap-3 p-3">
            <Card.Header className="p-0">
                <Typography.Heading level={6} weight="semibold">
                    Fixed — derived in render
                </Typography.Heading>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 p-0">
                <Input
                    data-testid="fixed-search"
                    variant="secondary"
                    aria-label="Search users (fixed panel)"
                    placeholder="Search by name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <Typography.Paragraph size="xs" color="muted">
                        Matches
                    </Typography.Paragraph>
                    <Typography.Paragraph
                        data-testid="fixed-count"
                        size="sm"
                        weight="semibold"
                        className="tabular-nums"
                    >
                        {filtered.length}
                    </Typography.Paragraph>
                </div>
                <UserList users={filtered} testIdPrefix="fixed" boxed />
                <Typography.Paragraph size="xs" color="muted">
                    {"Computes "}
                    <span className="font-semibold">filtered</span>
                    {" during render from "}
                    <span className="font-semibold">query</span>
                    {" — one render per keystroke, never stale."}
                </Typography.Paragraph>
            </Card.Content>
            <Card.Footer className="border-t border-default-200/60 bg-default-100 p-0">
                <RenderMetric
                    label="Renders (fixed)"
                    value={renderRef.current}
                    testId="fixed-renders"
                />
            </Card.Footer>
        </Card>
    )
}
