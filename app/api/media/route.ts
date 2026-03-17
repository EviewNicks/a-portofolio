import { NextRequest, NextResponse } from 'next/server';
import { getMediaByProjectId } from '@/lib/supabase/queries/media';

// GET /api/media?project_id=xxx
export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get('project_id');
  if (!projectId) {
    return NextResponse.json({ error: 'project_id is required' }, { status: 400 });
  }
  const media = await getMediaByProjectId(projectId);
  return NextResponse.json(media);
}
