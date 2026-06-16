'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { DynamicProject } from '@/features/projects/types'
import { ProjectStatusBadge } from '@/features/projects/components/dynamic/ProjectStatusBadge'

interface AdminProjectCardProps {
  project: DynamicProject
  secret: string
  sprintCount?: number
  prCount?: number
}

export function AdminProjectCard({
  project,
  secret,
  sprintCount = 0,
  prCount = 0,
}: AdminProjectCardProps) {
  return (
    <div className="group border-border bg-card hover:border-primary/30 relative rounded-xl border transition-all duration-300 hover:shadow-md">
      {/* Clickable area → unified detail with admin mode */}
      <Link
        href={`/projects/${project.id}?secret=${secret}`}
        className="block p-5"
      >
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-foreground group-hover:text-primary line-clamp-2 pr-2 text-base font-semibold transition-colors">
            {project.title}
          </h3>
          <ProjectStatusBadge status={project.status} />
        </div>

        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
          {project.short_description}
        </p>

        {/* Tech stack */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="bg-foreground/8 text-foreground/70 border-border rounded-md border px-2 py-0.5 text-xs"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="bg-foreground/5 text-muted-foreground border-border rounded-md border px-2 py-0.5 text-xs">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="text-muted-foreground/70 flex items-center gap-4 text-xs">
          <span>
            {sprintCount} Sprint{sprintCount !== 1 ? 's' : ''}
          </span>
          <span>•</span>
          <span>
            {prCount} PR{prCount !== 1 ? 's' : ''}
          </span>
        </div>
      </Link>

      {/* Footer: view public project */}
      <div className="px-5 pt-0 pb-4">
        <Link
          href={`/projects/${project.id}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="text-primary inline-flex items-center gap-1.5 text-xs hover:underline"
        >
          <ExternalLink size={11} />
          View Project
        </Link>
      </div>
    </div>
  )
}
