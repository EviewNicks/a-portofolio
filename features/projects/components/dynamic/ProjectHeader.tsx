import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectHeaderProps {
  project: DynamicProject;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section data-testid="project-header" className="relative isolate mb-10 pt-6">
      <div className="mb-8">
        <span className="editorial-label">
          Case Study
          <span className="ix">· 01 / 08</span>
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="animate-editorial-reveal">
          <h1
            data-testid="project-title"
            className="editorial-display max-w-4xl text-4xl leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {project.title}
            <span className="dot">.</span>
          </h1>

          <p className="editorial-lead mt-6">
            {project.short_description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="editorial-meta inline-flex items-center gap-2">
              <span>Created</span>
              <span className="text-ink-soft">{formatDate(project.created_at)}</span>
            </span>
            {project.last_sync_at && (
              <span className="editorial-meta inline-flex items-center gap-2">
                <span>Last synced</span>
                <span className="text-ink-soft">{formatDate(project.last_sync_at)}</span>
              </span>
            )}
          </div>

          {project.tech_stack.length > 0 && (
            <div className="mt-8" aria-label="Technology stack">
              <span className="editorial-label mb-4">
                Tech Stack
                <span className="ix">· {project.tech_stack.length} technologies</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    data-testid="tech-tag"
                    className="editorial-code border border-line/40 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {project.github_repo_url && (
          <aside
            className="editorial-surface p-5 sm:p-6 animate-editorial-reveal"
            style={{ animationDelay: '90ms' }}
          >
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-line-soft pb-4">
              <span className="editorial-label">
                GitHub
                <span className="ix">· Stats</span>
              </span>
              {project.github_repo && (
                <span className="editorial-meta">github.com/{project.github_repo}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Metric label="Status" value={project.status} />
              <Metric label="Updated" value={formatDate(project.updated_at)} />
            </div>

            <Link
              href={project.github_repo_url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="github-link"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-3 font-editorial-mono text-xs text-ink-soft transition-colors hover:border-coral hover:bg-coral/5 hover:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
            >
              <Github size={16} aria-hidden="true" />
              View repository
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </aside>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line/40 bg-paper-warm/60 p-4">
      <div className="font-editorial-tight text-xl font-bold tracking-tight text-ink">{value}</div>
      <div className="mt-1 font-editorial-tight text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
