import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react'
import { AdminProjectForm } from '@/features/admin/components/AdminProjectForm'
import { getProjectById } from '@/lib/supabase/queries/projects'
import type { DynamicProject, ProjectStatus } from '@/features/projects/types'

interface EditProjectPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    secret?: string
  }>
}

function normalizeProject(
  project: Awaited<ReturnType<typeof getProjectById>>
): DynamicProject | null {
  if (!project) return null

  return {
    ...project,
    long_description: project.long_description ?? undefined,
    github_repo_url: project.github_repo_url ?? undefined,
    github_owner: project.github_owner ?? undefined,
    github_repo: project.github_repo ?? undefined,
    last_sync_at: project.last_sync_at?.toISOString() ?? undefined,
    created_at: project.created_at.toISOString(),
    updated_at: project.updated_at.toISOString(),
    tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
    status: project.status as ProjectStatus,
  }
}

export default async function EditProjectPage({
  params,
  searchParams,
}: EditProjectPageProps) {
  const headersList = await headers()
  const { id } = await params
  const { secret: querySecret } = await searchParams
  const secret = headersList.get('x-admin-secret') ?? querySecret ?? ''

  const project = normalizeProject(await getProjectById(id))
  if (!project) {
    notFound()
  }

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(251,146,60,0.08),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(96,165,250,0.06),transparent_32%)]" />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-muted-foreground mb-7 flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
            <Link
              href={`/admin?secret=${encodeURIComponent(secret)}`}
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-primary">·</span>
            <Link
              href={`/admin?secret=${encodeURIComponent(secret)}`}
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <span className="text-primary">·</span>
            <span className="text-foreground">Edit Project</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="text-primary mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="bg-primary h-px w-5" />
                Admin / Project
                <span className="text-muted-foreground font-medium">
                  · Refine entry
                </span>
              </div>
              <h1 className="font-editorial-tight text-foreground max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Refine the{' '}
                <em className="font-editorial-serif font-medium tracking-[-0.02em] italic">
                  public story
                </em>{' '}
                for <span className="text-primary">{project.title}</span>.
              </h1>
              <p className="font-editorial-body text-muted-foreground mt-6 max-w-3xl text-base leading-relaxed">
                Update the project header, markdown description, stack,
                repository, and status while keeping the public detail page
                clear, specific, and easy to maintain.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${id}?secret=${encodeURIComponent(secret)}`}
                  className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all"
                >
                  View public project
                </Link>
                <Link
                  href="#project-submit-form"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-sm transition-all"
                >
                  Start editing
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <aside
              className="border-line bg-bone text-ink shadow-shadow rounded-2xl border p-6 shadow-sm"
              aria-label="Project editing summary"
            >
              <div className="text-primary mb-6 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="bg-primary h-px w-5" />
                Brief
                <span className="text-muted-foreground font-medium">
                  · Current entry
                </span>
              </div>
              <div className="space-y-4">
                <BriefStat label="Title" value={project.title} />
                <BriefStat label="Short description" value={`${project.short_description.length} chars`} />
                <BriefStat label="Status" value={project.status} />
                <BriefStat label="Tech stack" value={`${project.tech_stack.length} items`} />
                <BriefStat label="Repository" value={project.github_repo_url ? 'Linked' : 'Not set'} />
              </div>
              <div className="border-coral/20 bg-coral/5 text-muted-foreground mt-6 rounded-xl border p-4 text-sm leading-relaxed">
                Review the existing project details, improve the public
                narrative, then save the updated metadata.
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-line bg-bone/70 p-4 text-sm text-muted-foreground backdrop-blur-md">
            <div className="flex items-center gap-3">
              <FileText className="text-primary" size={18} />
              <span>
                Project editor · update metadata and public-facing copy
              </span>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary sm:flex">
              <CheckCircle2 size={14} />
              Editing
            </div>
          </div>

          <AdminProjectForm secret={secret} project={project} formId="project-submit-form" />
        </div>
      </section>
    </div>
  )
}

function BriefStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border flex items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
        {label}
      </span>
      <strong className="truncate text-foreground text-sm">{value}</strong>
    </div>
  )
}
