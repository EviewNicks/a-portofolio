import type { TimelineEntry } from '@/features/projects/types';
import { groupEntriesBySprint } from '@/features/projects/utils/timeline';
import { SprintNode } from './SprintNode';

interface TimelineSectionProps {
  entries: TimelineEntry[];
}

export function TimelineSection({ entries }: TimelineSectionProps) {
  const sprints = groupEntriesBySprint(entries);

  if (sprints.length === 0) {
    return (
      <section data-testid="timeline-section" className="py-8">
        <div data-testid="timeline-empty" className="text-center py-12 text-muted-foreground border border-border rounded-xl">
          No timeline entries yet.
        </div>
      </section>
    );
  }

  return (
    <section data-testid="timeline-section" className="py-4">
      <div className="relative">
        {sprints.map((sprint, index) => (
          <SprintNode
            key={sprint.number}
            sprint={sprint}
            side={index % 2 === 0 ? 'left' : 'right'}
            isLast={index === sprints.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
