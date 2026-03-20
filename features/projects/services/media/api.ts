import { createServerClient } from '@/lib/supabase/server';

const STORAGE_BUCKET = 'project-media';

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export interface MediaUploadResult {
  storage_path: string;
  public_url: string;
}

/**
 * Validates file type and size before upload.
 * Returns null if valid, or an error message string if invalid.
 * Requirements: 7.2, 7.3
 */
export function validateMediaFile(mimeType: string, sizeBytes: number): string | null {
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    return `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`;
  }
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return 'File size exceeds 5MB limit';
  }
  return null;
}

/**
 * Ensures the storage bucket exists, creating it (public) if not.
 * Uses service_role key so no RLS policy needed for bucket management.
 */
async function ensureBucketExists(supabase: ReturnType<typeof createServerClient>): Promise<void> {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw new Error(`Failed to list buckets: ${listError.message}`);

  const exists = buckets?.some((b) => b.name === STORAGE_BUCKET);
  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: true,
      fileSizeLimit: MAX_FILE_SIZE_BYTES,
      allowedMimeTypes: [...ALLOWED_MIME_TYPES],
    });
    if (createError) throw new Error(`Failed to create bucket: ${createError.message}`);
  }
}

/**
 * Uploads a file buffer to Supabase Storage under the project-media bucket.
 * Returns the storage path and public URL on success.
 * Throws an error if the upload fails.
 * Requirements: 7.1
 */
export async function uploadMediaToStorage(
  projectId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<MediaUploadResult> {
  const supabase = createServerClient();
  await ensureBucketExists(supabase);
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${projectId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, buffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath);

  return {
    storage_path: storagePath,
    public_url: urlData.publicUrl,
  };
}

/**
 * Removes a file from Supabase Storage by its storage path.
 * Throws an error if the deletion fails.
 * Requirements: 7.5
 */
export async function deleteMediaFromStorage(storagePath: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([storagePath]);

  if (error) {
    throw new Error(`Storage deletion failed: ${error.message}`);
  }
}
