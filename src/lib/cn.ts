/**
 * Minimal class name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this project has no conditional
 * class conflicts that need runtime resolution, and a class string is
 * statically visible to Tailwind's scanner either way. Keeping it in-house
 * avoids a dependency for fourteen lines of logic.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}