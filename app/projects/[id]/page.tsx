import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProjectById } from '@/lib/supabase/queries/projects'
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline'
import { fetchGitHubStats } from '@/features/projects/services/github/api'
import { createServerClient } from '@/lib/supabase/server'
import { ProjectHeader } from '@/features/projects/components/dynamic/ProjectHeader'
import { GitHubStatsPanel } from '@/features/projects/components/dynamic/GitHubStats'
import { MediaGallery } from '@/features/projects/components/dynamic/MediaGallery'
import { ProjectDetailTabs } from '@/features/projects/components/dynamic/ProjectDetailTabs'
import { ProjectDetailFeaturedWork } from '@/features/projects/components/dynamic/ProjectDetailFeaturedWork'
import { ProjectDetailCta } from '@/features/projects/components/dynamic/ProjectDetailCta'
import { ProjectDetailFooter } from '@/features/projects/components/dynamic/ProjectDetailFooter'
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

// Cache database queries to prevent duplicate fetches
const getCachedProject = cache(getProjectById)
const getCachedTimelineEntries = cache(getTimelineEntriesByProjectId)
const getCachedFeatures = cache(getFeaturesByProjectId)

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

  const isAdmin = secret && secret === process.env.ADMIN_SECRET_KEY
  const showSuccessBanner = isAdmin && created === '1'

  // Parallelize database queries instead of running them sequentially
  const [raw, rawEntries, rawFeatures, supabaseResult] = await Promise.all([
    getCachedProject(id),
    getCachedTimelineEntries(id),
    getCachedFeatures(id),
    (async () => {
      const supabase = createServerClient()
      return supabase
        .from('project_media')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: true })
    })(),
  ])

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

  // GitHub stats fetch (non-blocking, optional)
  let githubStats = null
  if (project.github_owner && project.github_repo) {
    try {
      githubStats = await fetchGitHubStats(
        project.github_owner,
        project.github_repo
      )
    } catch {
      // GitHub stats are optional; the detail page still renders without them.
    }
  }

  const { data: mediaRows } = supabaseResult

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

  const features: ProjectFeature[] = rawFeatures.map(f => ({
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
    media: f.media.map(m => ({
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
    <main className="editorial-bg relative min-h-screen overflow-hidden">
      <div
        className="bg-line pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
        aria-hidden="true"
      />
      <div
        className="bg-line pointer-events-none absolute bottom-0 left-0 z-0 h-px"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-10 sm:px-6 lg:px-10">
        {showSuccessBanner && (
          <SuccessBanner projectTitle={project.title} show={true} />
        )}

        {isAdmin && secret && (
          <AdminActionBar project={project} secret={secret} />
        )}

        <ProjectHeader project={project} />

        {githubStats && <GitHubStatsPanel stats={githubStats} />}

        <MediaGallery media={media} videoEntries={videoEntries} />

        <ProjectDetailTabs
          project={project}
          entries={entries}
          features={features}
        />

        <ProjectDetailFeaturedWork currentProjectId={project.id} />

        <ProjectDetailCta />

        <ProjectDetailFooter />
      </div>
    </main>
  )
}
