import Link from 'next/link';
import type { DynamicProject } from '@/features/projects/types';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectHeaderProps {
  project: DynamicProject;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div data-testid="project-header" className="mb-8">
      <div className="flex items-start gap-3 mb-3">
        <h1 data-testid="project-title" className="text-3xl font-bold text-foreground font-display flex-1">
          {project.title}
        </h1>
        <ProjectStatusBadge status={project.status} />
      </div>

      {/* Tech stack */}
      <div data-testid="project-tech-stack" className="flex flex-wrap gap-2 mb-4">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            data-testid="tech-tag"
            className="px-3 py-1 rounded-full bg-foreground/8 text-foreground/70 text-sm border border-border"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.github_repo_url && (
        <Link
          href={project.github_repo_url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="github-link"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View on GitHub →
        </Link>
      )}
    </div>
  );
}
