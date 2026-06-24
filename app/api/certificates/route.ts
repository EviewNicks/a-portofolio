// GET /api/certificates - Get all non-deleted courses
// POST /api/certificates - Create new course with image upload (requires admin secret)

import { NextRequest, NextResponse } from 'next/server'
import {
  getAllCourses,
  createCourse,
  slugExists,
} from '@/features/certificates/services/course.service'
import { validateCourseInput } from '@/features/certificates/services/validation.service'
import { generateSlug } from '@/features/certificates/services/slug.service'
import {
  validateCertificateFile,
  uploadCertificateToStorage,
} from '@/features/certificates/services/storage.service'
import type { CourseInput } from '@/features/certificates/types'

/**
 * Validate admin secret inline
 */
function validateSecret(secret?: string | null): boolean {
  if (!secret) return false
  return secret === process.env.ADMIN_SECRET_KEY
}

/**
 * Parse form data to CourseInput
 */
function parseFormDataToCourseInput(formData: FormData): CourseInput {
  return {
    name: (formData.get('name') as string) ?? '',
    organisation: (formData.get('organisation') as string) ?? '',
    issue_date: (formData.get('issue_date') as string) ?? '',
    description: (formData.get('description') as string | null) ?? undefined,
    progress: parseInt(formData.get('progress') as string) || 0,
    platform: (formData.get('platform') as string | null) ?? undefined,
    url: (formData.get('url') as string | null) ?? undefined,
  }
}

/**
 * GET /api/certificates
 *
 * Returns all non-deleted courses
 * No authentication required
 */
export async function GET() {
  try {
    const courses = await getAllCourses()

    return NextResponse.json({ data: courses }, { status: 200 })
  } catch (error) {
    console.error('GET /api/certificates error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/certificates
 *
 * Create a new course with image upload
 * Requires admin secret authentication
 * Body: FormData with course fields + file (image)
 */
export async function POST(request: NextRequest) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  // Validate secret from multiple sources
  const secret =
    (formData.get('secret') as string | null) ??
    request.nextUrl.searchParams.get('secret') ??
    request.headers.get('x-admin-secret') ??
    ''

  if (!validateSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Parse course data from form
  const courseInput = parseFormDataToCourseInput(formData)

  // Validate course input
  const validation = validateCourseInput(courseInput)
  if (!validation.isValid) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: validation.errors,
      },
      { status: 400 }
    )
  }

  // Check if slug already exists
  const slug = generateSlug(courseInput.name)
  const exists = await slugExists(slug)

  if (exists) {
    return NextResponse.json(
      { error: 'A course with this name already exists' },
      { status: 409 }
    )
  }

  // Get and validate image file (required)
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json(
      { error: 'Image file is required' },
      { status: 400 }
    )
  }

  // Detect MIME type
  const EXT_MIME_MAP: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  const mimeType = file.type || EXT_MIME_MAP[ext] || ''

  // Validate file
  const fileValidation = validateCertificateFile(mimeType, file.size)
  if (fileValidation) {
    return NextResponse.json({ error: fileValidation }, { status: 400 })
  }

  try {
    // Upload image first (need temp ID)
    const tempId = `temp-${Date.now()}`
    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadResult = await uploadCertificateToStorage(
      tempId,
      file.name,
      mimeType,
      buffer
    )

    // Create course with uploaded image URL
    const courseWithImage: CourseInput = {
      ...courseInput,
      certificate_image: uploadResult.public_url,
    }

    const course = await createCourse(courseWithImage)

    return NextResponse.json({ data: course }, { status: 201 })
  } catch (error) {
    console.error('POST /api/certificates error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
