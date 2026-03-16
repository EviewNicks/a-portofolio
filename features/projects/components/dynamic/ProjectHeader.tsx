import Link from 'next/link';
import type { DynamicProject } from '@/features/projects/types';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectHeaderProps {
  project: DynamicProject;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-3 mb-3">
        <h1 className="text-3xl font-bold text-white flex-1">{project.title}</h1>
        <ProjectStatusBadge status={project.status} />
      </div>

      {project.long_description ? (
        <p className="text-white/60 leading-relaxed mb-4">{project.long_description}</p>
      ) : (
        <p className="text-white/60 leading-relaxed mb-4">{project.short_description}</p>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech_stack.map((tech) => (
          <span key={tech} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
            {tech}
          </span>
        ))}
      </div>

      {project.github_repo_url && (
        <Link
          href={project.github_repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View on GitHub →
        </Link>
      )}
    </div>
  );
}
