import { NextRequest, NextResponse } from 'next/server';
import { validateAdminSecret } from '@/features/projects/utils/timeline';
import { deleteMediaFromStorage } from '@/features/projects/services/media/api';
import { getMediaById, deleteMediaRecord } from '@/lib/supabase/queries/media';

type Params = { params: Promise<{ id: string }> };

// DELETE /api/media/[id]
// Auth: x-admin-secret header or ?secret= query param
export async function DELETE(request: NextRequest, { params }: Params) {
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    '';

  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const media = await getMediaById(id);
  if (!media) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  }

  try {
    await deleteMediaFromStorage(media.storage_path);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Storage deletion failed';
    console.error('[DELETE /api/media/[id]]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  await deleteMediaRecord(id);

  return NextResponse.json({ success: true });
}
