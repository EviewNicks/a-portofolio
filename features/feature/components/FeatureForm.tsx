'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'
import { validateFeatureInput } from '@/features/utils/validation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const DEFAULT_DISPLAY_ORDER = 1

export interface FeatureFormDraft {
  title: string
  description: string
  youtubeUrl: string
  demoUrl: string
  techStack: string[]
}

interface FeatureFormProps {
  projectId: string
  secret: string
  feature?: ProjectFeature | null
  onSuccess: (savedFeature: ProjectFeature) => void
  onCancel: () => void
  onFormChange?: (draft: FeatureFormDraft) => void
}

export function FeatureForm({
  projectId,
  secret,
  feature,
  onSuccess,
  onCancel,
  onFormChange,
}: FeatureFormProps) {
  const reduceMotion = useReducedMotion()
  const [title, setTitle] = useState(feature?.title ?? '')
  const [description, setDescription] = useState(feature?.description ?? '')
  const [youtubeUrl, setYoutubeUrl] = useState(feature?.youtube_url ?? '')
  const [demoUrl, setDemoUrl] = useState(feature?.demo_url ?? '')
  const [techStack, setTechStack] = useState(feature?.tech_stack ?? [])
  const [techInput, setTechInput] = useState('')
  const [isFeatured, setIsFeatured] = useState(feature?.is_featured ?? false)
  const [displayOrder, setDisplayOrder] = useState(
    feature?.display_order ?? DEFAULT_DISPLAY_ORDER
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const draft = useMemo(
    () => ({
      title,
      description,
      youtubeUrl,
      demoUrl,
      techStack,
    }),
    [demoUrl, description, techStack, title, youtubeUrl]
  )

  useEffect(() => {
    onFormChange?.(draft)
  }, [draft, onFormChange])

  const addTechStackItem = (rawValue = techInput) => {
    const nextItems = rawValue
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)

    if (nextItems.length === 0) return

    setTechStack(current => {
      const merged = [...current]
      nextItems.forEach(item => {
        if (
          !merged.some(
            existing => existing.toLowerCase() === item.toLowerCase()
          )
        ) {
          merged.push(item)
        }
      })
      return merged
    })
    setTechInput('')
  }

  const removeTechStackItem = (value: string) => {
    setTechStack(current =>
      current.filter(item => item.toLowerCase() !== value.toLowerCase())
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const payload = {
      title,
      description,
      youtube_url: youtubeUrl || null,
      demo_url: demoUrl || null,
      tech_stack: techStack,
      is_featured: isFeatured,
      display_order: displayOrder,
    }

    const validation = validateFeatureInput(payload)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setSaving(true)
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
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
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
        title="II. Demo links"
        description="Optional URLs for live demo and video walkthrough."
        delay={1}
        reduceMotion={reduceMotion}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Live demo URL" error={errors.demo_url}>
            <Input
              id="demo-url"
              type="url"
              value={demoUrl}
              onChange={e => setDemoUrl(e.target.value)}
              placeholder="https://demo.example.com/payment"
              aria-invalid={Boolean(errors.demo_url)}
              className={cn(
                'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
                fieldClass(errors.demo_url)
              )}
            />
            <FieldError id="demo-url-error">{errors.demo_url}</FieldError>
          </Field>

          <Field label="YouTube URL" error={errors.youtube_url}>
            <Input
              id="youtube-url"
              type="url"
              value={youtubeUrl}
              onChange={e => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=abc123"
              aria-invalid={Boolean(errors.youtube_url)}
              className={cn(
                'bg-paper text-ink focus-visible:bg-paper-warm rounded-xl px-4 py-3 transition-colors',
                fieldClass(errors.youtube_url)
              )}
            />
            <FieldError id="youtube-url-error">{errors.youtube_url}</FieldError>
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="III. Tech stack"
        description="Typed chips become the detail-page pill row."
        delay={2}
        reduceMotion={reduceMotion}
      >
        <Field
          label="Add technology"
          error={errors.tech_stack}
          hint="Type a stack item, then press Enter. Suggested: Clerk, Next.js Middleware, Prisma, TypeScript, Supabase."
        >
          <ChipInput
            items={techStack}
            input={techInput}
            onInputChange={setTechInput}
            onAdd={() => addTechStackItem()}
            onRemove={removeTechStackItem}
            invalid={Boolean(errors.tech_stack)}
          />
          <FieldError id="tech-stack-error">{errors.tech_stack}</FieldError>
        </Field>
      </FormSection>

      <FormSection
        title="V. Implementation details"
        description="Markdown content for architecture, decisions, and testing notes."
        delay={3}
        reduceMotion={reduceMotion}
      >
        <Field
          label="Markdown implementation notes"
          required
          error={errors.description}
          hint="Supports headings, bullets, links, and inline code on the detail page."
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
            required
          />
          <div className="flex items-center justify-between gap-4">
            <FieldError id="implementation-markdown-error">
              {errors.description}
            </FieldError>
          </div>
        </Field>
      </FormSection>

      <div className="border-line-soft flex flex-col-reverse justify-end gap-3 border-t pt-6 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="hover:border-coral/50 hover:bg-coral/5 hover:text-coral border-line text-ink-soft bg-transparent"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="bg-coral shadow-coral/20 text-white shadow-lg hover:bg-[#e25e4a]"
        >
          <Check size={16} />
          {saving ? 'Saving...' : 'Save Feature'}
        </Button>
      </div>
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

function ChipInput({
  items,
  input,
  onInputChange,
  onAdd,
  onRemove,
  invalid,
}: {
  items: string[]
  input: string
  onInputChange: (value: string) => void
  onAdd: () => void
  onRemove: (value: string) => void
  invalid: boolean
}) {
  return (
    <div
      className={cn(
        'focus-within:border-coral/60 bg-paper focus-within:bg-paper-warm border transition-colors',
        invalid
          ? 'border-coral ring-coral/10 ring-3'
          : 'hover:border-coral/50 border-line'
      )}
    >
      <div className="flex min-h-12 flex-wrap gap-2 p-2">
        {items.map(item => (
          <Badge
            key={item}
            variant="outline"
            className="font-editorial-mono border-line bg-bone text-ink-soft"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="text-coral hover:bg-coral/10 ml-1 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${item}`}
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
        <Input
          value={input}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              onAdd()
            }
          }}
          onBlur={() => onAdd()}
          placeholder="Type a stack item, then press Enter"
          className="text-ink min-h-8 flex-1 border-0 bg-transparent px-2 py-1 shadow-none focus-visible:ring-0"
          aria-label="Add technology"
        />
      </div>
    </div>
  )
}

function fieldClass(error?: string) {
  return error
    ? 'border-coral focus-visible:border-coral focus-visible:ring-coral/20'
    : 'border-[var(--line)] focus-visible:border-coral/60 focus-visible:ring-coral/20'
}
