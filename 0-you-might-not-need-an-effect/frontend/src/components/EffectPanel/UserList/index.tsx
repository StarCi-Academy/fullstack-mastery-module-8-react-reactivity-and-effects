import { Typography } from "@heroui/react"
import type { User } from "../../../lib"

interface UserListProps {
    /** Rows to render — already filtered by the parent panel. */
    users: User[]
    /** Playwright hook prefix so each panel's rows are addressable. */
    testIdPrefix: string
}

/**
 * UserList — renders the filtered rows for a panel.
 *
 * Pure presentational: it owns no state and no effect. Both the buggy and the
 * fixed panel feed it a `users` array; the only difference between panels is
 * HOW that array is produced (effect+state vs inline derived value).
 */
export const UserList = (props: UserListProps): JSX.Element => {
    const { users, testIdPrefix } = props

    return (
        <ul data-testid={`${testIdPrefix}-list`} className="flex flex-col gap-1">
            {users.map((u) => (
                <li
                    key={u.id}
                    data-testid={`${testIdPrefix}-row-${u.id}`}
                    className="flex items-center justify-between rounded-md bg-default-100 px-3 py-1"
                >
                    <Typography.Paragraph size="sm" weight="medium">
                        {u.name}
                    </Typography.Paragraph>
                    <Typography.Paragraph size="xs" color="muted">
                        {u.role}
                    </Typography.Paragraph>
                </li>
            ))}
        </ul>
    )
}
