import { NextRequest, NextResponse } from 'next/server';
import { validateAdminSecret } from '@/features/projects/utils/timeline';
import { validateMediaFile, uploadMediaToStorage } from '@/features/projects/services/media/api';
import { getProjectById } from '@/lib/supabase/queries/projects';
import { createMediaRecord } from '@/lib/supabase/queries/media';

// POST /api/media/upload
// Body: FormData — fields: file (File), project_id (string), secret (string)
export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const secret =
    (formData.get('secret') as string | null) ??
    request.nextUrl.searchParams.get('secret') ??
    request.headers.get('x-admin-secret') ??
    '';

  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projectId = formData.get('project_id') as string | null;
  if (!projectId || projectId.trim() === '') {
    return NextResponse.json({ error: 'project_id is required' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }

  // Fallback: detect MIME type from file extension if browser/client doesn't set it
  const EXT_MIME_MAP: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const mimeType = file.type || EXT_MIME_MAP[ext] || '';

  const validationError = validateMediaFile(mimeType, file.size);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const project = await getProjectById(projectId);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let uploadResult;
  try {
    uploadResult = await uploadMediaToStorage(projectId, file.name, mimeType, buffer);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('[POST /api/media/upload]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const media = await createMediaRecord({
    project_id: projectId,
    storage_path: uploadResult.storage_path,
    public_url: uploadResult.public_url,
    file_name: file.name,
  });

  return NextResponse.json({ data: media }, { status: 201 });
}
