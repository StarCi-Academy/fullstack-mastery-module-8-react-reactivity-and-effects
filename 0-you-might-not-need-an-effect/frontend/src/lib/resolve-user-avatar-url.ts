/**
 * Builds a deterministic avatar image URL for a seed user row.
 *
 * Uses DiceBear so each user id maps to a stable illustration without storing
 * binary assets in the lesson repo.
 *
 * @param userId Stable user id from the seed list.
 * @returns HTTPS URL for {@link AvatarImage}.
 */
export function resolveUserAvatarUrl(userId: number): string {
    return `https://api.dicebear.com/9.x/notionists/svg?seed=${userId}`
}
