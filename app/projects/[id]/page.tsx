import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/supabase/queries/projects'
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline'
import { fetchGitHubStats } from '@/features/projects/services/github/api'
import { createServerClient } from '@/lib/supabase/server'
import { ProjectHeader } from '@/features/projects/components/dynamic/ProjectHeader'
import { GitHubStatsPanel } from '@/features/projects/components/dynamic/GitHubStats'
import { MediaGallery } from '@/features/projects/components/dynamic/MediaGallery'
import { ProjectDetailTabs } from '@/features/projects/components/dynamic/ProjectDetailTabs'
import { AdminActionBar } from '@/features/projects/components/dynamic/AdminActionBar'
import { SuccessBanner } from '@/features/projects/components/dynamic/SuccessBanner'
import { getFeaturesByProjectId } from '@/lib/supabase/queries/features'
import type {
  DynamicProject,
  TimelineEntry,
  ProjectMedia,
  ProjectStatus,
  EntryType,
  PRStatus,
  ProjectFeature,
} from '@/features/projects/types'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ secret?: string; created?: string }>
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params
  const { secret, created } = await searchParams

  // Check if user is admin
  const isAdmin = secret && secret === process.env.ADMIN_SECRET_KEY
  const showSuccessBanner = isAdmin && created === '1'

  const raw = await getProjectById(id)
  if (!raw) notFound()

  const project: DynamicProject = {
    id: raw.id,
    title: raw.title,
    short_description: raw.short_description,
    long_description: raw.long_description ?? undefined,
    tech_stack: raw.tech_stack,
    status: raw.status as ProjectStatus,
    github_repo_url: raw.github_repo_url ?? undefined,
    github_owner: raw.github_owner ?? undefined,
    github_repo: raw.github_repo ?? undefined,
    last_sync_at: raw.last_sync_at?.toISOString() ?? undefined,
    created_at: raw.created_at.toISOString(),
    updated_at: raw.updated_at.toISOString(),
  }

  // Fetch timeline entries
  const rawEntries = await getTimelineEntriesByProjectId(id)
  const entries: TimelineEntry[] = rawEntries.map(e => ({
    id: e.id,
    project_id: e.project_id,
    entry_type: e.entry_type as EntryType,
    date: e.date.toISOString(),
    sprint_number: e.sprint_number,
    title: e.title,
    description: e.description ?? undefined,
    external_url: e.external_url ?? undefined,
    external_title: e.external_title ?? undefined,
    external_status: e.external_status as PRStatus | undefined,
    is_featured: e.is_featured,
    media_preview: e.media_preview ?? undefined,
    github_pr_number: e.github_pr_number ?? undefined,
    github_pr_title: e.github_pr_title ?? undefined,
    github_author: e.github_author ?? undefined,
    created_at: e.created_at.toISOString(),
    updated_at: e.updated_at.toISOString(),
  }))

  // Fetch GitHub stats (non-blocking)
  let githubStats = null
  if (project.github_owner && project.github_repo) {
    try {
      githubStats = await fetchGitHubStats(
        project.github_owner,
        project.github_repo
      )
    } catch {
      // silently fail — show nothing if GitHub is unavailable
    }
  }

  // Fetch project media from Supabase Storage records
  const supabase = createServerClient()
  const { data: mediaRows } = await supabase
    .from('project_media')
    .select('*')
    .eq('project_id', id)
    .order('created_at', { ascending: true })

  const media: ProjectMedia[] = (mediaRows ?? []).map(
    (m: Record<string, string>) => ({
      id: m.id,
      project_id: m.project_id,
      storage_path: m.storage_path,
      public_url: m.public_url,
      file_name: m.file_name,
      created_at: m.created_at,
    })
  )

  const videoEntries = entries.filter(e => e.entry_type === 'video')

  // Fetch project features
  const rawFeatures = await getFeaturesByProjectId(id)
  const features: ProjectFeature[] = rawFeatures.map((f) => ({
    id: f.id,
    project_id: f.project_id,
    title: f.title,
    description: f.description,
    youtube_url: f.youtube_url,
    tech_stack: f.tech_stack,
    display_order: f.display_order,
    is_featured: f.is_featured,
    demo_url: f.demo_url,
    created_at: f.created_at.toISOString(),
    updated_at: f.updated_at.toISOString(),
    media: f.media.map((m) => ({
      id: m.id,
      feature_id: m.feature_id,
      storage_path: m.storage_path,
      public_url: m.public_url,
      file_name: m.file_name,
      display_order: m.display_order,
      created_at: m.created_at.toISOString(),
    })),
  }))

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground mb-8 inline-block text-sm transition-colors"
        >
          ← Back to Projects
        </Link>

        {showSuccessBanner && (
          <SuccessBanner projectTitle={project.title} show={true} />
        )}

        {isAdmin && secret && (
          <AdminActionBar project={project} secret={secret} />
        )}

        <ProjectHeader project={project} />

        {githubStats && <GitHubStatsPanel stats={githubStats} />}

        <MediaGallery media={media} videoEntries={videoEntries} />

        <ProjectDetailTabs project={project} entries={entries} features={features} />
      </div>
    </main>
  )
}
