/**
 * Imperative handle exposed by `MessageInput` to its parent via `useImperativeHandle`.
 *
 * The parent holds a ref of this type and calls these methods to drive the child
 * imperatively — focusing or clearing the underlying `<input>` — without lifting
 * the input's value into parent state.
 */
export interface MessageInputHandle {
    /** Move keyboard focus into the underlying text input. */
    focus: () => void
    /** Clear the underlying text input back to an empty string. */
    clear: () => void
    /** Read the current text typed in the input (uncontrolled read). */
    getValue: () => string
}

/**
 * Imperative handle exposed by `MessageList` to its parent via `useImperativeHandle`.
 *
 * Scrolling and DOM measurement are imperative DOM operations that have no
 * declarative equivalent, so the parent reaches into the child through this
 * handle to scroll to the bottom or measure the rendered list box.
 */
export interface MessageListHandle {
    /** Scroll the list's scroll container to its bottom edge. */
    scrollToBottom: () => void
    /** Whether the scroll container is currently pinned to the bottom. */
    isAtBottom: () => boolean
    /** Measured height of the list box in CSS pixels (from getBoundingClientRect). */
    getMeasuredHeight: () => number
}

/** A single chat message rendered in the list. */
export interface ChatMessage {
    /** Stable unique id used as the React key. */
    id: number
    /** Message text. */
    text: string
}
