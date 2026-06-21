'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectFeature } from '@/features/projects/types'
import { validateFeatureInput } from '@/features/utils/validation'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const DEFAULT_DISPLAY_ORDER = 1
const SHORT_DESCRIPTION_LIMIT = 200
const DESCRIPTION_LIMIT = 50000

export interface FeatureFormDraft {
  title: string
  shortDescription: string
  description: string
  youtubeUrl: string
}

interface FeatureFormProps {
  projectId: string
  secret: string
  feature?: ProjectFeature | null
  onSuccess: (savedFeature: ProjectFeature) => void
  formId: string
  saving: boolean
  onSavingChange: (saving: boolean) => void
  onFormChange?: (draft: FeatureFormDraft) => void
}

export function FeatureForm({
  projectId,
  secret,
  feature,
  onSuccess,
  formId,
  onSavingChange,
  onFormChange,
}: FeatureFormProps) {
  const reduceMotion = useReducedMotion()
  const [title, setTitle] = useState(feature?.title ?? '')
  const [shortDescription, setShortDescription] = useState(
    feature?.short_description ?? ''
  )
  const [description, setDescription] = useState(feature?.description ?? '')
  const [youtubeUrl, setYoutubeUrl] = useState(feature?.youtube_url ?? '')
  const [isFeatured, setIsFeatured] = useState(feature?.is_featured ?? false)
  const [displayOrder, setDisplayOrder] = useState(
    feature?.display_order ?? DEFAULT_DISPLAY_ORDER
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const draft = useMemo(
    () => ({
      title,
      shortDescription,
      description,
      youtubeUrl,
    }),
    [description, shortDescription, title, youtubeUrl]
  )

  useEffect(() => {
    onFormChange?.(draft)
  }, [draft, onFormChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const payload = {
      title,
      short_description: shortDescription,
      description,
      youtube_url: youtubeUrl || null,
      is_featured: isFeatured,
      display_order: displayOrder,
    }

    const validation = validateFeatureInput(payload)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    onSavingChange(true)
    try {
      let res: Response
      if (feature?.id) {
        res = await fetch(
          `/api/projects/${projectId}/features/${feature.id}?secret=${secret}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )
      } else {
        res = await fetch(
          `/api/projects/${projectId}/features?secret=${secret}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors(
          data.details ?? { global: data.error ?? 'Failed to save feature.' }
        )
        return
      }

      const savedData = await res.json()
      onSuccess(savedData.data)
    } catch {
      setErrors({ global: 'Network error. Please try again.' })
    } finally {
      onSavingChange(false)
    }
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-10">
      {errors.global && (
        <motion.div
          role="alert"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm"
        >
          {errors.global}
        </motion.div>
      )}

      <FormSection
        title="I. Core identity"
        description="Fields that map directly to the public feature header."
        delay={0}
        reduceMotion={reduceMotion}
      >
        <div className="grid gap-6">
          <Field label="Feature title" required error={errors.title}>
            <Input
              id="feature-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Payment Integration System"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={
                errors.title ? 'feature-title-error' : undefined
              }
              className={cn(
                'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
                fieldClass(errors.title)
              )}
              required
            />
            <FieldError id="feature-title-error">{errors.title}</FieldError>
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Display order"
              hint="Controls feature-card ordering in the project feature list."
            >
              <Input
                id="display-order"
                type="number"
                min={1}
                step={1}
                value={displayOrder}
                onChange={e =>
                  setDisplayOrder(
                    Number.parseInt(e.target.value, 10) || DEFAULT_DISPLAY_ORDER
                  )
                }
                className={cn(
                  'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
                  fieldClass(errors.display_order)
                )}
              />
              <FieldError id="display-order-error">
                {errors.display_order}
              </FieldError>
            </Field>

            <div className="flex h-full items-end">
              <label
                htmlFor="featured-feature"
                className="border-line-soft hover:border-coral/50 bg-paper hover:bg-paper-warm flex w-full cursor-pointer items-center justify-between gap-6 rounded-xl border p-4 transition-colors"
              >
                <span>
                  <strong className="text-ink text-sm font-semibold">
                    Featured feature
                  </strong>
                  <span className="text-ink-mute mt-1 block text-xs">
                    Highlight this feature in the public project narrative.
                  </span>
                </span>
                <Switch
                  id="featured-feature"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                  className="data-[state=checked]:bg-coral data-[state=unchecked]:bg-ink [&_span]:bg-paper"
                />
              </label>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="II. Short description"
        description="A concise public summary used by cards and feature previews."
        delay={1}
        reduceMotion={reduceMotion}
      >
        <Field
          label="Short description"
          required
          error={errors.short_description}
          hint={`Max ${SHORT_DESCRIPTION_LIMIT} characters. Keep it specific and outcome-focused.`}
        >
          <Textarea
            id="short-description"
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            placeholder="Builds a reusable payment flow that validates sessions before checkout."
            rows={3}
            aria-invalid={Boolean(errors.short_description)}
            aria-describedby="short-description-help"
            className={cn(
              'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
              fieldClass(errors.short_description)
            )}
            maxLength={SHORT_DESCRIPTION_LIMIT}
            required
          />
          <div className="flex items-center justify-between gap-4">
            <FieldError id="short-description-error">
              {errors.short_description}
            </FieldError>
            <span
              id="short-description-help"
              className={cn(
                'text-xs',
                shortDescription.length > SHORT_DESCRIPTION_LIMIT
                  ? 'text-coral'
                  : 'text-ink-mute'
              )}
            >
              {shortDescription.length}/{SHORT_DESCRIPTION_LIMIT}
            </span>
          </div>
        </Field>
      </FormSection>

      <FormSection
        title="III. Demo link"
        description="Upload the feature walkthrough to YouTube, then paste that YouTube URL here."
        delay={2}
        reduceMotion={reduceMotion}
      >
        <Field
          label="YouTube URL"
          error={errors.youtube_url}
          hint="Optional. This is the public demo link shown on the website."
        >
          <Input
            id="youtube-url"
            type="url"
            value={youtubeUrl}
            onChange={e => setYoutubeUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=abc123"
            aria-invalid={Boolean(errors.youtube_url)}
            aria-describedby="youtube-url-help"
            className={cn(
              'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
              fieldClass(errors.youtube_url)
            )}
          />
          <FieldError id="youtube-url-error">{errors.youtube_url}</FieldError>
        </Field>
      </FormSection>

      <FormSection
        title="IV. Implementation details"
        description="Markdown content for architecture, decisions, and testing notes."
        delay={3}
        reduceMotion={reduceMotion}
      >
        <Field
          label="Markdown implementation notes"
          required
          error={errors.description}
          hint={`Supports headings, bullets, links, and inline code on the detail page. Max ${DESCRIPTION_LIMIT} characters.`}
        >
          <Textarea
            id="implementation-markdown"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="## Architecture&#10;&#10;- Middleware-first authorization before render&#10;- Clerk identity provider for session and MFA&#10;- Permission matrices stored as JSON for runtime configuration"
            rows={8}
            aria-invalid={Boolean(errors.description)}
            aria-describedby="implementation-markdown-help"
            className={cn(
              'font-editorial-mono bg-paper text-ink focus-visible:bg-paper-warm min-h-52 resize-y rounded-xl px-4 py-3 transition-colors',
              fieldClass(errors.description)
            )}
            maxLength={DESCRIPTION_LIMIT}
            required
          />
          <div className="flex items-center justify-between gap-4">
            <FieldError id="implementation-markdown-error">
              {errors.description}
            </FieldError>
            <span
              id="implementation-markdown-help"
              className={cn(
                'text-xs',
                description.length > DESCRIPTION_LIMIT
                  ? 'text-coral'
                  : 'text-ink-mute'
              )}
            >
              {description.length}/{DESCRIPTION_LIMIT}
            </span>
          </div>
        </Field>
      </FormSection>
    </form>
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
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <label className="text-ink-soft text-xs font-semibold tracking-[0.14em] uppercase">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      </div>
      {children}
      {hint && !error && (
        <p id="field-hint" className="text-ink-mute text-xs leading-5">
          {hint}
        </p>
      )}
    </div>
  )
}

function FieldError({
  id,
  children,
}: {
  id: string
  children?: React.ReactNode
}) {
  if (!children) return null

  return (
    <p id={id} className="text-coral min-h-4.5 text-xs">
      {children}
    </p>
  )
}

function fieldClass(error?: string) {
  return error
    ? 'border-coral focus-visible:border-coral focus-visible:ring-coral/20'
    : 'border-[var(--line)] focus-visible:border-coral/60 focus-visible:ring-coral/20'
}
