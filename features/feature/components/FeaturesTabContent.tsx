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
  // Order features by display_order ascending
  const orderedFeatures = [...features].sort((a, b) => a.display_order - b.display_order)

  if (orderedFeatures.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">
          No showcase features documented for this project yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">
          Project Features & Capabilities
        </h3>
        <p className="text-sm text-muted-foreground">
          Deep-dive into specific features, technical implementations, and demos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
