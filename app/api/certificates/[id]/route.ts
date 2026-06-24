// GET /api/certificates/[id] - Get course by ID or slug (public)
// PUT /api/certificates/[id] - Update course with image upload (requires admin secret)
// DELETE /api/certificates/[id] - Soft delete course (requires admin secret)
// Note: [id] parameter accepts both UUID and slug

import { NextRequest, NextResponse } from 'next/server'
import {
  getCourseById,
  getCourseBySlug,
  updateCourse,
  softDeleteCourse,
} from '@/features/certificates/services/course.service'
import { validateCourseUpdate } from '@/features/certificates/services/validation.service'
import {
  validateCertificateFile,
  uploadCertificateToStorage,
} from '@/features/certificates/services/storage.service'
import type { CourseUpdate } from '@/features/certificates/types'

/**
 * Validate admin secret inline
 */
function validateSecret(secret?: string | null): boolean {
  if (!secret) return false
  return secret === process.env.ADMIN_SECRET_KEY
}

/**
 * Check if string is UUID format
 */
function isUUID(str: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

/**
 * Parse form data to CourseUpdate
 */
function parseFormDataToCourseUpdate(formData: FormData): CourseUpdate {
  const update: CourseUpdate = {}

  const name = formData.get('name') as string | null
  if (name) update.name = name

  const organisation = formData.get('organisation') as string | null
  if (organisation) update.organisation = organisation

  const issue_date = formData.get('issue_date') as string | null
  if (issue_date) update.issue_date = issue_date

  const description = formData.get('description') as string | null
  if (description) update.description = description

  const progress = formData.get('progress') as string | null
  if (progress) update.progress = parseInt(progress)

  const platform = formData.get('platform') as string | null
  if (platform) update.platform = platform

  const url = formData.get('url') as string | null
  if (url) update.url = url

  return update
}

/**
 * GET /api/certificates/[id]
 *
 * Get a course by ID (UUID) or slug
 * Public access - no authentication required
 * Accepts both UUID and slug for flexibility
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    // Try to get by ID (UUID) first, then by slug
    const course = isUUID(id)
      ? await getCourseById(id)
      : await getCourseBySlug(id)

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({ data: course }, { status: 200 })
  } catch (error) {
    console.error(`GET /api/certificates/${id} error:`, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/certificates/[id]
 *
 * Update a course by ID (UUID only) with optional image upload
 * Requires admin secret authentication
 * Body: FormData with course fields + optional file (image)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

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

  // Check if course exists
  const existingCourse = await getCourseById(id)
  if (!existingCourse) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  // Parse course update from form
  const courseUpdate = parseFormDataToCourseUpdate(formData)

  // Check if there's a new image file
  const file = formData.get('file') as File | null
  if (file) {
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
      // Upload new image
      const buffer = Buffer.from(await file.arrayBuffer())
      const uploadResult = await uploadCertificateToStorage(
        id,
        file.name,
        mimeType,
        buffer
      )

      // Add image URL to update
      courseUpdate.certificate_image = uploadResult.public_url
    } catch (error) {
      console.error(`Image upload error for course ${id}:`, error)
      return NextResponse.json(
        { error: 'Image upload failed' },
        { status: 500 }
      )
    }
  }

  // Validate update input
  const validation = validateCourseUpdate(courseUpdate)
  if (!validation.isValid) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: validation.errors,
      },
      { status: 400 }
    )
  }

  try {
    // Update course
    const course = await updateCourse(id, courseUpdate)

    return NextResponse.json({ data: course }, { status: 200 })
  } catch (error) {
    console.error(`PUT /api/certificates/${id} error:`, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/certificates/[id]
 *
 * Soft delete a course by ID (UUID only)
 * Requires admin secret authentication
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Validate secret
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    if (!validateSecret(secret)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if course exists
    const existingCourse = await getCourseById(id)
    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Soft delete course
    await softDeleteCourse(id)

    return NextResponse.json(null, { status: 204 })
  } catch (error) {
    console.error(`DELETE /api/certificates/${id} error:`, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
