import Link from 'next/link'
import { ArrowUpRight, Cpu } from 'lucide-react'
import { getAllProjects } from '@/lib/supabase/queries/projects'
import type { DynamicProject, ProjectStatus } from '@/features/projects/types'

interface ProjectDetailFeaturedWorkProps {
  currentProjectId: string
}

function mapProject(project: Awaited<ReturnType<typeof getAllProjects>>[number]): DynamicProject {
  return {
    id: project.id,
    title: project.title,
    short_description: project.short_description,
    long_description: project.long_description ?? undefined,
    tech_stack: project.tech_stack,
    status: project.status as ProjectStatus,
    github_repo_url: project.github_repo_url ?? undefined,
    github_owner: project.github_owner ?? undefined,
    github_repo: project.github_repo ?? undefined,
    last_sync_at: project.last_sync_at?.toISOString() ?? undefined,
    created_at: project.created_at.toISOString(),
    updated_at: project.updated_at.toISOString(),
  }
}

export async function ProjectDetailFeaturedWork({
  currentProjectId,
}: ProjectDetailFeaturedWorkProps) {
  const rawProjects = await getAllProjects()
  const companionProjects = rawProjects
    .filter((project) => project.id !== currentProjectId)
    .slice(0, 2)
    .map(mapProject)

  const [primary, secondary] = companionProjects

  return (
    <section
      aria-label="Featured work"
      className="relative isolate mx-auto mb-20 mt-20 overflow-hidden rounded-[2rem] bg-ink px-4 py-16 text-paper shadow-2xl sm:px-6 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'><filter id=\'n2\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n2)\'/></svg>")',
          backgroundSize: '240px 240px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/20 pt-4">
          <span className="editorial-meta">Featured Work · 2026 Catalog</span>
          <span className="text-paper/70 font-editorial-serif italic">Edited by Ardiansyah</span>
          <span className="editorial-meta">004 / 006</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr_0.85fr] lg:items-center">
          <div className="animate-editorial-reveal">
            <span className="editorial-label text-coral before:bg-coral">
              Spotlight
              <span className="ix">· Featured</span>
            </span>
            <h2 className="editorial-display mt-6 max-w-2xl text-4xl leading-[1] text-paper sm:text-5xl lg:text-6xl">
              Skills that turn briefs into <em>memorable</em>, shippable <em>artifacts</em>
              <span className="dot">.</span>
            </h2>
            <p className="editorial-lead mt-6 max-w-sm text-paper/70">
              Companion projects that represent the same practice: precise systems, clear product thinking, and production-ready delivery.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-4 border-b-2 border-coral pb-3 text-sm font-medium text-paper transition-colors hover:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
            >
              Back to all projects
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <FeaturedCard
            project={primary}
            index="01 / 08"
            label="Featured project"
            category="AI"
            rotation="-rotate-[1.2deg]"
            hoverRotation="hover:-translate-y-1"
          />

          <FeaturedCard
            project={secondary}
            index="02 / 08"
            label="Companion system"
            category="Web"
            rotation="rotate-[2.4deg] translate-y-6"
            hoverRotation="hover:translate-y-4"
            compact
          />
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({
  project,
  index,
  label,
  category,
  rotation,
  hoverRotation,
  compact = false,
}: {
  project?: DynamicProject
  index: string
  label: string
  category: string
  rotation: string
  hoverRotation: string
  compact?: boolean
}) {
  if (!project) {
    return (
      <div
        className={[
          'rounded-2xl border border-line bg-paper p-6 text-ink shadow-sm',
          rotation,
          compact ? 'mt-6' : '',
        ].join(' ')}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-editorial-tight text-[0.65rem] font-bold uppercase tracking-[0.18em] text-coral">
            {label}
          </span>
          <span className="font-editorial-mono text-[0.68rem] tracking-[0.04em] text-ink-faint">
            {index}
          </span>
        </div>
        <h3 className="font-editorial-tight text-3xl font-extrabold leading-tight tracking-[-0.02em]">
          More work soon
        </h3>
        <p className="mt-4 font-editorial-body text-sm leading-relaxed text-ink-mute">
          Additional companion projects will appear here as the portfolio grows.
        </p>
        <div className="mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-line-soft bg-paper-warm">
          <div className="flex h-full items-center justify-center text-center font-editorial-mono text-xs uppercase tracking-[0.04em] text-ink-faint">
            <div className="flex items-center gap-3">
              <Cpu size={28} aria-hidden="true" />
              <span>Next case study</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      className={[
        'group block rounded-2xl bg-paper p-6 text-ink shadow-lg transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40',
        rotation,
        hoverRotation,
        compact ? 'mt-6' : '',
      ].join(' ')}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="font-editorial-tight text-[0.65rem] font-bold uppercase tracking-[0.18em] text-coral">
          {label}
        </span>
        <span className="font-editorial-mono text-[0.68rem] tracking-[0.04em] text-ink-faint">
          {index}
        </span>
      </div>

      <h3 className="font-editorial-tight text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
        {project.title}
      </h3>
      <p className="mt-4 max-w-sm font-editorial-body text-sm leading-relaxed text-ink-mute">
        {project.short_description}
      </p>

      <div className="mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-line-soft bg-paper-warm">
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-coral/10 via-paper to-ink/5 text-center font-editorial-mono text-xs uppercase tracking-[0.04em] text-ink-faint">
          <div className="flex items-center gap-3">
            <Cpu size={28} aria-hidden="true" />
            <span>{category} case study</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-editorial-tight text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
        <span className="text-coral font-semibold">2026 · {category}</span>
        <span>Case study</span>
      </div>
    </Link>
  )
}
