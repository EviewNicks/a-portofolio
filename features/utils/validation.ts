import { FeatureValidationResult } from '@/features/projects/types'

export function validateFeatureInput(data: unknown): FeatureValidationResult {
  const errors: Record<string, string> = {}

  // Type guard: ensure data is an object
  if (!data || typeof data !== 'object') {
    errors.title = 'Invalid data format'
    return { valid: false, errors }
  }

  const input = data as Record<string, unknown>

  // Title validation
  if (
    !input.title ||
    typeof input.title !== 'string' ||
    input.title.trim() === ''
  ) {
    errors.title = 'Title is required'
  } else if (input.title.length > 200) {
    errors.title = 'Title must not exceed 200 characters'
  }

  // Description validation
  if (
    !input.description ||
    typeof input.description !== 'string' ||
    input.description.trim() === ''
  ) {
    errors.description = 'Short description is required'
  }

  // YouTube URL validation
  if (input.youtube_url && typeof input.youtube_url === 'string') {
    const youtubePattern =
      /^https:\/\/(www\.youtube\.com\/watch\?v=|youtu\.be\/).+$/
    if (!youtubePattern.test(input.youtube_url)) {
      errors.youtube_url = 'Invalid YouTube URL format'
    } else if (input.youtube_url.length > 2048) {
      errors.youtube_url = 'YouTube URL must not exceed 2048 characters'
    }
  }

  // Demo URL validation
  if (input.demo_url && typeof input.demo_url === 'string') {
    if (!/^https?:\/\/.+$/.test(input.demo_url)) {
      errors.demo_url = 'Demo URL must start with http:// or https://'
    } else if (input.demo_url.length > 2048) {
      errors.demo_url = 'Demo URL must not exceed 2048 characters'
    }
  }

  // Tech stack validation
  if (
    input.tech_stack &&
    Array.isArray(input.tech_stack) &&
    input.tech_stack.length > 50
  ) {
    errors.tech_stack = 'Tech stack must not exceed 50 items'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateMediaFile(
  mimeType: string,
  size: number
): string | null {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  if (!allowedTypes.includes(mimeType)) {
    return 'Unsupported file format. Please upload JPEG, PNG, GIF, or WebP'
  }

  const maxSize = 10 * 1024 * 1024 // 10 MB
  if (size > maxSize) {
    return 'File size exceeds 10 MB limit'
  }

  return null
}
