import { Typography } from "@heroui/react"

/**
 * Legend — muted pedagogy line above the two demo panels.
 */
export const Legend = (): JSX.Element => {
    return (
        <Typography.Paragraph size="sm" color="muted">
            <span className="font-semibold text-foreground">Same query → same result</span>
            {" · the "}
            <span className="font-semibold text-foreground">buggy</span>
            {" panel renders twice per keystroke (effect + setState); the "}
            <span className="font-semibold text-foreground">fixed</span>
            {" panel renders once (derived in render)"}
        </Typography.Paragraph>
    )
}
