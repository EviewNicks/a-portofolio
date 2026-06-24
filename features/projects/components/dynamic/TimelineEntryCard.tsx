'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ArrowUpRight, CircleDot, FileCode2, Milestone, PlayCircle, Rocket, Video } from 'lucide-react';
import type { TimelineEntry, EntryType } from '@/features/projects/types';

const TYPE_CONFIG: Record<EntryType, { icon: typeof Video; label: string; color: string }> = {
  pr: { icon: FileCode2, label: 'Pull Request', color: 'text-olive' },
  milestone: { icon: Milestone, label: 'Milestone', color: 'text-coral' },
  blog_post: { icon: CircleDot, label: 'Blog Post', color: 'text-mustard' },
  video: { icon: PlayCircle, label: 'Video', color: 'text-coral' },
  deployment: { icon: Rocket, label: 'Deployment', color: 'text-olive' },
  release: { icon: Milestone, label: 'Release', color: 'text-mustard' },
};

const PR_STATUS_BADGE: Record<string, string> = {
  merged: 'bg-purple-500/15 text-purple-700 border-purple-400/40 dark:text-purple-300 dark:border-purple-500/30',
  open: 'bg-green-500/15 text-green-700 border-green-400/40 dark:text-green-300 dark:border-green-500/30',
  closed: 'bg-red-500/15 text-red-700 border-red-400/40 dark:text-red-300 dark:border-red-500/30',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

interface TimelineEntryCardProps {
  entry: TimelineEntry;
}

export function TimelineEntryCard({ entry }: TimelineEntryCardProps) {
  const config = TYPE_CONFIG[entry.entry_type];
  const Icon = config.icon;
  const router = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      data-testid="timeline-entry-card"
      data-entry-type={entry.entry_type}
      onClick={() => router.push(`/projects/${entry.project_id}/timeline/${entry.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          router.push(`/projects/${entry.project_id}/timeline/${entry.id}`);
        }
      }}
      className={cn(
        'group rounded-2xl border border-line/50 bg-paper p-4 shadow-sm transition-all duration-300 cursor-pointer',
        'hover:-translate-y-1 hover:border-coral/40 hover:bg-paper-warm hover:shadow-lg active:scale-[0.99]',
        entry.is_featured && 'border-coral/50 bg-coral/5'
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            'mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
            entry.is_featured ? 'border-coral bg-coral text-paper' : 'border-line bg-paper text-coral'
          )}
          aria-hidden="true"
        >
          <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={cn('font-editorial-tight text-[0.62rem] font-bold uppercase tracking-[0.16em]', config.color)}>
              {config.label}
            </span>
            {entry.entry_type === 'pr' && entry.external_status && (
              <span
                data-testid="pr-status-badge"
                className={cn('rounded-full border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em]', PR_STATUS_BADGE[entry.external_status])}
              >
                {entry.external_status}
              </span>
            )}
            {entry.is_featured && (
              <span
                data-testid="featured-badge"
                className="rounded-full border border-coral/30 bg-coral/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-coral"
              >
                Featured
              </span>
            )}
          </div>

          <h4 data-testid="entry-title" className="font-editorial-tight text-base font-bold leading-tight tracking-[-0.01em] text-ink">
            {entry.title}
          </h4>

          {entry.description && (
            <p className="mt-2 font-editorial-body text-sm leading-relaxed text-ink-mute">{entry.description}</p>
          )}

          {entry.entry_type === 'video' && entry.media_preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.media_preview}
              alt={entry.title}
              className="mt-3 aspect-video w-full rounded-xl object-cover"
            />
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-line pt-3 font-editorial-mono text-[0.65rem] tracking-[0.04em] text-ink-faint">
            <span data-testid="entry-date">
              {formatDate(entry.date)} · Sprint {entry.sprint_number}
            </span>
            {entry.external_url && (
              <a
                href={entry.external_url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="entry-external-link"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1 text-coral transition hover:underline focus:outline-none focus-visible:underline"
              >
                {entry.entry_type === 'pr' ? 'View PR' : entry.entry_type === 'video' ? 'Watch Video' : 'View Link'}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
