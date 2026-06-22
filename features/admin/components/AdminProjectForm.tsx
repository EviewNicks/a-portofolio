'use client'

import { useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Github,
  Link2,
  Pencil,
  RotateCcw,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { DynamicProject, ProjectStatus } from '@/features/projects/types'

interface AdminProjectFormProps {
  secret: string
  project?: DynamicProject
  formId?: string
}

const STATUS_OPTIONS: ProjectStatus[] = ['active', 'maintenance', 'archived']

const STATUS_META: Record<
  ProjectStatus,
  {
    label: string
    selected: string
    preview: string
  }
> = {
  active: {
    label: 'Active',
    selected: 'border-olive/40 bg-olive/10 text-olive',
    preview: 'border-olive/20 bg-olive/10 text-olive',
  },
  maintenance: {
    label: 'Maintenance',
    selected: 'border-mustard/40 bg-mustard/15 text-mustard',
    preview: 'border-mustard/20 bg-mustard/15 text-mustard',
  },
  archived: {
    label: 'Archived',
    selected: 'border-line bg-ink/5 text-ink-faint',
    preview: 'border-line bg-ink/5 text-ink-faint',
  },
}

const FIELD_IDS = {
  title: 'project-title',
  shortDesc: 'project-short-description',
  longDesc: 'project-long-description',
  githubUrl: 'project-github-url',
  techInput: 'project-tech-input',
} as const

const SHORT_DESCRIPTION_LIMIT = 220
const LONG_DESCRIPTION_LIMIT = 4000

export function AdminProjectForm({
  secret,
  project,
  formId = 'project-submit-form',
}: AdminProjectFormProps) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const titleRef = useRef<HTMLInputElement>(null)
  const shortDescRef = useRef<HTMLInputElement>(null)
  const longDescRef = useRef<HTMLTextAreaElement>(null)
  const githubUrlRef = useRef<HTMLInputElement>(null)
  const techInputRef = useRef<HTMLInputElement>(null)

  const isEdit = Boolean(project)
  const [title, setTitle] = useState(project?.title ?? '')
  const [shortDesc, setShortDesc] = useState(project?.short_description ?? '')
  const [longDesc, setLongDesc] = useState(project?.long_description ?? '')
  const [githubUrl, setGithubUrl] = useState(project?.github_repo_url ?? '')
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? 'active'
  )
  const [techStack, setTechStack] = useState<string[]>(project?.tech_stack ?? [])
  const [tagInput, setTagInput] = useState('')
  const [markdownView, setMarkdownView] = useState<'edit' | 'preview'>('edit')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const previewText = useMemo(() => {
    if (!title.trim()) {
      return 'Start with a precise title. The public detail page will use this copy as the first impression.'
    }

    const stack = techStack.length ? ` Stack: ${techStack.join(', ')}.` : ''
    return `${title.trim()} · ${shortDesc.trim() || 'Add a concise short description.'}${stack}`
  }, [shortDesc, techStack, title])

  const completeness = useMemo(() => {
    const checks = [
      title.trim().length >= 3,
      shortDesc.trim().length >= 20,
      longDesc.trim().length >= 80,
      techStack.length > 0,
      /^https?:\/\//i.test(githubUrl.trim()),
    ]

    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [githubUrl, longDesc, shortDesc, techStack.length, title])

  const payloadPreview = useMemo(
    () =>
      JSON.stringify(
        {
          title: title.trim(),
          short_description: shortDesc.trim(),
          long_description: longDesc.trim() || undefined,
          github_repo_url: githubUrl.trim() || undefined,
          status,
          tech_stack: techStack,
        },
        null,
        2
      ),
    [githubUrl, longDesc, shortDesc, status, techStack, title]
  )

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !techStack.some(item => item.toLowerCase() === tag.toLowerCase())) {
      setTechStack(prev => [...prev, tag])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setTechStack(prev => prev.filter(t => t !== tag))
  }

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!title.trim()) {
      nextErrors.title = 'Project title is required.'
    } else if (title.trim().length < 3) {
      nextErrors.title = 'Use at least 3 characters for the project title.'
    }

    if (!shortDesc.trim()) {
      nextErrors.shortDesc = 'Short description is required.'
    } else if (shortDesc.trim().length < 20) {
      nextErrors.shortDesc =
        'Add a short description with at least 20 characters so visitors understand the project.'
    }

    if (longDesc.trim().length > LONG_DESCRIPTION_LIMIT) {
      nextErrors.longDesc = `Keep the long description under ${LONG_DESCRIPTION_LIMIT} characters.`
    }

    if (
      githubUrl.trim() &&
      !/^https?:\/\/github\.com\/[^/]+\/[^/]+\/?$/i.test(githubUrl.trim())
    ) {
      nextErrors.githubUrl =
        'Use a full GitHub repository URL, for example https://github.com/owner/repo.'
    }

    return nextErrors
  }

  const focusFirstError = (nextErrors: Record<string, string>) => {
    const firstErrorKey = Object.keys(nextErrors)[0]
    if (!firstErrorKey) return

    const refMap = {
      title: titleRef,
      shortDesc: shortDescRef,
      longDesc: longDescRef,
      githubUrl: githubUrlRef,
      techInput: techInputRef,
    }

    requestAnimationFrame(() => {
      refMap[firstErrorKey as keyof typeof refMap].current?.focus()
    })
  }

  const buildPayload = () => ({
    title: title.trim(),
    short_description: shortDesc.trim(),
    long_description: longDesc.trim() || undefined,
    github_repo_url: githubUrl.trim() || undefined,
    status,
    tech_stack: techStack,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setSaving(true)
    try {
      const url = isEdit
        ? `/api/projects/${project!.id}?secret=${secret}`
        : `/api/projects?secret=${secret}`
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors({ global: data.error ?? 'Failed to save project.' })
        return
      }

      const saved = await res.json()
      const projectId = saved?.data?.id ?? saved?.id
      router.push(`/projects/${projectId}?secret=${secret}&${isEdit ? 'updated' : 'created'}=1`)
    } catch {
      setErrors({ global: 'Network error. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <form
        id={formId}
        data-testid="project-form"
        onSubmit={handleSubmit}
        className="border-line bg-bone text-ink shadow-shadow rounded-2xl border p-6 shadow-sm sm:p-8 lg:p-10"
        noValidate
      >
        {errors.global && (
          <motion.div
            role="alert"
            initial={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="border-destructive/30 bg-destructive/10 text-destructive mb-8 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm"
          >
            <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            <span>{errors.global}</span>
          </motion.div>
        )}

        {Object.keys(errors).some(key => key !== 'global') && (
          <div
            role="alert"
            className="border-coral/30 bg-coral/5 text-ink-soft mb-8 rounded-xl border p-4 text-sm"
          >
            <p className="font-semibold">Complete the highlighted fields first.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(errors)
                .filter(([key]) => key !== 'global')
                .map(([key, message]) => (
                  <a
                    key={key}
                    href={`#${FIELD_IDS[key as keyof typeof FIELD_IDS]}`}
                    className="border-coral/20 bg-paper hover:bg-paper-warm text-coral rounded-full border px-3 py-1.5 text-xs transition-colors"
                  >
                    {getFieldLabel(key)}
                    <span className="sr-only">: {message}</span>
                  </a>
                ))}
            </div>
          </div>
        )}

        <FormSection
          title="I. Basic information"
          description="Header copy and status that appear immediately on the public project detail page."
          delay={0}
          reduceMotion={reduceMotion}
        >
          <div className="grid gap-6">
            <Field
              id={FIELD_IDS.title}
              label="Project title"
              required
              error={errors.title}
              hint="Use the public project name; keep the repository name separate."
            >
              <Input
                ref={titleRef}
                type="text"
                value={title}
                onChange={e => {
                  setTitle(e.target.value)
                  if (errors.title) setErrors(prev => ({ ...prev, title: '' }))
                }}
                placeholder="Maguru – Sistem Manajemen Penyewaan Pakaian"
                data-testid="input-title"
                aria-invalid={Boolean(errors.title)}
                aria-describedby="project-title-error project-title-help"
                className={cn(
                  'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
                  fieldClass(errors.title)
                )}
                required
              />
              <FieldError id="project-title-error">{errors.title}</FieldError>
            </Field>

            <Field
              id={FIELD_IDS.shortDesc}
              label="Short description"
              required
              error={errors.shortDesc}
              hint="Kalimat ringkas untuk tampilan kartu dan ringkasan publik."
              labelAccessory={
                <span
                  className={cn(
                    'font-editorial-mono text-xs',
                    shortDesc.length > SHORT_DESCRIPTION_LIMIT
                      ? 'text-coral'
                      : 'text-ink-faint'
                  )}
                >
                  {shortDesc.length}/{SHORT_DESCRIPTION_LIMIT}
                </span>
              }
            >
              <Input
                ref={shortDescRef}
                type="text"
                value={shortDesc}
                onChange={e => {
                  setShortDesc(e.target.value)
                  if (errors.shortDesc)
                    setErrors(prev => ({ ...prev, shortDesc: '' }))
                }}
                placeholder="Maguru mengelola stok, transaksi, dan akses role-based untuk bisnis rental pakaian UMKM."
                data-testid="input-short-desc"
                aria-invalid={Boolean(errors.shortDesc)}
                aria-describedby="project-short-description-error project-short-description-help"
                className={cn(
                  'bg-paper text-ink focus-visible:bg-paper-warm min-h-12 rounded-xl px-4 py-3 transition-colors',
                  fieldClass(errors.shortDesc)
                )}
                maxLength={SHORT_DESCRIPTION_LIMIT}
                required
              />
              <FieldError id="project-short-description-error">
                {errors.shortDesc}
              </FieldError>
            </Field>

            <Field
              id="project-status"
              label="Status"
              required
              hint="The badge preview updates with the selected project state."
            >
              <StatusSegmented
                status={status}
                onChange={setStatus}
                onStatusChange={() => setErrors(prev => ({ ...prev, status: '' }))}
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title="II. Long description"
          description="Markdown body for problem, features, architecture, results, and testing notes."
          delay={1}
          reduceMotion={reduceMotion}
        >
          <Field
            id={FIELD_IDS.longDesc}
            label="Long description"
            error={errors.longDesc}
            hint="Gunakan mode Edit only untuk menulis, atau Preview only untuk membaca hasil Markdown."
            labelAccessory={
              <span
                className={cn(
                  'font-editorial-mono text-xs',
                  longDesc.length > LONG_DESCRIPTION_LIMIT
                    ? 'text-coral'
                    : 'text-ink-faint'
                )}
              >
                {longDesc.length}/{LONG_DESCRIPTION_LIMIT}
              </span>
            }
          >
            <div className="border-line overflow-hidden rounded-2xl border bg-paper">
              <div className="border-line-soft flex gap-2 border-b bg-bone/60 p-2">
                <button
                  type="button"
                  onClick={() => setMarkdownView('edit')}
                  className={cn(
                    'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                    markdownView === 'edit'
                      ? 'bg-ink text-paper'
                      : 'text-ink-soft hover:bg-paper-warm'
                  )}
                >
                  Edit only
                </button>
                <button
                  type="button"
                  onClick={() => setMarkdownView('preview')}
                  className={cn(
                    'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                    markdownView === 'preview'
                      ? 'bg-ink text-paper'
                      : 'text-ink-soft hover:bg-paper-warm'
                  )}
                >
                  Preview only
                </button>
              </div>

              <div className={markdownView === 'preview' ? 'hidden' : undefined}>
                <Textarea
                  ref={longDescRef}
                  value={longDesc}
                  onChange={e => {
                    setLongDesc(e.target.value)
                    if (errors.longDesc)
                      setErrors(prev => ({ ...prev, longDesc: '' }))
                  }}
                  placeholder="## Masalah yang diselesaikan&#10;&#10;Bisnis rental baju UMKM sering kesulitan mengelola stok, transaksi, status barang, dan pemisahan akses antar peran."
                  data-testid="input-long-desc"
                  rows={10}
                  aria-invalid={Boolean(errors.longDesc)}
                  aria-describedby="project-long-description-error project-long-description-help"
                  className={cn(
                    'font-editorial-mono bg-paper text-ink focus-visible:bg-paper-warm min-h-80 resize-y rounded-none border-0 px-5 py-5 transition-colors',
                    fieldClass(errors.longDesc)
                  )}
                  maxLength={LONG_DESCRIPTION_LIMIT}
                />
              </div>

              <div className={markdownView === 'edit' ? 'hidden' : undefined}>
                <MarkdownPreview content={longDesc} />
              </div>
            </div>
            <FieldError id="project-long-description-error">
              {errors.longDesc}
            </FieldError>
          </Field>
        </FormSection>

        <FormSection
          title="III. Technical details"
          description="Stack pills and repository metadata used by the description tab."
          delay={2}
          reduceMotion={reduceMotion}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Field
              id={FIELD_IDS.techInput}
              label="Tech stack"
              error={errors.techInput}
              hint="Use Enter or comma to add a pill. Remove pills when the project no longer uses a technology."
            >
              <div
                data-testid="tech-stack-tags"
                className={cn(
                  'border-line bg-paper focus-within:border-coral/50 hover:border-coral/30 min-h-14 flex flex-wrap gap-2 rounded-xl border p-3 transition-colors'
                )}
              >
                {techStack.map(tag => (
                  <span
                    key={tag}
                    data-testid="tech-stack-tag"
                    className="border-line bg-bone text-ink-soft inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-coral hover:text-coral/80 transition-colors"
                      aria-label={`Remove ${tag}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  ref={techInputRef}
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={techStack.length ? 'Add stack item…' : 'Type a stack item, then press Enter'}
                  data-testid="input-tech-tag"
                  className="min-w-[160px] flex-1 bg-transparent text-sm outline-none placeholder:text-ink-faint"
                  aria-describedby="project-tech-input-help"
                />
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={addTag}
                  data-testid="btn-add-tag"
                  className="border-line text-ink-soft hover:border-coral/40 hover:text-coral inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  Add tag
                </button>
                {techStack.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setTechStack([])}
                    className="border-line text-muted-foreground hover:border-destructive/40 hover:text-destructive inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <FieldError id="project-tech-input-error">{errors.techInput}</FieldError>
            </Field>

            <Field
              id={FIELD_IDS.githubUrl}
              label="GitHub repository URL"
              error={errors.githubUrl}
              hint="Optional, but recommended. Must be a full http or https GitHub URL."
            >
              <div className="relative">
                <Link2
                  size={16}
                  className="text-ink-faint absolute top-1/2 left-4 -translate-y-1/2"
                />
                <Input
                  ref={githubUrlRef}
                  type="url"
                  value={githubUrl}
                  onChange={e => {
                    setGithubUrl(e.target.value)
                    if (errors.githubUrl)
                      setErrors(prev => ({ ...prev, githubUrl: '' }))
                  }}
                  placeholder="https://github.com/owner/repo"
                  data-testid="input-github-url"
                  aria-invalid={Boolean(errors.githubUrl)}
                  aria-describedby="project-github-url-error project-github-url-help"
                  className={cn(
                    'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl pl-11 pr-4 py-3 transition-colors',
                    fieldClass(errors.githubUrl)
                  )}
                />
              </div>
              <FieldError id="project-github-url-error">
                {errors.githubUrl}
              </FieldError>
            </Field>
          </div>
        </FormSection>

        <div className="border-line-soft mt-10 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => document.getElementById(formId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all"
          >
            <RotateCcw size={16} />
            Review from top
          </button>
          <button
            type="button"
            onClick={handleCancel}
            data-testid="btn-cancel"
            className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all"
          >
            Cancel and return
          </button>
        </div>
      </form>

      <Inspector
        formId={formId}
        title={isEdit ? `Editing ${project?.title ?? 'project'}` : 'Project preview'}
        text={
          isEdit
            ? 'Review the existing project details, update the public narrative, then save the updated metadata.'
            : 'Start with a precise title. The public detail page will use this copy as the first impression.'
        }
        previewText={previewText}
        status={status}
        completeness={completeness}
        payloadPreview={payloadPreview}
        saving={saving}
        onReview={() =>
          document.getElementById(formId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        onCancel={handleCancel}
        reduceMotion={reduceMotion}
      />
    </div>
  )
}

function Inspector({
  formId,
  title,
  text,
  previewText,
  status,
  completeness,
  payloadPreview,
  saving,
  onReview,
  onCancel,
  reduceMotion,
}: {
  formId: string
  title: string
  text: string
  previewText: string
  status: ProjectStatus
  completeness: number
  payloadPreview: string
  saving: boolean
  onReview: () => void
  onCancel: () => void
  reduceMotion: boolean | null
}) {
  const meta = STATUS_META[status]

  return (
    <aside
      className="border-line bg-bone text-ink shadow-shadow sticky top-24 rounded-2xl border p-6 shadow-sm"
      aria-label="Project editor inspector"
    >
      <div className="text-primary mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
        <span className="bg-primary h-px w-5" />
        Inspector
        <span className="text-muted-foreground font-medium">· Live state</span>
      </div>
      <h3 className="text-foreground text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-3 text-sm leading-7">{text}</p>

      <div className="border-line bg-paper mt-6 rounded-xl border p-4">
        <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs font-semibold tracking-[0.16em] uppercase">
          <span>Completeness</span>
          <strong className="text-foreground">{completeness}%</strong>
        </div>
        <div className="bg-line-soft h-2 overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={reduceMotion ? undefined : { width: 0 }}
            animate={{ width: `${completeness}%` }}
            transition={{ duration: 0.28 }}
          />
        </div>
      </div>

      <div className="border-line bg-paper mt-6 rounded-xl border p-4">
        <div className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.16em] uppercase">
          Public preview
        </div>
        <p className="text-ink-soft text-sm leading-7">{previewText}</p>
        <div
          className={cn(
            'mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]',
            meta.preview
          )}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {meta.label}
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        <button
          type="submit"
          form={formId}
          disabled={saving}
          data-testid="btn-submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <span className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              {isInspectorEditTitle(title) ? 'Save Changes' : 'Create Project'}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onReview}
          className="border-border text-foreground hover:border-primary/40 hover:text-primary inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all"
        >
          <Pencil size={16} />
          Review readiness
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border-border text-foreground hover:border-destructive/40 hover:text-destructive inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all"
        >
          <ArrowRight className="rotate-180" size={16} />
          Cancel
        </button>
      </div>

      <div className="border-line bg-paper mt-8 rounded-xl border p-4">
        <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs font-semibold tracking-[0.16em] uppercase">
          <span>Payload preview</span>
          <Github size={14} />
        </div>
        <pre className="font-editorial-mono text-ink-soft max-h-72 overflow-auto whitespace-pre-wrap text-[11px] leading-6">
          {payloadPreview}
        </pre>
      </div>
    </aside>
  )
}

function FormSection({
  title,
  description,
  children,
  delay,
  reduceMotion,
}: {
  title: string
  description: string
  children: React.ReactNode
  delay: number
  reduceMotion: boolean | null
}) {
  return (
    <motion.section
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: reduceMotion ? 0 : delay * 0.05 }}
      className="border-line-soft pb-10 last:border-b-0 last:pb-0 sm:pb-12"
    >
      <div className="border-line-soft mb-8 flex flex-col gap-3 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="font-editorial-tight text-ink text-2xl font-bold tracking-[-0.014em]">
            {title}
          </h3>
          <p className="text-ink-mute mt-2 max-w-3xl text-sm leading-7">
            {description}
          </p>
        </div>
      </div>
      {children}
    </motion.section>
  )
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  labelAccessory,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  labelAccessory?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="editorial-label">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
        {labelAccessory}
      </div>
      {children}
      {hint && !error && (
        <p id={`${id}-help`} className="text-ink-mute text-xs leading-5">
          {hint}
        </p>
      )}
    </div>
  )
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null

  return (
    <p id={id} className="text-coral min-h-4 text-xs">
      {children}
    </p>
  )
}

function StatusSegmented({
  status,
  onChange,
  onStatusChange,
}: {
  status: ProjectStatus
  onChange: (status: ProjectStatus) => void
  onStatusChange: () => void
}) {
  return (
    <div
      className="grid grid-cols-3 gap-2 rounded-full border border-line bg-paper p-1.5"
      role="radiogroup"
      aria-label="Project status"
      onChange={onStatusChange}
    >
      {STATUS_OPTIONS.map(option => {
        const meta = STATUS_META[option]
        const selected = status === option

        return (
          <label
            key={option}
            className={cn(
              'relative cursor-pointer rounded-full text-center transition-colors',
              selected ? meta.selected : 'text-ink-faint hover:text-ink-soft'
            )}
          >
            <input
              type="radio"
              name="status"
              value={option}
              checked={selected}
              onChange={() => onChange(option)}
              data-testid={`radio-status-${option}`}
              className="sr-only"
            />
            <span className="block rounded-full px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em]">
              {meta.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function MarkdownPreview({ content }: { content: string }) {
  if (!content.trim()) {
    return (
      <div className="bg-bone text-ink-faint min-h-80 p-6 text-sm leading-7">
        Markdown preview will appear here as you write the project story.
      </div>
    )
  }

  return (
    <div className="markdown-content bg-bone text-ink-soft max-h-[28rem] overflow-auto p-5 text-sm leading-7">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

function fieldClass(error?: string) {
  return error
    ? 'border-coral focus-visible:border-coral focus-visible:ring-coral/20'
    : 'border-[var(--line)] focus-visible:border-coral/60 focus-visible:ring-coral/20'
}

function getFieldLabel(key: string) {
  switch (key) {
    case 'title':
      return 'Title'
    case 'shortDesc':
      return 'Short description'
    case 'longDesc':
      return 'Long description'
    case 'githubUrl':
      return 'GitHub URL'
    case 'techInput':
      return 'Tech stack'
    default:
      return 'Field'
  }
}

function isInspectorEditTitle(title: string) {
  return title.startsWith('Editing')
}
