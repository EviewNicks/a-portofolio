// Slug Generation Service
// Converts course names into URL-safe slugs

/**
 * Generate a URL-safe slug from a course name
 *
 * Rules:
 * - Convert to lowercase
 * - Replace spaces with hyphens
 * - Remove special characters except hyphens
 * - Remove multiple consecutive hyphens
 * - Remove leading/trailing hyphens
 *
 * @example
 * generateSlug("Advanced React Patterns") → "advanced-react-patterns"
 * generateSlug("TypeScript 101!") → "typescript-101"
 */
export function generateSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove special characters except hyphens
      .replace(/[^\w-]/g, '')
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  )
}

/**
 * Check if a slug is valid format
 *
 * Valid slug:
 * - Only lowercase letters, numbers, and hyphens
 * - No leading/trailing hyphens
 * - No consecutive hyphens
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}
