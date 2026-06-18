'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { DynamicProject, TimelineEntry, ProjectFeature } from '@/features/projects/types';
import { MarkdownContent } from './MarkdownContent';
import { TimelineSection } from './TimelineSection';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import { FeaturesTabContent } from '@/features/feature/components/FeaturesTabContent';
import Link from 'next/link';

interface ProjectDetailTabsProps {
  project: DynamicProject;
  entries: TimelineEntry[];
  features?: ProjectFeature[];
}

type Tab = 'description' | 'timeline' | 'features';

export function ProjectDetailTabs({ project, entries, features = [] }: ProjectDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border mb-6">
        <TabButton
          active={activeTab === 'description'}
          onClick={() => setActiveTab('description')}
        >
          Description
        </TabButton>
        <TabButton
          active={activeTab === 'features'}
          onClick={() => setActiveTab('features')}
        >
          Features
          {features.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-foreground/10 text-xs text-muted-foreground">
              {features.length}
            </span>
          )}
        </TabButton>
        <TabButton
          active={activeTab === 'timeline'}
          onClick={() => setActiveTab('timeline')}
        >
          Development Timeline
          {entries.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-foreground/10 text-xs text-muted-foreground">
              {entries.length}
            </span>
          )}
        </TabButton>
      </div>

      {/* Tab content */}
      {activeTab === 'description' && (
        <DescriptionTab project={project} />
      )}
      {activeTab === 'features' && (
        <FeaturesTabContent projectId={project.id} features={features} />
      )}
      {activeTab === 'timeline' && (
        <TimelineSection entries={entries} />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
        active
          ? 'border-primary text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
      )}
    >
      {children}
    </button>
  );
}

function DescriptionTab({ project }: { project: DynamicProject }) {
  const description = project.long_description || project.short_description;

  return (
    <div className="space-y-6">
      {/* Status + meta */}
      <div className="flex flex-wrap items-center gap-3">
        <ProjectStatusBadge status={project.status} />
        <span className="text-xs text-muted-foreground">
          Created {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
        {project.last_sync_at && (
          <span className="text-xs text-muted-foreground">
            · Last synced {new Date(project.last_sync_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      {/* Tech stack */}
      {project.tech_stack.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-foreground/8 text-foreground/70 text-sm border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* GitHub link */}
      {project.github_repo_url && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Repository</p>
          <Link
            href={project.github_repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {project.github_repo_url} →
          </Link>
        </div>
      )}

      {/* Description — rendered as markdown */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">About</p>
        <MarkdownContent content={description} />
      </div>
    </div>
  );
}
