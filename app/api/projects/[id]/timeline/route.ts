import { NextRequest, NextResponse } from 'next/server';
import { getTimelineEntriesByProjectId, createTimelineEntry } from '@/lib/supabase/queries/timeline';
import { getProjectById } from '@/lib/supabase/queries/projects';
import { validateTimelineEntryInput, validateAdminSecret } from '@/features/projects/utils/timeline';

type Params = { params: Promise<{ id: string }> };

// GET /api/projects/[id]/timeline
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const entries = await getTimelineEntriesByProjectId(id);
    return NextResponse.json({ data: entries });
  } catch (error) {
    console.error('[GET /api/projects/[id]/timeline]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/projects/[id]/timeline
export async function POST(request: NextRequest, { params }: Params) {
  const secret = request.headers.get('x-admin-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const body = await request.json();
    const validation = validateTimelineEntryInput(body);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    }

    const entry = await createTimelineEntry({
      project: { connect: { id } },
      entry_type: body.entry_type,
      date: new Date(body.date),
      sprint_number: Number(body.sprint_number),
      title: body.title.trim(),
      description: body.description?.trim() ?? null,
      external_url: body.external_url ?? null,
      external_title: body.external_title ?? null,
      external_status: body.external_status ?? null,
      is_featured: body.is_featured ?? false,
      media_preview: body.media_preview ?? null,
      github_pr_number: body.github_pr_number ?? null,
      github_pr_title: body.github_pr_title ?? null,
      github_author: body.github_author ?? null,
    });

    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/projects/[id]/timeline]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
