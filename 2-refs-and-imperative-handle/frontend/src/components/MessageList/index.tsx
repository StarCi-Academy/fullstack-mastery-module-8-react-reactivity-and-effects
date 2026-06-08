import { Card, ScrollShadow, Typography } from "@heroui/react"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import type { ChatMessage, MessageListHandle } from "../../lib"

/** Props for {@link MessageList}. */
interface MessageListProps {
    /** Messages to render, oldest first. */
    messages: ChatMessage[]
}

/** Treat the list as "at bottom" when within this many pixels of the end. */
const BOTTOM_THRESHOLD_PX = 4

/**
 * MessageList — a scrollable message box that exposes imperative DOM operations
 * (scroll + measure) to its parent via `forwardRef` + `useImperativeHandle`.
 *
 * Scrolling a container and reading its rendered size are inherently imperative:
 * there is no prop that "scrolls to the bottom". The parent therefore reaches in
 * through the handle. A `ResizeObserver` keeps the measured height in sync with
 * the live DOM so the on-screen number reflects the actual rendered box.
 */
export const MessageList = forwardRef<MessageListHandle, MessageListProps>(
    function MessageList({ messages }, ref): JSX.Element {
        // The scroll container whose scrollTop/scrollHeight we drive and read.
        const scrollRef = useRef<HTMLDivElement>(null)
        // Live measured height of the box, kept in sync by a ResizeObserver.
        const [measuredHeight, setMeasuredHeight] = useState(0)

        // Measure once on mount and on every resize via ResizeObserver.
        // getBoundingClientRect gives the real rendered height in CSS pixels.
        useEffect(() => {
            const node = scrollRef.current
            if (!node) return
            const measure = (): void => {
                const rect = node.getBoundingClientRect()
                setMeasuredHeight(Math.round(rect.height))
            }
            measure()
            const observer = new ResizeObserver(measure)
            observer.observe(node)
            return () => observer.disconnect()
        }, [])

        // Publish the imperative handle for scroll + measurement.
        useImperativeHandle(
            ref,
            (): MessageListHandle => ({
                // Imperatively scroll the container to its bottom edge.
                scrollToBottom: (): void => {
                    const node = scrollRef.current
                    if (node) node.scrollTop = node.scrollHeight
                },
                // Report whether we are currently pinned to the bottom.
                isAtBottom: (): boolean => {
                    const node = scrollRef.current
                    if (!node) return false
                    const distance = node.scrollHeight - node.scrollTop - node.clientHeight
                    return distance <= BOTTOM_THRESHOLD_PX
                },
                // Report the last measured height.
                getMeasuredHeight: (): number => measuredHeight,
            }),
            [measuredHeight],
        )

        return (
            <div className="flex flex-col gap-2">
                <ScrollShadow
                    ref={scrollRef}
                    data-testid="message-list"
                    hideScrollBar
                    orientation="vertical"
                    size={40}
                    className="flex h-48 flex-col gap-2 overflow-y-auto rounded-large"
                >
                    {messages.map((m) => (
                        <Card
                            key={m.id}
                            data-testid={`message-${m.id}`}
                            className="border border-default-200 shadow-none rounded-medium px-3 py-2"
                        >
                            <Typography.Paragraph size="sm">{m.text}</Typography.Paragraph>
                        </Card>
                    ))}
                </ScrollShadow>
                {/* Live measurement surfaced for observation / Playwright. */}
                <Typography.Paragraph size="sm" color="muted">
                    Measured height:{" "}
                    <span data-testid="measured-height" className="font-semibold tabular-nums">
                        {measuredHeight}
                    </span>
                    px
                </Typography.Paragraph>
            </div>
        )
    },
)
