/** Props for {@link SubLabel}. */
interface SubLabelProps {
    /** Muted field label shown above a value within a section. */
    children: string
}

/**
 * SubLabel — secondary label for fields inside a section (muted, regular weight).
 *
 * @param props.children Sub-label copy.
 */
export function SubLabel({ children }: SubLabelProps): JSX.Element {
    return <span className="text-sm text-muted">{children}</span>
}
