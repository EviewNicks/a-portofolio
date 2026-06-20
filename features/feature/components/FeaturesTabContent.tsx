'use client'

import type { ProjectFeature } from '@/features/projects/types'
import { FeatureCard } from './FeatureCard'

interface FeaturesTabContentProps {
  projectId: string;
  features: ProjectFeature[];
}

export function FeaturesTabContent({
  projectId,
  features,
}: FeaturesTabContentProps) {
  const orderedFeatures = [...features].sort((a, b) => a.display_order - b.display_order)

  if (orderedFeatures.length === 0) {
    return (
      <div className="editorial-surface p-8 text-center">
        <p className="font-editorial-body text-base text-ink-mute">
          No showcase features documented for this project yet.
        </p>
      </div>
    )
  }

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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orderedFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            projectId={projectId}
            feature={feature}
          />
        ))}
      </div>
    </div>
  )
}
