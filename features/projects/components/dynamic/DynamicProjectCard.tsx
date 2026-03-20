import Link from 'next/link';
import type { DynamicProject } from '@/features/projects/types';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface DynamicProjectCardProps {
  project: DynamicProject;
  sprintCount?: number;
  prCount?: number;
}

export function DynamicProjectCard({ project, sprintCount = 0, prCount = 0 }: DynamicProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      data-testid="project-card-view-link"
      className="group relative block rounded-xl glass-card p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer"
      data-project-id={project.id}
    >
      <div data-testid="project-card">
        <div className="flex items-start justify-between mb-3">
          <h3
            data-testid="project-card-title"
            className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
          >
            {project.title}
          </h3>
          <ProjectStatusBadge status={project.status} />
        </div>

        <p data-testid="project-card-description" className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.short_description}</p>

        {/* Tech stack */}
        <div data-testid="project-card-tech-stack" className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span key={tech} data-testid="tech-tag" className="px-2 py-0.5 rounded-md bg-foreground/8 text-foreground/70 text-xs border border-border">
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-foreground/5 text-muted-foreground text-xs border border-border">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
          <span data-testid="project-card-sprint-count">{sprintCount} Sprint{sprintCount !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span data-testid="project-card-pr-count">{prCount} PR{prCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </Link>
  );
}
