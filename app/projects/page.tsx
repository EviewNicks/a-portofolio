import { cache } from 'react'
import { Suspense } from 'react'
import { getAllProjects, searchProjects } from '@/lib/supabase/queries/projects'
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline'
import { DynamicProjectGrid } from '@/features/projects/components/dynamic/DynamicProjectGrid'
import { DynamicProjectFilters } from '@/features/projects/components/dynamic/DynamicProjectFilters'
import { ProjectsNavbar } from '@/features/projects/components/navbar/ProjectsNavbar'
import type { DynamicProject, ProjectStatus } from '@/features/projects/types'

interface PageProps {
  searchParams: Promise<{ status?: string; query?: string }>
}

// Cache the timeline queries to prevent duplicate fetches
const getCachedTimelineEntries = cache(getTimelineEntriesByProjectId)

async function ProjectsData({
  status,
  query,
}: {
  status?: string
  query?: string
}) {
  const rawProjects =
    query || status
      ? await searchProjects(query ?? '', status)
      : await getAllProjects()

  // Cast Prisma result to DynamicProject (dates → strings)
  const projects: DynamicProject[] = rawProjects.map(p => ({
    id: p.id,
    title: p.title,
    short_description: p.short_description,
    long_description: p.long_description ?? undefined,
    tech_stack: p.tech_stack,
    status: p.status as ProjectStatus,
    github_repo_url: p.github_repo_url ?? undefined,
    github_owner: p.github_owner ?? undefined,
    github_repo: p.github_repo ?? undefined,
    last_sync_at: p.last_sync_at?.toISOString() ?? undefined,
    created_at: p.created_at.toISOString(),
    updated_at: p.updated_at.toISOString(),
  }))

  // Optimize: Fetch all timeline entries in parallel instead of sequentially
  const timelinePromises = projects.map(p => getCachedTimelineEntries(p.id))
  const allTimelineEntries = await Promise.all(timelinePromises)

  // Build stats map from the parallel results
  const stats = Object.fromEntries(
    projects.map((project, index) => {
      const entries = allTimelineEntries[index]
      const sprintSet = new Set(entries.map(e => e.sprint_number))
      const prCount = entries.filter(e => e.entry_type === 'pr').length
      return [project.id, { sprintCount: sprintSet.size, prCount }]
    })
  )

  return <DynamicProjectGrid projects={projects} stats={stats} />
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { status, query } = await searchParams

  return (
    <>
      <ProjectsNavbar showBackToProjects={false} />
      <main className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="projects-bg-gradient absolute inset-0 -z-10" />
      {/* Subtle warm accent blobs */}
      <div
        className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/3 left-0 -z-10 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #d97706 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-foreground font-display mb-2 text-4xl font-bold">
            Projects
          </h1>
          <p className="text-muted-foreground">
            A timeline of development work, sprints, and technical progress.
          </p>
        </div>

        <Suspense fallback={null}>
          <DynamicProjectFilters />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-foreground/5 h-56 animate-pulse rounded-xl"
                />
              ))}
            </div>
          }
        >
          <ProjectsData status={status} query={query} />
        </Suspense>
      </div>
    </main>
    </>
  )
}
