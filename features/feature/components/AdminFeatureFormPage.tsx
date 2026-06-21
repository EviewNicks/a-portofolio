'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  PlayCircle,
} from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'
import { FeatureForm, type FeatureFormDraft } from './FeatureForm'
import { FeatureMediaUpload } from './FeatureMediaUpload'

interface AdminFeatureFormPageProps {
  projectId: string
  secret: string
  featureId?: string
  initialFeature?: ProjectFeature | null
}

type FeatureFormMode = 'create' | 'edit'

const normalizeFeature = (feature: ProjectFeature): ProjectFeature => ({
  ...feature,
  media: feature.media ?? [],
})

export function AdminFeatureFormPage({
  projectId,
  secret,
  featureId,
  initialFeature,
}: AdminFeatureFormPageProps) {
  const router = useRouter()
  const mode: FeatureFormMode = featureId ? 'edit' : 'create'
  const [feature, setFeature] = useState<ProjectFeature | null>(
    initialFeature ? normalizeFeature(initialFeature) : null
  )
  const shouldLoadFeature = Boolean(featureId && !initialFeature)
  const [loadingFeature, setLoadingFeature] = useState(shouldLoadFeature)
  const [loadError, setLoadError] = useState('')
  const [draft, setDraft] = useState<FeatureFormDraft>({
    title: initialFeature?.title ?? '',
    description: initialFeature?.description ?? '',
    youtubeUrl: initialFeature?.youtube_url ?? '',
    demoUrl: initialFeature?.demo_url ?? '',
    techStack: initialFeature?.tech_stack ?? [],
  })

  const isCreate = mode === 'create'
  const pageTitle = isCreate ? 'Create Feature' : 'Edit Feature'
  const headingVerb = isCreate ? 'Create' : 'Refine'
  const breadcrumbFeatureLabel = isCreate ? 'New entry' : 'Edit entry'
  const inspectorTitle = isCreate
    ? 'Feature preview'
    : `Editing ${feature?.title ?? 'feature'}`
  const reduceMotion = useReducedMotion()
  const inspectorText = isCreate
    ? 'Start with a precise title. After saving, you will be taken to media gallery management for this feature.'
    : 'Review the existing feature details, update the public narrative, then manage screenshots in the visual gallery.'

  useEffect(() => {
    if (!featureId || initialFeature || feature) return

    let mounted = true

    fetch(`/api/projects/${projectId}/features/${featureId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load feature')
        return response.json()
      })
      .then(payload => {
        if (mounted) setFeature(normalizeFeature(payload.data))
      })
      .catch(() => {
        if (mounted)
          setLoadError(
            'Unable to load this feature. Please check the URL and try again.'
          )
      })
      .finally(() => {
        if (mounted) setLoadingFeature(false)
      })

    return () => {
      mounted = false
    }
  }, [feature, featureId, initialFeature, projectId])

  const completeness = useMemo(() => {
    const checks = [
      Boolean(draft.title.trim()),
      Boolean(draft.description.trim()),
      draft.techStack.length > 0,
      Boolean(feature?.media?.length),
    ]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [draft, feature?.media?.length])

  const handleSuccess = (savedFeature: ProjectFeature) => {
    const nextFeature = normalizeFeature(savedFeature)
    setFeature(nextFeature)

    if (isCreate) {
      router.push(
        `/admin/feature/${nextFeature.id}/edit?projectId=${projectId}&secret=${encodeURIComponent(secret)}`
      )
      return
    }

    const target = `/projects/${projectId}?secret=${encodeURIComponent(secret)}`
    router.push(`${target}&updated=1`)
  }

  const handleCancel = () => {
    router.push(`/projects/${projectId}?secret=${encodeURIComponent(secret)}`)
  }

  if (loadingFeature) {
    return (
      <div className="min-h-[60vh] py-24 text-center">
        <p className="text-muted-foreground text-sm">
          Loading feature details…
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-[60vh] py-24 text-center">
        <p className="text-sm text-red-500">{loadError}</p>
      </div>
    )
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
              href={`/projects/${projectId}?secret=${encodeURIComponent(secret)}`}
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <span className="text-primary">·</span>
            <span className="text-foreground">{pageTitle}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="text-primary mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="bg-primary h-px w-5" />
                Admin / Feature
                <span className="text-muted-foreground font-medium">
                  · {breadcrumbFeatureLabel}
                </span>
              </div>
              <h1 className="font-editorial-tight text-foreground max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {headingVerb} a{' '}
                <em className="font-editorial-serif font-medium tracking-[-0.02em] italic">
                  feature
                </em>{' '}
                that proves the system<span className="text-primary">.</span>
              </h1>
              <p className="font-editorial-body text-muted-foreground mt-6 max-w-3xl text-base leading-relaxed">
                {isCreate
                  ? 'Document a new Maguru capability before it becomes a public case-study detail page: title, proof points, demo links, stack, and implementation notes.'
                  : 'Update an existing showcase feature while keeping the public detail page clear, specific, and easy to maintain.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${projectId}?secret=${encodeURIComponent(secret)}`}
                  className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all"
                >
                  <ArrowLeft size={16} />
                  Back to project
                </Link>
                <Link
                  href="#implementation"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-sm transition-all"
                >
                  Start with implementation
                  <PlayCircle size={16} />
                </Link>
              </div>
            </div>

            <aside
              className="border-line bg-bone text-ink shadow-shadow rounded-2xl border p-6 shadow-sm"
              aria-label={`${pageTitle} summary`}
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
                <BriefStat label="Description" value="Required" />
                <BriefStat label="Media" value="After save" />
                <BriefStat label="Demo links" value="Optional" />
                <BriefStat label="Tech stack" value="Chips" />
              </div>
              <div className="border-coral/20 bg-coral/5 text-muted-foreground mt-6 rounded-xl border p-4 text-sm leading-relaxed">
                Required fields keep the public handoff complete. Media is
                managed after the feature has an ID, then stays editable from
                this page.
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div
              id="feature-form"
              className="border-line bg-bone text-ink shadow-shadow rounded-2xl border p-6 shadow-sm sm:p-8 lg:p-10"
            >
              <div className="border-border mb-8 flex items-center justify-between gap-4 border-b pb-6">
                <div>
                  <span className="editorial-label">
                    {isCreate ? 'New feature' : 'Feature editor'}
                  </span>
                  <h2 className="text-foreground mt-2 text-2xl font-bold">
                    {isCreate
                      ? 'Core feature details'
                      : 'Update feature details'}
                  </h2>
                </div>
                <div className="border-primary/20 bg-primary/5 text-primary hidden rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase sm:block">
                  {isCreate ? 'Create' : 'Edit'}
                </div>
              </div>

              <FeatureForm
                projectId={projectId}
                secret={secret}
                feature={feature}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
                onFormChange={setDraft}
              />

              {feature && feature.id ? (
                <motion.section
                  id="media-gallery"
                  className="border-line bg-bone text-ink shadow-shadow mt-10 rounded-2xl border p-6 shadow-sm sm:p-8 lg:p-10"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="border-line-soft mb-8 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                    <div>
                      <span className="editorial-label">Visual gallery</span>
                      <h2 className="text-ink mt-2 text-2xl font-bold">
                        Manage screenshots
                      </h2>
                    </div>
                    <div className="border-coral/20 bg-coral/5 text-ink-soft inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
                      <ImageIcon size={14} aria-hidden="true" />
                      Media
                    </div>
                  </div>

                  <p className="text-ink-mute mb-6 text-sm leading-7">
                    Upload, preview, reorder, and remove screenshots for the
                    public feature gallery. This section appears after the
                    feature has been saved because media needs a feature ID.
                  </p>

                  <FeatureMediaUpload
                    projectId={projectId}
                    featureId={feature.id}
                    secret={secret}
                    initialMedia={feature.media ?? []}
                    onClose={updatedMedia =>
                      setFeature(prev =>
                        prev ? { ...prev, media: updatedMedia } : prev
                      )
                    }
                  />
                </motion.section>
              ) : null}
            </div>

            <aside
              id="implementation"
              className="border-line bg-bone text-ink shadow-shadow sticky top-24 rounded-2xl border p-6 shadow-sm"
            >
              <div className="text-primary mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
                <span className="bg-primary h-px w-5" />
                Inspector
                <span className="text-muted-foreground font-medium">
                  · Live state
                </span>
              </div>
              <h3 className="text-foreground text-xl font-bold">
                {inspectorTitle}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {inspectorText}
              </p>

              <div className="border-line bg-paper mt-6 rounded-xl border p-4">
                <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs font-semibold tracking-[0.16em] uppercase">
                  <span>Completeness</span>
                  <strong className="text-foreground">{completeness}%</strong>
                </div>
                <div className="bg-line-soft h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all"
                >
                  <ArrowLeft size={16} />
                  Cancel and return
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById('feature-form')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                >
                  <CheckCircle2 size={16} />
                  Review readiness
                </button>
              </div>
            </aside>
          </div>
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
