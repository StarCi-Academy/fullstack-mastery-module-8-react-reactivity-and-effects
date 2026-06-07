import { Avatar, AvatarFallback, AvatarImage } from "@heroui/react"
import { resolveUserAvatarUrl } from "../../../lib"

/** Props for {@link UserAvatar}. */
interface UserAvatarProps {
    /** Stable user id — seeds the DiceBear illustration. */
    userId: number
    /** Display name; drives initials fallback and image alt text. */
    name: string
    /** HeroUI avatar size preset. */
    size?: "sm" | "md" | "lg"
}

/**
 * UserAvatar — illustrated avatar with initials fallback for seed user rows.
 *
 * @param props.userId Seed user id passed to DiceBear for a stable image per row.
 * @param props.name User display name (alt text + two-letter fallback).
 * @param props.size Avatar size preset; defaults to `sm` for compact list rows.
 */
export const UserAvatar = ({ userId, name, size = "sm" }: UserAvatarProps): JSX.Element => {
    const initials = name.slice(0, 2).toUpperCase()

    return (
        <Avatar size={size} color="accent">
            <AvatarImage src={resolveUserAvatarUrl(userId)} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}
