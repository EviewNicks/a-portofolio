import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Pencil,
  Star,
} from 'lucide-react'
import type { ProjectFeature, ProjectStatus } from '@/features/projects/types'
// import { EditorialNavbar } from '@/components/layout/EditorialNavbar'
import { FeatureMediaGallery } from './FeatureMediaGallery'
import { YouTubeEmbed } from './YouTubeEmbed'
import { MarkdownContent } from './MarkdownContent'

interface FeatureDetailProps {
  projectId: string
  projectTitle: string
  projectStatus?: ProjectStatus
  feature: ProjectFeature
  featureIndex: number
  featureCount: number
  secret?: string
}

const CONTACT_EMAIL = 'contact@ardiansyah.dev'

function formatSectionNumber(index: number, total: number) {
  return `${String(index).padStart(3, '0')} / ${String(total).padStart(3, '0')}`
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return '—'
  }
}

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*_~`>\[\]\(\)]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getLead(feature: ProjectFeature) {
  if (feature.short_description) {
    return feature.short_description
  }

  if (!feature.description) {
    return 'Technical implementation breakdown for this portfolio feature.'
  }

  const text = stripMarkdown(feature.description)
  return text.length > 178 ? `${text.slice(0, 175)}…` : text
}

function getStatusLabel(status?: ProjectStatus) {
  switch (status) {
    case 'active':
      return 'Active'
    case 'maintenance':
      return 'Maintained'
    case 'archived':
      return 'Archived'
    default:
      return 'Completed'
  }
}

function getStatusClass(status?: ProjectStatus) {
  switch (status) {
    case 'active':
      return 'text-olive bg-olive/10'
    case 'maintenance':
      return 'text-mustard bg-mustard/15'
    case 'archived':
      return 'text-ink-faint bg-ink/5'
    default:
      return 'text-olive bg-olive/10'
  }
}

function SectionRule({
  roman,
  eyebrow,
  title,
  count,
}: {
  roman: string
  eyebrow: string
  title: string
  count: string
}) {
  return (
    <div className="editorial-meta border-line mb-12 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <span className="font-editorial-serif text-coral">{roman}</span>
      <span>
        <span>{eyebrow}</span>
        <span className="text-coral mx-2">·</span>
        <span>{title}</span>
      </span>
      <span>{count}</span>
    </div>
  )
}

export function FeatureDetail({
  projectId,
  projectTitle,
  projectStatus,
  feature,
  featureIndex,
  featureCount,
  secret,
}: FeatureDetailProps) {
  const backUrl = `/projects/${projectId}${secret ? `?secret=${encodeURIComponent(secret)}` : ''}`
  const editFeatureUrl = secret
    ? `/admin/feature/${feature.id}/edit?projectId=${projectId}&secret=${encodeURIComponent(secret)}`
    : ''
  const hasMedia = feature.media && feature.media.length > 0
  const statusLabel = getStatusLabel(projectStatus)
  const statusClass = getStatusClass(projectStatus)
  const sectionCount = featureCount || 1
  const romanSections = ['I.', 'II.', 'III.', 'IV.', 'V.']
  const lead = getLead(feature)

  return (
    <div className="relative z-10">
      {/* <EditorialNavbar pageTitle={feature.title} showSideText={true} /> */}

      <section className="border-line border-b px-16 pt-8">
        <div className="mx-auto max-w-340 pb-6">
          <Link
            href={backUrl}
            className="font-editorial-tight text-ink-soft hover:text-coral inline-flex items-center gap-2.5 py-2.5 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Project details</span>
          </Link>

          <nav
            className="editorial-meta mt-2 flex flex-wrap items-center gap-2"
            aria-label="Breadcrumb"
          >
            <Link
              key="breadcrumb-home"
              href="/"
              className="hover:text-coral transition-colors"
            >
              Home
            </Link>
            <span className="text-coral">·</span>
            <Link
              href="/projects"
              className="hover:text-coral transition-colors"
            >
              Work
            </Link>
            <span className="text-coral">·</span>
            <Link href={backUrl} className="hover:text-coral transition-colors">
              {projectTitle}
            </Link>
            <span className="text-coral">·</span>
            <span className="text-ink">{feature.title}</span>
          </nav>

          {secret && (
            <div className="border-border mt-6 flex flex-wrap items-center gap-3 rounded-2xl border bg-amber-500/5 p-3 shadow-sm">
              <span className="text-muted-foreground mr-1 text-xs font-semibold tracking-[0.14em] uppercase">
                Admin
              </span>
              <Link
                href={editFeatureUrl}
                className="bg-background hover:bg-muted border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-all"
              >
                <Pencil size={14} />
                Edit Feature
              </Link>
              <Link
                href={backUrl}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition-colors"
              >
                Cancel
              </Link>
            </div>
          )}
        </div>
      </section>

      <article>
        <section className="px-16 py-20">
          <div className="mx-auto max-w-340">
            <SectionRule
              roman={romanSections[0]}
              eyebrow="Feature / Detail"
              title={feature.title}
              count={formatSectionNumber(featureIndex, sectionCount)}
            />

            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1.2fr_1fr]">
              <div className="animate-editorial-reveal">
                <span className="editorial-label">
                  Feature Detail<span className="ix">· {feature.title}</span>
                </span>
                <h1 className="editorial-display mt-6 text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-[clamp(3.25rem,7vw,5.75rem)]">
                  {feature.title}
                  <span className="dot">.</span>
                </h1>
                <p className="editorial-lead mt-8">{lead}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span
                    className={`font-editorial-tight inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.6875rem] font-bold tracking-[0.12em] uppercase ${statusClass}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {statusLabel}
                  </span>
                  {feature.is_featured && (
                    <span className="bg-coral/10 font-editorial-tight text-coral inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.6875rem] font-bold tracking-[0.12em] uppercase">
                      <Star size={12} className="fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                {feature.youtube_url && (
                  <Link
                    href={feature.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-line bg-paper hover:border-coral/60 hover:text-coral mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors"
                  >
                    Watch demo on YouTube
                    <ExternalLink size={14} />
                  </Link>
                )}
              </div>

              <aside
                className="editorial-surface editorial-shadow animate-editorial-reveal rounded-2xl p-8 lg:justify-self-end"
                style={{ animationDelay: '120ms' }}
              >
                <span className="editorial-label">
                  Overview<span className="ix">· Metadata</span>
                </span>

                <div className="divide-line-soft border-line-soft mt-6 divide-y border-y">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="editorial-meta">Status</span>
                    <span className="font-editorial-tight text-ink text-sm font-medium">
                      {statusLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="editorial-meta">Featured</span>
                    <span className="font-editorial-tight text-coral text-sm font-medium">
                      {feature.is_featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="editorial-meta">Project</span>
                    <span className="font-editorial-tight text-ink text-sm font-medium">
                      {projectTitle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="editorial-meta">Order</span>
                    <span className="font-editorial-tight text-ink text-sm font-medium">
                      {formatSectionNumber(featureIndex, sectionCount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="editorial-meta">Last updated</span>
                    <span className="font-editorial-tight text-ink text-sm font-medium">
                      {formatDate(feature.updated_at)}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {hasMedia && (
          <section id="gallery" className="px-16 py-20">
            <div className="mx-auto max-w-340">
              <SectionRule
                roman={romanSections[1]}
                eyebrow="Gallery / Screenshots"
                title="Visual assets"
                count={formatSectionNumber(2, sectionCount)}
              />
              <div className="animate-editorial-reveal mb-8">
                <span className="editorial-label">
                  Visual Gallery<span className="ix">· Screenshots</span>
                </span>
              </div>
              <div
                className="animate-editorial-reveal"
                style={{ animationDelay: '120ms' }}
              >
                <FeatureMediaGallery media={feature.media || []} />
              </div>
            </div>
          </section>
        )}

        {feature.youtube_url && (
          <section id="video" className="px-16 py-20">
            <div className="mx-auto max-w-340">
              <SectionRule
                roman={romanSections[2]}
                eyebrow="Video / Demonstration"
                title="Walkthrough"
                count={formatSectionNumber(3, sectionCount)}
              />
              <div className="animate-editorial-reveal mb-8">
                <span className="editorial-label">
                  Video Demonstration<span className="ix">· Walkthrough</span>
                </span>
              </div>
              <div
                className="animate-editorial-reveal"
                style={{ animationDelay: '120ms' }}
              >
                <YouTubeEmbed url={feature.youtube_url} title={feature.title} />
              </div>
            </div>
          </section>
        )}

        <section id="implementation" className="px-16 py-20">
          <div className="mx-auto max-w-340">
            <SectionRule
              roman={romanSections[3]}
              eyebrow="Implementation / Details"
              title="Technical breakdown"
              count={formatSectionNumber(
                hasMedia && feature.youtube_url
                  ? 4
                  : feature.youtube_url
                    ? 3
                    : 2,
                sectionCount
              )}
            />
            <div className="animate-editorial-reveal mb-8">
              <span className="editorial-label">
                Implementation Details<span className="ix">· Technical</span>
              </span>
            </div>

            <div
              className="editorial-surface editorial-shadow animate-editorial-reveal relative rounded-2xl p-8 md:p-12 lg:p-16"
              style={{ animationDelay: '120ms' }}
            >
              {feature.description ? (
                <MarkdownContent content={feature.description} />
              ) : (
                <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
                  <FileText className="text-line" size={48} strokeWidth={1.5} />
                  <p className="font-editorial-body text-ink-faint text-base">
                    No implementation description available for this feature.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="px-16 py-20">
          <div className="mx-auto max-w-340">
            <SectionRule
              roman={romanSections[4]}
              eyebrow="Contact / Conversation"
              title="Start a dialogue"
              count={formatSectionNumber(sectionCount, sectionCount)}
            />
            <div className="editorial-surface editorial-shadow relative overflow-hidden rounded-[2rem] p-12 md:p-20 lg:p-24">
              <div className="animate-editorial-reveal">
                <span className="editorial-label">
                  Start a conversation<span className="ix">· Contact</span>
                </span>
                <h2 className="editorial-display mt-6 max-w-5xl text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-[clamp(3.25rem,7vw,5.75rem)]">
                  Let&apos;s build something <em>essential</em> and{' '}
                  <em>precise</em>
                  <span className="dot">.</span>
                </h2>
                <p className="editorial-lead mt-8 max-w-2xl">
                  The future is not just AI. It is AI, engineered with
                  precision. Connect for a technical audit, portfolio review, or
                  production web system.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="bg-coral font-editorial-tight shadow-coral/20 inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#e25e4a] active:scale-[0.98]"
                  >
                    Connect for audit
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="border-line font-editorial-tight text-ink hover:border-coral hover:bg-ink/5 hover:text-coral inline-flex items-center justify-center gap-3 rounded-full border px-5 py-4 text-sm font-medium transition-colors"
                  >
                    {CONTACT_EMAIL}
                    <span className="bg-ink text-paper flex h-7 w-7 items-center justify-center rounded-full">
                      →
                    </span>
                  </Link>
                </div>

                <div className="editorial-meta border-line mt-8 flex flex-wrap items-center gap-6 border-t pt-6">
                  <span className="text-coral">Available for engagement</span>
                  <span>MMXXVI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-line border-t px-16 pt-16 pb-10">
          <div className="mx-auto grid max-w-340 grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <div>
              <Link
                key="footer-home"
                href="/"
                className="font-editorial-tight text-ink mb-5 flex items-center gap-3.5 text-lg font-bold tracking-[-0.01em]"
              >
                <span className="border-ink font-editorial-serif flex h-9 w-9 items-center justify-center rounded-full border text-base italic">
                  A
                </span>
                Ardiansyah
              </Link>
              <p className="font-editorial-body text-ink-mute text-sm leading-6">
                Precision AI & Web solutions. Engineering the essential — from
                deep AI research to production-grade web systems.
              </p>
            </div>

            <FooterColumn
              title="Studio"
              links={[
                ['About', '/'],
                ['Capabilities', '/#capabilities'],
                ['Labs', '/#labs'],
                ['Method', '/#method'],
              ]}
            />
            <FooterColumn
              title="Work"
              links={[
                ['All projects', '/projects'],
                ['AI / Research', '/projects'],
                ['Web / System', '/projects'],
              ]}
            />
            <FooterColumn
              title="Connect"
              links={[
                ['Email', `mailto:${CONTACT_EMAIL}`],
                ['LinkedIn', '#'],
                ['GitHub', '#'],
              ]}
            />
            <FooterColumn
              title="Resources"
              links={[
                ['Resume', '#'],
                ['PDF Portfolio', '#'],
                ['Blog', '#'],
              ]}
            />
          </div>

          <div className="editorial-meta border-line mx-auto mt-16 flex max-w-340 items-center justify-between border-t pt-6">
            <span>
              <span className="editorial-pulse mr-1.5 inline-block h-1.5 w-1.5 p-0" />
              © MMXXVI Ardiansyah. Engineering the Essential.
            </span>
            <div className="flex items-center gap-6">
              <span>Apache-2.0</span>
              <span>v1.0.0</span>
            </div>
          </div>

          <div className="border-line mx-auto mt-16 max-w-340 overflow-hidden border-t pt-12 pb-3">
            <p className="font-editorial-tight text-ink text-[clamp(4rem,13vw,13rem)] leading-[0.9] font-black tracking-[-0.06em] whitespace-nowrap">
              <em className="font-editorial-serif text-coral">Ardiansyah</em>.
            </p>
          </div>
        </footer>
      </article>
    </div>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<[string, string]>
}) {
  return (
    <div>
      <h5 className="editorial-meta mb-4">{title}</h5>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            {href.startsWith('mailto:') || href === '#' ? (
              <a
                href={href}
                className="font-editorial-body text-ink-soft hover:text-coral text-sm transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                href={href}
                className="font-editorial-body text-ink-soft hover:text-coral text-sm transition-colors"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
