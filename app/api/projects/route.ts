import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject, searchProjects } from '@/lib/supabase/queries/projects';
import { validateProjectInput, validateAdminSecret } from '@/features/projects/utils/timeline';
import { extractGitHubOwnerRepo } from '@/features/projects/services/github/api';

// GET /api/projects?query=...&status=...
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') ?? '';
    const status = searchParams.get('status') ?? '';

    const projects = query || status
      ? await searchProjects(query, status || undefined)
      : await getAllProjects();

    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error('[GET /api/projects]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/projects — requires valid admin secret in Authorization header or ?secret= param
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-admin-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = validateProjectInput(body);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    }

    // Extract github_owner and github_repo from github_repo_url if provided
    let github_owner: string | undefined;
    let github_repo: string | undefined;
    if (body.github_repo_url) {
      const extracted = extractGitHubOwnerRepo(body.github_repo_url);
      if (extracted) {
        github_owner = extracted.owner;
        github_repo = extracted.repo;
      }
    }

    const project = await createProject({
      title: body.title.trim(),
      short_description: body.short_description.trim(),
      long_description: body.long_description?.trim() ?? null,
      tech_stack: Array.isArray(body.tech_stack) ? body.tech_stack : [],
      status: body.status ?? 'active',
      github_repo_url: body.github_repo_url ?? null,
      github_owner: github_owner ?? null,
      github_repo: github_repo ?? null,
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/projects]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
