import { Button, Typography } from "@heroui/react"
import { useRef, useState } from "react"
import type { ChatMessage, MessageInputHandle, MessageListHandle } from "../../lib"
import { MessageInput } from "../MessageInput"
import { MessageList } from "../MessageList"

/** Seed messages so the list starts taller than its viewport (scrollable). */
const SEED_MESSAGES: ChatMessage[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    text: `Seed message #${i + 1}`,
}))

/**
 * RefsClient — the parent that owns two children and drives them imperatively
 * through refs:
 *
 * - `MessageInput` exposes `focus()` / `clear()` / `getValue()` so the parent
 *   can move focus or wipe the field without controlling its value.
 * - `MessageList` exposes `scrollToBottom()` / `isAtBottom()` / `getMeasuredHeight()`
 *   so the parent can scroll and measure DOM the declarative model cannot express.
 *
 * The message array is the only React state here; the input's text stays in the
 * DOM (uncontrolled), demonstrating imperative escape hatches alongside state.
 */
export const RefsClient = (): JSX.Element => {
    // Typed refs to each child's published imperative handle.
    const inputRef = useRef<MessageInputHandle>(null)
    const listRef = useRef<MessageListHandle>(null)

    // The list data (declarative) and a few observable status readouts.
    const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES)
    const [atBottom, setAtBottom] = useState<boolean | null>(null)
    const [lastFocus, setLastFocus] = useState(false)

    // Append a message, then imperatively scroll the list to the new bottom.
    const addMessage = (text: string): void => {
        setMessages((prev) => [...prev, { id: prev.length + 1, text }])
        // Defer so the new node is in the DOM before we measure/scroll.
        requestAnimationFrame(() => {
            listRef.current?.scrollToBottom()
            setAtBottom(listRef.current?.isAtBottom() ?? null)
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <MessageList ref={listRef} messages={messages} />

            <MessageInput ref={inputRef} onSubmit={addMessage} />

            {/* Parent-driven imperative controls. */}
            <div className="flex flex-wrap gap-2">
                <Button
                    data-testid="btn-focus"
                    variant="primary"
                    onPress={(): void => {
                        inputRef.current?.focus()
                        // Reflect that focus landed on the input element.
                        setLastFocus(document.activeElement === document.querySelector('[data-testid="message-input"]'))
                    }}
                >
                    Focus input
                </Button>
                <Button
                    data-testid="btn-clear"
                    variant="outline"
                    onPress={(): void => inputRef.current?.clear()}
                >
                    Clear input
                </Button>
                <Button
                    data-testid="btn-scroll-bottom"
                    variant="outline"
                    onPress={(): void => {
                        listRef.current?.scrollToBottom()
                        setAtBottom(listRef.current?.isAtBottom() ?? null)
                    }}
                >
                    Scroll to bottom
                </Button>
                <Button
                    data-testid="btn-check-bottom"
                    variant="outline"
                    onPress={(): void => setAtBottom(listRef.current?.isAtBottom() ?? null)}
                >
                    Check position
                </Button>
            </div>

            {/* Observable status readouts. */}
            <div className="flex flex-col gap-1">
                <Typography.Paragraph size="sm" color="muted">
                    Input focused:{" "}
                    <span data-testid="focus-state" className="font-semibold">
                        {lastFocus ? "yes" : "no"}
                    </span>
                </Typography.Paragraph>
                <Typography.Paragraph size="sm" color="muted">
                    At bottom:{" "}
                    <span data-testid="at-bottom" className="font-semibold">
                        {atBottom === null ? "unknown" : atBottom ? "yes" : "no"}
                    </span>
                </Typography.Paragraph>
                <Typography.Paragraph size="sm" color="muted">
                    Message count:{" "}
                    <span data-testid="message-count" className="font-semibold tabular-nums">
                        {messages.length}
                    </span>
                </Typography.Paragraph>
            </div>
        </div>
    )
}
