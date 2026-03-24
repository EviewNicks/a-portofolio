import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/supabase/queries/projects';
import { getTimelineEntryById } from '@/lib/supabase/queries/timeline';
import { MarkdownContent } from '@/features/projects/components/dynamic/MarkdownContent';
import type { EntryType, PRStatus } from '@/features/projects/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string; entryId: string }>;
}

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

export default async function TimelineEntryDetailPage({ params }: PageProps) {
  const { id, entryId } = await params;

  const [raw, project] = await Promise.all([
    getTimelineEntryById(entryId),
    getProjectById(id),
  ]);

  if (!raw || !project || raw.project_id !== id) notFound();

  const config = TYPE_CONFIG[raw.entry_type as EntryType];
  const prStatus = raw.external_status as PRStatus | null;

  const formattedDate = new Date(raw.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link
          href={`/projects/${id}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          ← Back to {project.title}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-2xl" aria-hidden="true">{config.icon}</span>
            <span className={cn('text-sm font-medium', config.color)}>{config.label}</span>
            {prStatus && (
              <span className={cn('px-2 py-0.5 rounded text-xs border', PR_STATUS_BADGE[prStatus])}>
                {prStatus}
              </span>
            )}
            {raw.is_featured && (
              <span className="px-2 py-0.5 rounded text-xs bg-primary/15 text-primary border border-primary/30">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">{raw.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>Sprint {raw.sprint_number}</span>
            <span>{formattedDate}</span>
            {raw.github_author && <span>by {raw.github_author}</span>}
            {raw.github_pr_number && <span>PR #{raw.github_pr_number}</span>}
            {raw.external_url && (
              <a
                href={raw.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-foreground/5 text-xs font-medium text-foreground hover:bg-foreground/10 transition-colors"
              >
                {raw.entry_type === 'pr' ? '↗ View on GitHub' :
                 raw.entry_type === 'video' ? '▶ Watch Video' :
                 raw.external_title ?? '↗ View Link'}
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        {raw.description && (
          <div className="mb-8 p-6 rounded-xl border border-border bg-foreground/2">
            <MarkdownContent content={raw.description} />
          </div>
        )}

        {/* Video thumbnail */}
        {raw.entry_type === 'video' && raw.media_preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={raw.media_preview}
            alt={raw.title}
            className="mb-8 rounded-xl w-full object-cover"
          />
        )}
      </div>
    </main>
  );
}
