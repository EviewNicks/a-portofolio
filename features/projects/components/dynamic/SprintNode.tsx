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
    <div className="relative grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start">
      <div className={cn('min-w-0', isLeft ? 'md:pr-10' : 'md:order-3 md:pl-10')}>
        {isLeft && (
          <div className="flex flex-col gap-2">
            <SprintLabel number={sprint.number} align="right" />
            <div className="mt-4 space-y-4">
              {sprint.entries.map((entry) => (
                <TimelineEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-col items-center">
        <div className="z-10 h-5 w-5 rounded-full border-2 border-coral bg-paper shadow-sm" aria-hidden="true" />
        {!isLast && <div className="mt-4 h-full w-px flex-1 bg-line" aria-hidden="true" />}
      </div>

      <div className={cn('min-w-0', !isLeft ? 'md:order-1 md:pl-10' : 'md:order-3')}>
        {!isLeft && (
          <div className="flex flex-col gap-2">
            <SprintLabel number={sprint.number} align="left" />
            <div className="mt-4 space-y-4">
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
        'inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 shadow-sm',
        'font-editorial-tight text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink',
        align === 'right' ? 'md:self-end' : 'md:self-start'
      )}
    >
      <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
      Sprint {number}
    </div>
  );
}
