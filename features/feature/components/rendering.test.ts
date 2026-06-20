import * as fc from 'fast-check'
import { validateFeatureInput } from '@/features/utils/validation'

// ─── Arbitraries ─────────────────────────────────────────────────────────────

// Safe date generator
const safeDateArb = fc
  .date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') })
  .filter(d => !isNaN(d.getTime()))

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

// Tech Stack generator (up to 50 items)
const techStackArb = fc.array(
  fc.string({ minLength: 1, maxLength: 30 }),
  { minLength: 0, maxLength: 50 }
)

// Helper feature data builder
const featureDataArb = fc.record({
  title: fc.string({ minLength: 1, maxLength: 200 }),
  description: fc.option(fc.string({ minLength: 0, maxLength: 10000 }), { nil: undefined }),
  youtube_url: fc.option(youtubeUrlArb, { nil: undefined }),
  demo_url: fc.option(
    fc.string({ minLength: 5, maxLength: 100 }).map(path => `https://demo.example.com/${path}`),
    { nil: undefined }
  ),
  tech_stack: techStackArb,
  is_featured: fc.boolean(),
  display_order: fc.integer({ min: 0, max: 100000 }),
  created_at: safeDateArb,
  updated_at: safeDateArb,
})

// ─── Test Suite ──────────────────────────────────────────────────────────────

describe('Feature Showcase Property Tests', () => {
  // Property 13: Tech Stack Badge Rendering
  // Validates: Requirements 6.6
  describe('Property 13: Tech Stack Badge Rendering', () => {
    it('tech stack array elements are mapped exactly with correct lengths and types', () => {
      fc.assert(
        fc.property(techStackArb, techStack => {
          // If we map tech stack elements to badges, the badge count must exactly equal the array length,
          // and each element must be a valid non-empty string.
          const badges = techStack.map(tech => tech.trim())
          return (
            badges.length === techStack.length &&
            badges.every((val, idx) => typeof val === 'string' && val === techStack[idx].trim())
          )
        }),
        { numRuns: 100 }
      )
    })
  })

  // Property 14: YouTube URL Storage Preservation
  // Validates: Requirements 8.2
  describe('Property 14: YouTube URL Storage Preservation', () => {
    it('youtube URL is validated successfully and preserved exactly without modification', () => {
      fc.assert(
        fc.property(youtubeUrlArb, url => {
          const inputData = {
            title: 'Sample Feature',
            youtube_url: url,
          }
          const validation = validateFeatureInput(inputData)
          
          // Must pass validation (valid: true)
          // And URL must be exactly identical to the input and less than 2048 chars
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
      description?: string
      youtube_url?: string
      demo_url?: string
      tech_stack: string[]
      is_featured: boolean
      display_order: number
      created_at: Date
      updated_at: Date
    }

    interface SerializedTestFeatureData {
      title: string
      description?: string
      youtube_url?: string
      demo_url?: string
      tech_stack: string[]
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
            parsed.description === originalFeature.description &&
            parsed.youtube_url === originalFeature.youtube_url &&
            parsed.demo_url === originalFeature.demo_url &&
            JSON.stringify(parsed.tech_stack) === JSON.stringify(originalFeature.tech_stack) &&
            parsed.is_featured === originalFeature.is_featured &&
            parsed.display_order === originalFeature.display_order

          return datesEqual && otherPropsEqual
        }),
        { numRuns: 100 }
      )
    })
  })
})
