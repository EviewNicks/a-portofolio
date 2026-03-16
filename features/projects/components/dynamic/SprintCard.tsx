import type { SprintGroup } from '@/features/projects/types';
import { TimelineEntryCard } from './TimelineEntryCard';

interface SprintCardProps {
  sprint: SprintGroup;
}

export function SprintCard({ sprint }: SprintCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
        <h3 className="text-sm font-semibold text-white">Sprint {sprint.number}</h3>
        <span className="text-xs text-white/40">
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
