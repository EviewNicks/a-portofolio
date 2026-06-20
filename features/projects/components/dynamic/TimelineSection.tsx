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
      <section data-testid="timeline-section" className="py-4">
        <div data-testid="timeline-empty" className="editorial-surface p-8 text-center">
          <p className="font-editorial-body text-base text-ink-mute">
            No timeline entries yet. Development milestones will appear here once the project has sprint or PR activity.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="timeline-section" className="relative py-2">
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
