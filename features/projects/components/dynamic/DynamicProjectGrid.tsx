import type { DynamicProject } from '@/features/projects/types'
import { DynamicProjectCard } from './DynamicProjectCard'

interface DynamicProjectGridProps {
  projects: DynamicProject[]
  stats?: Record<string, { sprintCount: number; prCount: number }>
}

export function DynamicProjectGrid({
  projects,
  stats = {},
}: DynamicProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div
        data-testid="project-grid-empty"
        className="text-muted-foreground py-16 text-center"
      >
        <p className="text-lg">No projects found.</p>
        <p className="mt-1 text-sm">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div
      data-testid="project-grid"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, idx) => (
        <DynamicProjectCard
          key={project.id}
          project={project}
          index={idx}
          total={projects.length}
          sprintCount={stats[project.id]?.sprintCount}
          prCount={stats[project.id]?.prCount}
        />
      ))}
    </div>
  )
}
