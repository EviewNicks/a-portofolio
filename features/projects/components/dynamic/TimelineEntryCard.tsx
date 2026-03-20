import { cn } from '@/lib/utils';
import type { TimelineEntry, EntryType } from '@/features/projects/types';

const TYPE_CONFIG: Record<EntryType, { icon: string; label: string; color: string }> = {
  pr:         { icon: '🔗', label: 'Pull Request', color: 'text-green-600 dark:text-green-400' },
  milestone:  { icon: '🎯', label: 'Milestone',    color: 'text-blue-600 dark:text-blue-400' },
  blog_post:  { icon: '📝', label: 'Blog Post',    color: 'text-purple-600 dark:text-purple-400' },
  video:      { icon: '▶️', label: 'Video',        color: 'text-red-600 dark:text-red-400' },
  deployment: { icon: '🚀', label: 'Deployment',   color: 'text-cyan-600 dark:text-cyan-400' },
  release:    { icon: '📦', label: 'Release',      color: 'text-yellow-600 dark:text-yellow-500' },
};

const PR_STATUS_BADGE: Record<string, string> = {
  merged: 'bg-purple-500/15 text-purple-700 border-purple-400/40 dark:text-purple-300 dark:border-purple-500/30',
  open:   'bg-green-500/15 text-green-700 border-green-400/40 dark:text-green-300 dark:border-green-500/30',
  closed: 'bg-red-500/15 text-red-700 border-red-400/40 dark:text-red-300 dark:border-red-500/30',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

interface TimelineEntryCardProps {
  entry: TimelineEntry;
}

export function TimelineEntryCard({ entry }: TimelineEntryCardProps) {
  const config = TYPE_CONFIG[entry.entry_type];

  return (
    <div
      data-testid="timeline-entry-card"
      data-entry-type={entry.entry_type}
      className={cn(
        'rounded-lg glass-card p-4',
        entry.is_featured && 'border-primary/40 bg-primary/5'
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5" aria-hidden="true">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={cn('text-xs font-medium', config.color)}>{config.label}</span>
            {entry.entry_type === 'pr' && entry.external_status && (
              <span
                data-testid="pr-status-badge"
                className={cn('px-1.5 py-0.5 rounded text-xs border', PR_STATUS_BADGE[entry.external_status])}
              >
                {entry.external_status}
              </span>
            )}
            {entry.is_featured && (
              <span
                data-testid="featured-badge"
                className="px-1.5 py-0.5 rounded text-xs bg-primary/15 text-primary border border-primary/30"
              >
                Featured
              </span>
            )}
          </div>

          <h4 data-testid="entry-title" className="text-sm font-semibold text-foreground">{entry.title}</h4>

          {entry.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.description}</p>
          )}

          {/* YouTube thumbnail */}
          {entry.entry_type === 'video' && entry.media_preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.media_preview}
              alt={entry.title}
              className="mt-2 rounded w-full max-w-xs object-cover"
            />
          )}

          <div className="flex items-center gap-3 mt-2">
            <span data-testid="entry-date" className="text-xs text-muted-foreground/70">
              {formatDate(entry.date)} · Sprint {entry.sprint_number}
            </span>
            {entry.external_url && (
              <a
                href={entry.external_url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="entry-external-link"
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                {entry.entry_type === 'pr' ? 'View PR' :
                 entry.entry_type === 'video' ? 'Watch Video' : 'View Link'} →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
