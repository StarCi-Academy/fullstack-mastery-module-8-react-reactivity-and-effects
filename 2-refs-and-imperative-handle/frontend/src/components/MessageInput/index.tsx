import { Input } from "@heroui/react"
import { forwardRef, useImperativeHandle, useRef } from "react"
import type { MessageInputHandle } from "../../lib"

/** Props for {@link MessageInput}. */
interface MessageInputProps {
    /** Called when the user submits the current text (Enter key or send button). */
    onSubmit: (text: string) => void
}

/**
 * MessageInput — an uncontrolled text input that exposes an imperative API to
 * its parent through `forwardRef` + `useImperativeHandle`.
 *
 * The actual `<input>` DOM node is kept in a private `inputRef`. Instead of
 * forwarding that raw node to the parent, the component publishes a *narrow*
 * handle (`focus` / `clear` / `getValue`) — the parent can drive the input but
 * cannot touch unrelated DOM. The text itself never lives in React state, so
 * typing does not re-render the parent.
 */
export const MessageInput = forwardRef<MessageInputHandle, MessageInputProps>(
    function MessageInput({ onSubmit }, ref): JSX.Element {
        // Private ref to the real DOM input — never exposed directly to the parent.
        const inputRef = useRef<HTMLInputElement>(null)

        // Publish a curated handle. The second arg is the factory; the deps array
        // is empty because the handle closes only over the stable `inputRef`.
        useImperativeHandle(
            ref,
            (): MessageInputHandle => ({
                // Focus the underlying input element.
                focus: (): void => inputRef.current?.focus(),
                // Reset the input value back to empty.
                clear: (): void => {
                    if (inputRef.current) inputRef.current.value = ""
                },
                // Read the current uncontrolled value.
                getValue: (): string => inputRef.current?.value ?? "",
            }),
            [],
        )

        // Submit on Enter, reading the value straight off the DOM node.
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
            if (e.key === "Enter") {
                const value = inputRef.current?.value.trim() ?? ""
                if (value.length > 0) {
                    onSubmit(value)
                    if (inputRef.current) inputRef.current.value = ""
                }
            }
        }

        return (
            <Input
                ref={inputRef}
                className="shadow-none !border border-default"
                data-testid="message-input"
                placeholder="Type a message and press Enter"
                onKeyDown={handleKeyDown}
            />
        )
    },
)
