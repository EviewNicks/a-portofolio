import { getAllProjects } from '@/lib/supabase/queries/projects'
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline'
import { ProjectsSectionClient } from './ProjectsSectionClient'
import type { DynamicProject, ProjectStatus } from '@/features/projects/types'

const MAX_HOMEPAGE_PROJECTS = 6

export async function HomepageProjectsSection() {
  const rawProjects = await getAllProjects()

  const projects: DynamicProject[] = rawProjects
    .slice(0, MAX_HOMEPAGE_PROJECTS)
    .map(p => ({
      id: p.id,
      title: p.title,
      short_description: p.short_description,
      long_description: p.long_description ?? undefined,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
      status: p.status as ProjectStatus,
      github_repo_url: p.github_repo_url ?? undefined,
      github_owner: p.github_owner ?? undefined,
      github_repo: p.github_repo ?? undefined,
      last_sync_at: p.last_sync_at?.toISOString() ?? undefined,
      created_at: p.created_at.toISOString(),
      updated_at: p.updated_at.toISOString(),
    }))

  const statsEntries = await Promise.all(
    projects.map(async p => {
      const entries = await getTimelineEntriesByProjectId(p.id)
      const sprintSet = new Set(entries.map(e => e.sprint_number))
      const prCount = entries.filter(e => e.entry_type === 'pr').length
      return [p.id, { sprintCount: sprintSet.size, prCount }] as const
    })
  )
  const stats = Object.fromEntries(statsEntries)

  return (
    <section
      id="projects"
      className="relative mx-4 my-16 py-0 sm:mx-8 lg:mx-16"
    >
      {/* Editorial Dark Background Container */}
      <div className="bg-ink text-paper relative overflow-hidden rounded-[32px]">
        {/* Editorial Noise Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>")`,
            backgroundSize: '240px 240px',
          }}
        />

        <div className="relative z-10 container mx-auto px-8 py-20 sm:px-12 lg:px-16 lg:py-28">
          <ProjectsSectionClient
            projects={projects}
            stats={stats}
            totalProjects={rawProjects.length}
            maxProjects={MAX_HOMEPAGE_PROJECTS}
          />
        </div>
      </div>
    </section>
  )
}
