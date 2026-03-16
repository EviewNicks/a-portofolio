import { NextRequest, NextResponse } from 'next/server';
import { validateAdminSecret } from '@/features/projects/utils/timeline';
import { fetchGitHubPRs } from '@/features/projects/services/github/api';
import { getProjectById, updateProject } from '@/lib/supabase/queries/projects';
import { upsertTimelineEntryByPR } from '@/lib/supabase/queries/timeline';

// POST /api/github/sync
// Body: { project_id: string }
// Auth: x-admin-secret header or ?secret= query param
export async function POST(request: NextRequest) {
  const secret =
    request.headers.get('x-admin-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    '';

  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { project_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { project_id } = body;
  if (!project_id || typeof project_id !== 'string') {
    return NextResponse.json(
      { error: 'project_id is required' },
      { status: 400 }
    );
  }

  // Fetch project
  const project = await getProjectById(project_id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  if (!project.github_owner || !project.github_repo) {
    return NextResponse.json(
      { error: 'Project does not have a linked GitHub repository' },
      { status: 400 }
    );
  }

  // Fetch merged PRs from GitHub — do NOT modify data if this fails
  let prs;
  try {
    prs = await fetchGitHubPRs(project.github_owner, project.github_repo);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'GitHub API error';
    console.error('[POST /api/github/sync] fetchGitHubPRs failed:', error);
    return NextResponse.json(
      { error: `GitHub API error: ${message}` },
      { status: 502 }
    );
  }

  // Upsert each PR as a timeline entry (skip duplicates via unique constraint)
  let newCount = 0;
  let skippedCount = 0;

  for (const pr of prs) {
    try {
      const result = await upsertTimelineEntryByPR(project_id, pr.number, {
        project: { connect: { id: project_id } },
        entry_type: 'pr',
        title: pr.title,
        description: pr.body ? pr.body.substring(0, 200) : null,
        external_url: pr.html_url,
        external_title: `PR #${pr.number}: ${pr.title}`,
        external_status: 'merged',
        github_pr_number: pr.number,
        github_pr_title: pr.title,
        github_author: pr.user.login,
        date: new Date(pr.merged_at),
        sprint_number: 1, // default sprint; admin can reassign manually
        is_featured: pr.labels.some((l) => l.name === 'featured'),
      });

      // Prisma upsert with empty update{} means: if it existed, nothing changed
      // We detect "new" by checking if created_at === updated_at (both set on create)
      const isNew =
        result.created_at.getTime() === result.updated_at.getTime();
      if (isNew) {
        newCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(
        `[POST /api/github/sync] upsert failed for PR #${pr.number}:`,
        error
      );
      // Continue processing remaining PRs
    }
  }

  // Update last_sync_at on the project
  await updateProject(project_id, { last_sync_at: new Date() });

  return NextResponse.json({
    success: true,
    synced: prs.length,
    new: newCount,
    skipped: skippedCount,
  });
}
