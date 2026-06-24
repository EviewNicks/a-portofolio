'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type {
  DynamicProject,
  ProjectFeature,
  TimelineEntry,
} from '@/features/projects/types'
import { MarkdownContent } from './MarkdownContent'
import { TimelineSection } from './TimelineSection'
import { FeaturesTabContent } from '@/features/feature/components/FeaturesTabContent'

interface ProjectDetailTabsProps {
  project: DynamicProject
  entries: TimelineEntry[]
  features?: ProjectFeature[]
  secret?: string
}

type Tab = 'description' | 'timeline' | 'features'

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'description', label: 'Description' },
  { id: 'features', label: 'Features' },
  { id: 'timeline', label: 'Dev Timeline' },
]

export function ProjectDetailTabs({
  project,
  entries,
  features = [],
  secret = '',
}: ProjectDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description')

  return (
    <section
      className="relative isolate mb-10 pt-2"
      aria-label="Project details"
    >
      <div className="border-line mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <span className="editorial-meta">Details / Tabs</span>
        <span className="text-coral font-editorial-serif italic">In-depth</span>
        <span className="editorial-meta">003 / 004</span>
      </div>

      <div
        className="border-line mb-10 flex overflow-x-auto border-b pb-0"
        role="tablist"
        aria-label="Project sections"
      >
        {tabs.map(tab => {
          const active = activeTab === tab.id
          const count =
            tab.id === 'features'
              ? features.length
              : tab.id === 'timeline'
                ? entries.length
                : null

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'font-editorial-tight focus-visible:ring-coral/40 min-h-11 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2',
                active ? 'text-ink' : 'text-ink-faint hover:text-ink-soft'
              )}
            >
              {tab.label}
              {count !== null && (
                <span
                  className={cn(
                    'font-editorial-mono ml-2 rounded-full px-2 py-0.5 text-[0.62rem] tracking-[0.04em]',
                    active
                      ? 'bg-coral/10 text-coral'
                      : 'bg-foreground/10 text-ink-faint'
                  )}
                >
                  {count}
                </span>
              )}
              {active && (
                <span
                  className="bg-coral absolute right-4 bottom-0 left-4 h-px"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      <div
        id="panel-description"
        role="tabpanel"
        aria-labelledby="tab-description"
        hidden={activeTab !== 'description'}
      >
        {activeTab === 'description' && <DescriptionTab project={project} />}
      </div>
      <div
        id="panel-features"
        role="tabpanel"
        aria-labelledby="tab-features"
        hidden={activeTab !== 'features'}
      >
        {activeTab === 'features' && (
          <FeaturesTabContent
            projectId={project.id}
            features={features}
            secret={secret}
          />
        )}
      </div>
      <div
        id="panel-timeline"
        role="tabpanel"
        aria-labelledby="tab-timeline"
        hidden={activeTab !== 'timeline'}
      >
        {activeTab === 'timeline' && <TimelineSection entries={entries} />}
      </div>
    </section>
  )
}

function DescriptionTab({ project }: { project: DynamicProject }) {
  const description = project.long_description || project.short_description

  return (
    <div className="grid gap-8 lg:items-start">
      <article className="editorial-surface p-6 sm:p-8">
        <span className="editorial-label mb-6">About</span>
        <MarkdownContent
          content={description}
          className="project-detail-markdown w-full"
        />
      </article>
    </div>
  )
}
