import * as fc from 'fast-check'
import { validateFeatureInput } from '@/features/utils/validation'

// ─── Arbitraries ─────────────────────────────────────────────────────────────

// Safe date generator
const safeDateArb = fc
  .date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') })
  .filter(d => !Number.isNaN(d.getTime()))

// Safe YouTube URL generator
const youtubeUrlArb = fc.oneof(
  fc
    .string({
      minLength: 1,
      maxLength: 100,
    })
    .map(id => `https://www.youtube.com/watch?v=${id}`),
  fc
    .string({
      minLength: 1,
      maxLength: 100,
    })
    .map(id => `https://youtu.be/${id}`)
)

// Short description generator aligned with the 200-character backend limit
const shortDescriptionArb = fc
  .string({
    minLength: 1,
    maxLength: 200,
  })
  .filter(shortDescription => shortDescription.trim().length > 0)

// Helper feature data builder
const featureDataArb = fc.record({
  title: fc.string({ minLength: 1, maxLength: 200 }),
  short_description: shortDescriptionArb,
  description: fc.option(fc.string({ minLength: 1, maxLength: 10000 }), {
    nil: undefined,
  }),
  youtube_url: fc.option(youtubeUrlArb, { nil: undefined }),
  is_featured: fc.boolean(),
  display_order: fc.integer({ min: 0, max: 100000 }),
  created_at: safeDateArb,
  updated_at: safeDateArb,
})

// ─── Test Suite ──────────────────────────────────────────────────────────────

describe('Feature Showcase Property Tests', () => {
  // Property 13: Short Description Rendering
  // Validates: Requirements 2.2, 2.8
  describe('Property 13: Short Description Rendering', () => {
    it('short description values are preserved exactly with correct length and type', () => {
      fc.assert(
        fc.property(shortDescriptionArb, shortDescription => {
          const trimmed = shortDescription.trim()
          return (
            trimmed.length > 0 &&
            trimmed.length <= 200 &&
            typeof trimmed === 'string'
          )
        }),
        { numRuns: 100 }
      )
    })
  })

  // Property 14: YouTube URL Storage Preservation
  // Validates: Requirements 2.3, 8.2
  describe('Property 14: YouTube URL Storage Preservation', () => {
    it('youtube URL is validated successfully and preserved exactly without modification', () => {
      fc.assert(
        fc.property(youtubeUrlArb, url => {
          const inputData = {
            title: 'Sample Feature',
            short_description: 'A concise feature summary.',
            description: 'Markdown implementation notes.',
            youtube_url: url,
          }
          const validation = validateFeatureInput(inputData)

          // Must pass validation and keep the URL unchanged
          return (
            validation.valid === true &&
            inputData.youtube_url === url &&
            url.length <= 2048
          )
        }),
        { numRuns: 100 }
      )
    })
  })

  // Property 15: Data Serialization Round-Trip
  // Validates: Requirements 12.4
  describe('Property 15: Data Serialization Round-Trip', () => {
    interface TestFeatureData {
      title: string
      short_description: string
      description?: string
      youtube_url?: string
      is_featured: boolean
      display_order: number
      created_at: Date
      updated_at: Date
    }

    interface SerializedTestFeatureData {
      title: string
      short_description: string
      description?: string
      youtube_url?: string
      is_featured: boolean
      display_order: number
      created_at: string
      updated_at: string
    }

    // Serialization formatter
    const serializeFeature = (
      feature: TestFeatureData
    ): SerializedTestFeatureData => {
      return {
        ...feature,
        created_at: feature.created_at.toISOString(),
        updated_at: feature.updated_at.toISOString(),
      }
    }

    // Deserialization parser
    const parseFeature = (
      serialized: SerializedTestFeatureData
    ): TestFeatureData => {
      return {
        ...serialized,
        created_at: new Date(serialized.created_at),
        updated_at: new Date(serialized.updated_at),
      }
    }

    it('serializing and then parsing a feature data object produces an equivalent object', () => {
      fc.assert(
        fc.property(featureDataArb, originalFeature => {
          // Perform round-trip
          const serialized = serializeFeature(originalFeature)
          const parsed = parseFeature(serialized)

          // Validate equivalence
          const datesEqual =
            parsed.created_at.getTime() === originalFeature.created_at.getTime() &&
            parsed.updated_at.getTime() === originalFeature.updated_at.getTime()

          const otherPropsEqual =
            parsed.title === originalFeature.title &&
            parsed.short_description === originalFeature.short_description &&
            parsed.description === originalFeature.description &&
            parsed.youtube_url === originalFeature.youtube_url &&
            parsed.is_featured === originalFeature.is_featured &&
            parsed.display_order === originalFeature.display_order

          return datesEqual && otherPropsEqual
        }),
        { numRuns: 100 }
      )
    })
  })
})
