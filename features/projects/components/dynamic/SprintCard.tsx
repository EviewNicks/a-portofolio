import type { SprintGroup } from '@/features/projects/types';
import { TimelineEntryCard } from './TimelineEntryCard';

interface SprintCardProps {
  sprint: SprintGroup;
}

export function SprintCard({ sprint }: SprintCardProps) {
  return (
    <div
      data-testid="sprint-card"
      data-sprint-number={sprint.number}
      className="rounded-xl glass-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-foreground/3">
        <h3 data-testid="sprint-number" className="text-sm font-semibold text-foreground">
          Sprint {sprint.number}
        </h3>
        <span data-testid="sprint-entry-count" className="text-xs text-muted-foreground">
          {sprint.entries.length} {sprint.entries.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>
      <div className="p-4 space-y-3">
        {sprint.entries.map((entry) => (
          <TimelineEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
