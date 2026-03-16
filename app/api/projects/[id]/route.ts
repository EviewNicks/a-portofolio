import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject } from '@/lib/supabase/queries/projects';
import { validateProjectInput, validateAdminSecret } from '@/features/projects/utils/timeline';
import { extractGitHubOwnerRepo } from '@/features/projects/services/github/api';

type Params = { params: Promise<{ id: string }> };

// GET /api/projects/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch (error) {
    console.error('[GET /api/projects/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  const secret = request.headers.get('x-admin-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Partial validation — only validate fields that are present
    const toValidate = {
      title: body.title ?? 'placeholder',
      short_description: body.short_description ?? 'placeholder',
      ...body,
    };
    const validation = validateProjectInput(toValidate);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.short_description !== undefined) updateData.short_description = body.short_description.trim();
    if (body.long_description !== undefined) updateData.long_description = body.long_description?.trim() ?? null;
    if (body.tech_stack !== undefined) updateData.tech_stack = body.tech_stack;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.github_repo_url !== undefined) {
      updateData.github_repo_url = body.github_repo_url ?? null;
      if (body.github_repo_url) {
        const extracted = extractGitHubOwnerRepo(body.github_repo_url);
        updateData.github_owner = extracted?.owner ?? null;
        updateData.github_repo = extracted?.repo ?? null;
      } else {
        updateData.github_owner = null;
        updateData.github_repo = null;
      }
    }

    const project = await updateProject(id, updateData);
    return NextResponse.json({ data: project });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    console.error('[PUT /api/projects/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(request: NextRequest, { params }: Params) {
  const secret = request.headers.get('x-admin-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    console.error('[DELETE /api/projects/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
