import { Typography } from "@heroui/react"
import type { User } from "../../../lib"
import { UserAvatar } from "../../ui"

interface UserListProps {
    /** Rows to render — already filtered by the parent panel. */
    users: User[]
    /** Playwright hook prefix so each panel's rows are addressable. */
    testIdPrefix: string
    /** When true, wraps rows in a padded `bg-default-100` container (fixed panel). */
    boxed?: boolean
}

/**
 * UserList — renders the filtered rows for a panel.
 *
 * Pure presentational: it owns no state and no effect. Both the buggy and the
 * fixed panel feed it a `users` array; the only difference between panels is
 * HOW that array is produced (effect+state vs inline derived value).
 *
 * @param props.boxed Fixed panel uses a boxed list; buggy panel renders plain rows.
 */
export const UserList = (props: UserListProps): JSX.Element => {
    const { users, testIdPrefix, boxed = false } = props

    return (
        <ul
            data-testid={`${testIdPrefix}-list`}
            className={
                boxed
                    ? "flex flex-col gap-3 rounded-md bg-default-100 p-3"
                    : "flex flex-col gap-3 p-0"
            }
        >
            {users.map((u) => (
                <li
                    key={u.id}
                    data-testid={`${testIdPrefix}-row-${u.id}`}
                    className="flex items-center justify-between p-0"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <UserAvatar userId={u.id} name={u.name} />
                        <Typography.Paragraph size="sm" weight="medium">
                            {u.name}
                        </Typography.Paragraph>
                    </div>
                    <Typography.Paragraph size="xs" color="muted">
                        {u.role}
                    </Typography.Paragraph>
                </li>
            ))}
        </ul>
    )
}
