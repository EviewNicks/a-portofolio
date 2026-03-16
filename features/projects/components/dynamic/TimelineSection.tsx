import type { TimelineEntry } from '@/features/projects/types';
import { groupEntriesBySprint } from '@/features/projects/utils/timeline';
import { SprintCard } from './SprintCard';

interface TimelineSectionProps {
  entries: TimelineEntry[];
}

export function TimelineSection({ entries }: TimelineSectionProps) {
  const sprints = groupEntriesBySprint(entries);

  if (sprints.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-xl font-bold text-white mb-4">Development Timeline</h2>
        <div className="text-center py-12 text-white/30 border border-white/10 rounded-xl">
          No timeline entries yet.
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-white mb-6">Development Timeline</h2>
      <div className="space-y-6">
        {sprints.map((sprint) => (
          <SprintCard key={sprint.number} sprint={sprint} />
        ))}
      </div>
    </section>
  );
}
