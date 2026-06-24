'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'
import { FeatureCard } from './FeatureCard'

interface FeaturesTabContentProps {
  projectId: string
  features: ProjectFeature[]
  secret?: string
}

export function FeaturesTabContent({
  projectId,
  features,
  secret = '',
}: FeaturesTabContentProps) {
  const orderedFeatures = [...features].sort(
    (a, b) => a.display_order - b.display_order
  )

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <span className="editorial-label mb-4">
          Features
          <span className="ix">· {orderedFeatures.length} capabilities</span>
        </span>
        <h3 className="editorial-display text-2xl sm:text-3xl">
          Project capabilities<span className="dot">.</span>
        </h3>
        <p className="mt-4 max-w-3xl font-editorial-body text-base leading-relaxed text-ink-mute">
          Deep-dive into specific features, technical implementations, and demos.
        </p>
      </div>

      {secret && (
        <div className="border-border bg-amber-500/5 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 shadow-sm">
          <div>
            <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-[0.14em]">
              Admin Mode
            </span>
            <p className="text-muted-foreground mt-1 text-sm">
              Create a new showcase feature directly from this tab.
            </p>
          </div>
          <Link
            href={`/admin/feature/new?projectId=${projectId}&secret=${secret}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all"
          >
            <Plus size={16} />
            Add Feature
          </Link>
        </div>
      )}

      {orderedFeatures.length === 0 ? (
        <div className="editorial-surface p-8 text-center">
          <p className="font-editorial-body text-base text-ink-mute">
            No showcase features documented for this project yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orderedFeatures.map(feature => (
            <FeatureCard
              key={feature.id}
              projectId={projectId}
              feature={feature}
            />
          ))}
        </div>
      )}
    </div>
  )
}
