/** Props for {@link SectionLabel}. */
interface SectionLabelProps {
    /** Label text for a section or field row. */
    children: string
}

/**
 * SectionLabel — consistent section/field label styling for the lesson layout.
 *
 * @param props.children Label copy.
 */
export const SectionLabel = ({ children }: SectionLabelProps): JSX.Element => {
    return <span className="text-sm font-semibold text-foreground">{children}</span>
}
