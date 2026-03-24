import { cn } from '@/lib/utils';
import type { SprintGroup } from '@/features/projects/types';
import { TimelineEntryCard } from './TimelineEntryCard';

interface SprintNodeProps {
  sprint: SprintGroup;
  side: 'left' | 'right';
  isLast: boolean;
}

export function SprintNode({ sprint, side, isLast }: SprintNodeProps) {
  const isLeft = side === 'left';

  return (
    <div className="relative flex items-start gap-0">
      {/* Left side */}
      <div className={cn('flex-1 min-w-0', isLeft ? 'pr-6' : 'pr-0')}>
        {isLeft && (
          <div className="flex flex-col items-end gap-2">
            <SprintLabel number={sprint.number} align="right" />
            <div className="w-full space-y-2">
              {sprint.entries.map((entry) => (
                <TimelineEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center spine + dot */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-8">
        <div className="w-3 h-3 rounded-full bg-primary border-2 border-background ring-2 ring-primary/30 z-10 mt-1.5" />
        {!isLast && (
          <div className="w-px flex-1 bg-border mt-1 min-h-8" />
        )}
      </div>

      {/* Right side */}
      <div className={cn('flex-1 min-w-0', !isLeft ? 'pl-6' : 'pl-0')}>
        {!isLeft && (
          <div className="flex flex-col items-start gap-2">
            <SprintLabel number={sprint.number} align="left" />
            <div className="w-full space-y-2">
              {sprint.entries.map((entry) => (
                <TimelineEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SprintLabel({ number, align }: { number: number; align: 'left' | 'right' }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
        'bg-foreground/8 border border-border',
        'text-xs font-semibold text-foreground',
        align === 'right' ? 'self-end' : 'self-start'
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
      Sprint {number}
    </div>
  );
}
