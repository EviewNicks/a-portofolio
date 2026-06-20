import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/features/projects/types';

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-500/20 text-green-600 border-green-500/30 dark:text-green-300' },
  maintenance: { label: 'Maintenance', className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:text-yellow-300' },
  archived: { label: 'Archived', className: 'bg-gray-500/20 text-gray-600 border-gray-500/30 dark:text-gray-300' },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]',
      config.className
    )}>
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {config.label}
    </span>
  );
}
