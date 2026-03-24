import type { DynamicProject } from '@/features/projects/types';
import { DynamicProjectCard } from './DynamicProjectCard';

interface DynamicProjectGridProps {
  projects: DynamicProject[];
  stats?: Record<string, { sprintCount: number; prCount: number }>;
}

export function DynamicProjectGrid({ projects, stats = {} }: DynamicProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div data-testid="project-grid-empty" className="text-center py-16 text-muted-foreground">
        <p className="text-lg">No projects found.</p>
        <p className="text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div data-testid="project-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <DynamicProjectCard
          key={project.id}
          project={project}
          sprintCount={stats[project.id]?.sprintCount}
          prCount={stats[project.id]?.prCount}
        />
      ))}
    </div>
  );
}
