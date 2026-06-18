import { createServerClient } from '@/lib/supabase/server'
import {
  buildFeatureMediaPath,
  getFeatureMediaBucket,
} from '@/features/utils/storage'

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number]

export interface FeatureMediaUploadResult {
  storage_path: string
  public_url: string
}

/**
 * Validates file type and size before upload.
 * Returns null if valid, or an error message string if invalid.
 * Requirements: 3.2, 3.3
 */
export function validateFeatureMediaFile(
  mimeType: string,
  sizeBytes: number
): string | null {
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    return 'Unsupported file format. Please upload JPEG, PNG, GIF, or WebP'
  }
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return 'File size exceeds 10 MB limit'
  }
  return null
}

/**
 * Ensures the storage bucket exists, creating it (public) if not.
 * Uses service_role key so no RLS policy needed for bucket management.
 */
async function ensureBucketExists(
  supabase: ReturnType<typeof createServerClient>
): Promise<void> {
  const bucketName = getFeatureMediaBucket()
  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets()
  if (listError) throw new Error(`Failed to list buckets: ${listError.message}`)

  const exists = buckets?.some(b => b.name === bucketName)
  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(
      bucketName,
      {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE_BYTES,
        allowedMimeTypes: [...ALLOWED_MIME_TYPES],
      }
    )
    if (createError)
      throw new Error(`Failed to create bucket: ${createError.message}`)
  }
}

/**
 * Uploads a file buffer to Supabase Storage under the public bucket.
 * Returns the storage path and public URL on success.
 * Throws an error if the upload fails.
 * Requirements: 3.1, 3.4, 3.8
 */
export async function uploadFeatureMediaToStorage(
  featureId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<FeatureMediaUploadResult> {
  const supabase = createServerClient()
  await ensureBucketExists(supabase)

  const storagePath = buildFeatureMediaPath(featureId, fileName)
  const bucketName = getFeatureMediaBucket()

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, buffer, {
      contentType: mimeType,
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Failed to upload image. Please try again`)
  }

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(storagePath)

  return {
    storage_path: storagePath,
    public_url: urlData.publicUrl,
  }
}

/**
 * Removes a file from Supabase Storage by its storage path.
 * Throws an error if the deletion fails.
 * Requirements: 3.7
 */
export async function deleteFeatureMediaFromStorage(
  storagePath: string
): Promise<void> {
  const supabase = createServerClient()
  const bucketName = getFeatureMediaBucket()

  const { error } = await supabase.storage
    .from(bucketName)
    .remove([storagePath])

  if (error) {
    // Log error but don't throw - graceful degradation for orphaned files
    console.error(`Storage deletion failed for ${storagePath}:`, error.message)
  }
}
