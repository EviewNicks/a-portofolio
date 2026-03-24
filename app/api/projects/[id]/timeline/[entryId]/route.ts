import { NextRequest, NextResponse } from 'next/server';
import { getTimelineEntryById, updateTimelineEntry, deleteTimelineEntry } from '@/lib/supabase/queries/timeline';
import { validateAdminSecret } from '@/features/projects/utils/timeline';

type Params = { params: Promise<{ id: string; entryId: string }> };

// GET /api/projects/[id]/timeline/[entryId]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { entryId } = await params;
    const entry = await getTimelineEntryById(entryId);
    if (!entry) {
      return NextResponse.json({ error: 'Timeline entry not found' }, { status: 404 });
    }
    return NextResponse.json({ data: entry });
  } catch (error) {
    console.error('[GET /api/projects/[id]/timeline/[entryId]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/projects/[id]/timeline/[entryId]
export async function PUT(request: NextRequest, { params }: Params) {
  const secret = request.headers.get('x-admin-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { entryId } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};
    if (body.entry_type !== undefined) updateData.entry_type = body.entry_type;
    if (body.date !== undefined) updateData.date = new Date(body.date);
    if (body.sprint_number !== undefined) updateData.sprint_number = Number(body.sprint_number);
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined) updateData.description = body.description?.trim() ?? null;
    if (body.external_url !== undefined) updateData.external_url = body.external_url ?? null;
    if (body.external_title !== undefined) updateData.external_title = body.external_title ?? null;
    if (body.external_status !== undefined) updateData.external_status = body.external_status ?? null;
    if (body.is_featured !== undefined) updateData.is_featured = body.is_featured;
    if (body.media_preview !== undefined) updateData.media_preview = body.media_preview ?? null;

    const entry = await updateTimelineEntry(entryId, updateData);
    return NextResponse.json({ data: entry });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Timeline entry not found' }, { status: 404 });
    }
    console.error('[PUT /api/projects/[id]/timeline/[entryId]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/projects/[id]/timeline/[entryId]
export async function DELETE(request: NextRequest, { params }: Params) {
  const secret = request.headers.get('x-admin-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { entryId } = await params;
    await deleteTimelineEntry(entryId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Timeline entry not found' }, { status: 404 });
    }
    console.error('[DELETE /api/projects/[id]/timeline/[entryId]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
