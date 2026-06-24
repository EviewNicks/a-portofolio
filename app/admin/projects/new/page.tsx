import { headers } from 'next/headers'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react'
import { AdminProjectForm } from '@/features/admin/components/AdminProjectForm'

interface NewProjectPageProps {
  searchParams: Promise<{
    secret?: string
  }>
}

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const headersList = await headers()
  const { secret: querySecret } = await searchParams
  const secret = headersList.get('x-admin-secret') ?? querySecret ?? ''

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
            <span className="text-foreground">Projects</span>
            <span className="text-primary">·</span>
            <span className="text-foreground">New Project</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="text-primary mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="bg-primary h-px w-5" />
                Admin / Project
                <span className="text-muted-foreground font-medium">· New entry</span>
              </div>
              <h1 className="font-editorial-tight text-foreground max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Create a{' '}
                <em className="font-editorial-serif font-medium tracking-[-0.02em] italic">
                  project
                </em>{' '}
                with a complete public story<span className="text-primary">.</span>
              </h1>
              <p className="font-editorial-body text-muted-foreground mt-6 max-w-3xl text-base leading-relaxed">
                Capture the header, markdown description, stack, repository, and
                metadata that the project detail page needs before a case study
                becomes visible.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/admin?secret=${encodeURIComponent(secret)}`}
                  className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all"
                >
                  Back to projects
                </Link>
                <Link
                  href="#project-submit-form"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-sm transition-all"
                >
                  Start basic info
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <aside
              className="border-line bg-bone text-ink shadow-shadow rounded-2xl border p-6 shadow-sm"
              aria-label="Project creation summary"
            >
              <div className="text-primary mb-6 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="bg-primary h-px w-5" />
                Brief
                <span className="text-muted-foreground font-medium">
                  · Required fields
                </span>
              </div>
              <div className="space-y-4">
                <BriefStat label="Title" value="Required" />
                <BriefStat label="Short description" value="220 chars" />
                <BriefStat label="Status" value="Visible badge" />
                <BriefStat label="Long description" value="Markdown" />
                <BriefStat label="Tech stack" value="Tag pills" />
                <BriefStat label="Repository" value="Optional URL" />
              </div>
              <div className="border-coral/20 bg-coral/5 text-muted-foreground mt-6 rounded-xl border p-4 text-sm leading-relaxed">
                Required fields keep the public project entry clear. Long
                description and tech stack are optional, but they make the case
                study easier to understand.
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
                New project editor · capture the public story before publishing
              </span>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary sm:flex">
              <CheckCircle2 size={14} />
              Admin
            </div>
          </div>

          <AdminProjectForm secret={secret} formId="project-submit-form" />
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
      <strong className="text-foreground text-sm">{value}</strong>
    </div>
  )
}
