import { FeatureValidationResult } from '@/features/projects/types'

const SHORT_DESCRIPTION_LIMIT = 200
const DESCRIPTION_LIMIT = 50000
const YOUTUBE_URL_LIMIT = 2048

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

  // Short description validation
  if (
    !input.short_description ||
    typeof input.short_description !== 'string' ||
    input.short_description.trim() === ''
  ) {
    errors.short_description = 'Short description is required'
  } else if (input.short_description.length > SHORT_DESCRIPTION_LIMIT) {
    errors.short_description =
      'Short description must not exceed 200 characters'
  }

  // Description (markdown) validation
  if (
    !input.description ||
    typeof input.description !== 'string' ||
    input.description.trim() === ''
  ) {
    errors.description = 'Description is required'
  } else if (input.description.length > DESCRIPTION_LIMIT) {
    errors.description = 'Description must not exceed 50000 characters'
  }

  // YouTube URL validation
  if (input.youtube_url && typeof input.youtube_url === 'string') {
    const youtubePattern =
      /^https:\/\/(www\.youtube\.com\/watch\?v=|youtu\.be\/).+$/
    if (!youtubePattern.test(input.youtube_url)) {
      errors.youtube_url = 'Invalid YouTube URL format'
    } else if (input.youtube_url.length > YOUTUBE_URL_LIMIT) {
      errors.youtube_url = 'YouTube URL must not exceed 2048 characters'
    }
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
