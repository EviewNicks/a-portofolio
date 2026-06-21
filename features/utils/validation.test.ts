/**
 * Property tests and unit tests for project features validation utility functions
 * Feature: project-features-showcase
 */
import * as fc from 'fast-check'
import { validateFeatureInput, validateMediaFile } from './validation'

const validFeature = {
  title: 'Valid Title',
  short_description: 'A concise proof point for the feature showcase.',
  description: 'Markdown implementation notes for the feature showcase.',
}

describe('validateFeatureInput', () => {
  // Feature: project-features-showcase, Property 1: Title Validation
  // Validates: Requirements 2.1, 2.8
  it('Property 1: rejects empty, whitespace-only, or overly long titles, and accepts valid ones', () => {
    // 1. Whitespace only or empty should be invalid
    fc.assert(
      fc.property(
        fc.string().map(s => s.replace(/\S/g, ' ')),
        whitespaceTitle => {
          const result = validateFeatureInput({
            ...validFeature,
            title: whitespaceTitle,
          })
          expect(result.valid).toBe(false)
          expect(result.errors.title).toBeDefined()
        }
      ),
      { numRuns: 100 }
    )

    // 2. Titles longer than 200 characters should be invalid
    fc.assert(
      fc.property(fc.string({ minLength: 201, maxLength: 300 }), longTitle => {
        const result = validateFeatureInput({
          ...validFeature,
          title: longTitle,
        })
        expect(result.valid).toBe(false)
        expect(result.errors.title).toBe('Title must not exceed 200 characters')
      }),
      { numRuns: 100 }
    )

    // 3. Titles between 1 and 200 characters should be valid
    fc.assert(
      fc.property(
        fc
          .string({ minLength: 1, maxLength: 200 })
          .filter(s => s.trim().length > 0),
        validTitle => {
          const result = validateFeatureInput({
            ...validFeature,
            title: validTitle,
          })
          expect(result.valid).toBe(true)
          expect(result.errors.title).toBeUndefined()
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: project-features-showcase, Property 2: Short Description Validation
  // Validates: Requirements 2.2, 2.8
  it('Property 2: requires short_description and validates max 200 characters', () => {
    const invalidDescriptions = ['', '   ']

    for (const invalidDescription of invalidDescriptions) {
      const result = validateFeatureInput({
        ...validFeature,
        short_description: invalidDescription,
      })
      expect(result.valid).toBe(false)
      expect(result.errors.short_description).toBe(
        'Short description is required'
      )
    }

    fc.assert(
      fc.property(
        fc
          .string({ minLength: 1, maxLength: 200 })
          .filter(description => description.trim().length > 0),
        validDescription => {
          const result = validateFeatureInput({
            ...validFeature,
            short_description: validDescription,
          })
          expect(result.valid).toBe(true)
          expect(result.errors.short_description).toBeUndefined()
        }
      ),
      { numRuns: 100 }
    )

    fc.assert(
      fc.property(
        fc.string({ minLength: 201, maxLength: 300 }),
        longDescription => {
          const result = validateFeatureInput({
            ...validFeature,
            short_description: longDescription,
          })
          expect(result.valid).toBe(false)
          expect(result.errors.short_description).toBe(
            'Short description must not exceed 200 characters'
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: project-features-showcase, Property 3: Description Validation
  // Validates: Requirements 2.2, 2.8
  it('Property 3: requires description and validates max 50000 characters', () => {
    const invalidDescriptions = ['', '   ']

    for (const invalidDescription of invalidDescriptions) {
      const result = validateFeatureInput({
        ...validFeature,
        description: invalidDescription,
      })
      expect(result.valid).toBe(false)
      expect(result.errors.description).toBe('Description is required')
    }

    fc.assert(
      fc.property(
        fc
          .string({ minLength: 1, maxLength: 1000 })
          .filter(description => description.trim().length > 0),
        validDescription => {
          const result = validateFeatureInput({
            ...validFeature,
            description: validDescription,
          })
          expect(result.valid).toBe(true)
          expect(result.errors.description).toBeUndefined()
        }
      ),
      { numRuns: 100 }
    )

    const extremelyLongDescription = 'a'.repeat(50001)
    const result = validateFeatureInput({
      ...validFeature,
      description: extremelyLongDescription,
    })
    expect(result.valid).toBe(false)
    expect(result.errors.description).toBe(
      'Description must not exceed 50000 characters'
    )
  })

  // Feature: project-features-showcase, Property 4: YouTube URL Format Validation
  // Validates: Requirements 2.3, 8.1, 8.3
  it('Property 4: accepts optional valid YouTube URL formats', () => {
    const validYouTubeUrls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=123_456-abc',
      'https://youtu.be/123-abc_XYZ',
    ]

    // Omitting YouTube URL is valid because it is optional
    expect(validateFeatureInput(validFeature).valid).toBe(true)

    // Valid ones pass
    for (const url of validYouTubeUrls) {
      const result = validateFeatureInput({
        ...validFeature,
        youtube_url: url,
      })
      expect(result.valid).toBe(true)
      expect(result.errors.youtube_url).toBeUndefined()
    }

    // Invalid ones fail
    fc.assert(
      fc.property(
        fc
          .string()
          .filter(
            s =>
              s.trim().length > 0 &&
              !s.startsWith('https://www.youtube.com/watch?v=') &&
              !s.startsWith('https://youtu.be/')
          ),
        invalidUrl => {
          const result = validateFeatureInput({
            ...validFeature,
            youtube_url: invalidUrl,
          })
          expect(result.valid).toBe(false)
          expect(result.errors.youtube_url).toBe('Invalid YouTube URL format')
        }
      ),
      { numRuns: 100 }
    )

    // Exceeding 2048 characters fails
    const extremelyLongUrl = 'https://youtu.be/' + 'a'.repeat(2040)
    const result = validateFeatureInput({
      ...validFeature,
      youtube_url: extremelyLongUrl,
    })
    expect(result.valid).toBe(false)
    expect(result.errors.youtube_url).toBe(
      'YouTube URL must not exceed 2048 characters'
    )
  })
})

describe('validateMediaFile', () => {
  // Feature: project-features-showcase, Property 9: Media File Type Validation
  // Validates: Requirements 3.3
  it('Property 9: accepts only JPEG, PNG, GIF, and WebP, and rejects other types', () => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ]

    // Allowed types pass
    for (const mime of allowedMimeTypes) {
      const error = validateMediaFile(mime, 1024)
      expect(error).toBeNull()
    }

    // Disallowed types fail
    fc.assert(
      fc.property(
        fc.string().filter(s => !allowedMimeTypes.includes(s)),
        invalidMime => {
          const error = validateMediaFile(invalidMime, 1024)
          expect(error).toBe(
            'Unsupported file format. Please upload JPEG, PNG, GIF, or WebP'
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  it('rejects files larger than 10MB', () => {
    const maxSize = 10 * 1024 * 1024
    expect(validateMediaFile('image/png', maxSize)).toBeNull()
    expect(validateMediaFile('image/png', maxSize + 1)).toBe(
      'File size exceeds 10 MB limit'
    )
  })
})
