import { createServerClient } from '@/lib/supabase/server'

const STORAGE_BUCKET = 'certificates'

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number]

export interface CertificateUploadResult {
  storage_path: string
  public_url: string
}

/**
 * Validates certificate image file type and size before upload.
 * Returns null if valid, or an error message string if invalid.
 */
export function validateCertificateFile(
  mimeType: string,
  sizeBytes: number
): string | null {
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    return `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`
  }
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return 'File size exceeds 5MB limit'
  }
  return null
}

/**
 * Ensures the certificates storage bucket exists, creating it (public) if not.
 */
async function ensureBucketExists(
  supabase: ReturnType<typeof createServerClient>
): Promise<void> {
  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets()
  if (listError) throw new Error(`Failed to list buckets: ${listError.message}`)

  const exists = buckets?.some(b => b.name === STORAGE_BUCKET)
  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(
      STORAGE_BUCKET,
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
 * Uploads a certificate image buffer to Supabase Storage.
 * Returns the storage path and public URL on success.
 * Throws an error if the upload fails.
 */
export async function uploadCertificateToStorage(
  courseId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<CertificateUploadResult> {
  const supabase = createServerClient()
  await ensureBucketExists(supabase)

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storagePath = `${courseId}/${Date.now()}-${safeName}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, buffer, {
      contentType: mimeType,
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`)
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath)

  return {
    storage_path: storagePath,
    public_url: urlData.publicUrl,
  }
}

/**
 * Removes a certificate image from Supabase Storage by its storage path.
 * Throws an error if the deletion fails.
 */
export async function deleteCertificateFromStorage(
  storagePath: string
): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([storagePath])

  if (error) {
    throw new Error(`Storage deletion failed: ${error.message}`)
  }
}
