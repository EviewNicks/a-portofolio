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
    <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-2">
          {project.title}
        </h3>
        <ProjectStatusBadge status={project.status} />
      </div>

      <p className="text-sm text-white/60 mb-4 line-clamp-3">{project.short_description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech_stack.slice(0, 4).map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 text-xs">
            {tech}
          </span>
        ))}
        {project.tech_stack.length > 4 && (
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/50 text-xs">
            +{project.tech_stack.length - 4}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-white/40 mb-5">
        <span>{sprintCount} Sprint{sprintCount !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{prCount} PR{prCount !== 1 ? 's' : ''}</span>
      </div>

      <Link
        href={`/projects/${project.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
      >
        View Project →
      </Link>
    </div>
  );
}
