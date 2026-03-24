'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';
import { ProjectStatusBadge } from '@/features/projects/components/dynamic/ProjectStatusBadge';

interface AdminProjectCardProps {
  project: DynamicProject;
  secret: string;
  sprintCount?: number;
  prCount?: number;
}

export function AdminProjectCard({
  project,
  secret,
  sprintCount = 0,
  prCount = 0,
}: AdminProjectCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300">
      {/* Clickable area → admin detail */}
      <Link
        href={`/admin/projects/${project.id}?secret=${secret}`}
        className="block p-5"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-2">
            {project.title}
          </h3>
          <ProjectStatusBadge status={project.status} />
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project.short_description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-foreground/8 text-foreground/70 text-xs border border-border"
            >
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
          <span>{sprintCount} Sprint{sprintCount !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>{prCount} PR{prCount !== 1 ? 's' : ''}</span>
        </div>
      </Link>

      {/* Footer: view public project */}
      <div className="px-5 pb-4 pt-0">
        <Link
          href={`/projects/${project.id}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <ExternalLink size={11} />
          View Project
        </Link>
      </div>
    </div>
  );
}
