import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSecret } from '@/features/projects/utils/timeline'
import {
  validateFeatureMediaFile,
  uploadFeatureMediaToStorage,
} from '@/features/features/services/media/api'
import { getFeatureById } from '@/lib/supabase/queries/features'
import { createFeatureMedia } from '@/lib/supabase/queries/features'

/**
 * POST /api/features/media/upload
 *
 * Upload an image file for a feature.
 * Body: FormData — fields: file (File), feature_id (string), secret (string)
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.8, 4.6, 10.1, 10.2, 10.3, 10.4, 10.7
 */
export async function POST(request: NextRequest) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  // Admin authentication - check multiple sources
  const secret =
    (formData.get('secret') as string | null) ??
    request.nextUrl.searchParams.get('secret') ??
    request.headers.get('x-admin-secret') ??
    ''

  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Validate feature_id
  const featureId = formData.get('feature_id') as string | null
  if (!featureId || featureId.trim() === '') {
    return NextResponse.json(
      { error: 'feature_id is required' },
      { status: 400 }
    )
  }

  // Validate file
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  // Fallback: detect MIME type from file extension if browser/client doesn't set it
  const EXT_MIME_MAP: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  const mimeType = file.type || EXT_MIME_MAP[ext] || ''

  // Validate file type and size (Requirements: 3.2, 3.3)
  const validationError = validateFeatureMediaFile(mimeType, file.size)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  // Verify feature exists
  const feature = await getFeatureById(featureId)
  if (!feature) {
    return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
  }

  // Upload to storage
  const buffer = Buffer.from(await file.arrayBuffer())
  let uploadResult
  try {
    uploadResult = await uploadFeatureMediaToStorage(
      featureId,
      file.name,
      mimeType,
      buffer
    )
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to upload image. Please try again'
    console.error('[POST /api/features/media/upload]', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }

  // Create database record (Requirements: 3.4, 3.8)
  const media = await createFeatureMedia({
    feature_id: featureId,
    storage_path: uploadResult.storage_path,
    public_url: uploadResult.public_url,
    file_name: file.name,
    display_order: 0, // Default, can be updated later via reorder
  })

  return NextResponse.json({ data: media }, { status: 201 })
}
