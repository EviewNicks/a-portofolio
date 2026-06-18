'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'
import { validateFeatureInput } from '@/features/utils/validation'

interface FeatureFormProps {
  projectId: string
  secret: string
  feature?: ProjectFeature | null
  onSuccess: (savedFeature: ProjectFeature) => void
  onCancel: () => void
}

export function FeatureForm({
  projectId,
  secret,
  feature,
  onSuccess,
  onCancel,
}: FeatureFormProps) {
  const [title, setTitle] = useState(feature?.title ?? '')
  const [description, setDescription] = useState(feature?.description ?? '')
  const [youtubeUrl, setYoutubeUrl] = useState(feature?.youtube_url ?? '')
  const [demoUrl, setDemoUrl] = useState(feature?.demo_url ?? '')
  const [techStackInput, setTechStackInput] = useState(
    feature?.tech_stack.join(', ') ?? ''
  )
  const [isFeatured, setIsFeatured] = useState(feature?.is_featured ?? false)
  const [displayOrder, setDisplayOrder] = useState(feature?.display_order ?? 0)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const techStack = techStackInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const payload = {
      title,
      description,
      youtube_url: youtubeUrl || null,
      demo_url: demoUrl || null,
      tech_stack: techStack,
      is_featured: isFeatured,
      display_order: displayOrder,
    }

    // Run client side validation
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.global && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {errors.global}
        </p>
      )}

      <div className="space-y-1">
        <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Feature Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g., Real-time Chat Sync"
          required
          className={`bg-background text-foreground focus:ring-primary/30 focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none ${
            errors.title
              ? 'border-red-500/50 focus:ring-red-500/20'
              : 'border-border'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-400">{errors.title}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Description (Markdown Supported)
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Explain the feature details. You can use standard Markdown."
          rows={6}
          className={`bg-background text-foreground focus:ring-primary/30 focus:border-primary w-full resize-y rounded-lg border px-3 py-2 font-mono text-sm transition-all focus:ring-2 focus:outline-none ${
            errors.description
              ? 'border-red-500/50 focus:ring-red-500/20'
              : 'border-border'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={e => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className={`bg-background text-foreground focus:ring-primary/30 focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none ${
              errors.youtube_url
                ? 'border-red-500/50 focus:ring-red-500/20'
                : 'border-border'
            }`}
          />
          {errors.youtube_url && (
            <p className="mt-1 text-xs text-red-400">{errors.youtube_url}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Demo URL
          </label>
          <input
            type="url"
            value={demoUrl}
            onChange={e => setDemoUrl(e.target.value)}
            placeholder="https://my-demo-app.com"
            className={`bg-background text-foreground focus:ring-primary/30 focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none ${
              errors.demo_url
                ? 'border-red-500/50 focus:ring-red-500/20'
                : 'border-border'
            }`}
          />
          {errors.demo_url && (
            <p className="mt-1 text-xs text-red-400">{errors.demo_url}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Tech Stack (Comma-separated)
          </label>
          <input
            type="text"
            value={techStackInput}
            onChange={e => setTechStackInput(e.target.value)}
            placeholder="e.g., Next.js, TailwindCSS, Supabase"
            className={`bg-background text-foreground focus:ring-primary/30 focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none ${
              errors.tech_stack
                ? 'border-red-500/50 focus:ring-red-500/20'
                : 'border-border'
            }`}
          />
          {errors.tech_stack && (
            <p className="mt-1 text-xs text-red-400">{errors.tech_stack}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Display Order
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={e => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
            placeholder="0"
            className="bg-background border-border text-foreground focus:ring-primary/30 focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-2">
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={e => setIsFeatured(e.target.checked)}
            className="border-border bg-background text-primary focus:ring-primary/30 h-4 w-4 rounded focus:ring-2"
          />
          <span className="text-foreground text-sm font-medium">
            Featured Showcase
          </span>
        </label>
        <p className="text-muted-foreground mt-0.5 ml-6 text-xs">
          Highlight this feature with special layouts or priority tags in the
          public view.
        </p>
      </div>

      <div className="border-border mt-6 flex justify-end gap-3 border-t pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-muted text-foreground hover:bg-muted/80 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
        >
          <Check size={16} />
          {saving ? 'Saving...' : 'Save Feature'}
        </button>
      </div>
    </form>
  )
}
