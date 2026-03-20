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
      <section data-testid="timeline-section" className="py-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Development Timeline</h2>
        <div data-testid="timeline-empty" className="text-center py-12 text-muted-foreground border border-border rounded-xl">
          No timeline entries yet.
        </div>
      </section>
    );
  }

  return (
    <section data-testid="timeline-section" className="py-8">
      <h2 className="text-xl font-bold text-foreground mb-6">Development Timeline</h2>
      <div className="space-y-6">
        {sprints.map((sprint) => (
          <SprintCard key={sprint.number} sprint={sprint} />
        ))}
      </div>
    </section>
  );
}
