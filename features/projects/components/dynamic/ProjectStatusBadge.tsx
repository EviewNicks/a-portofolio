import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/features/projects/types';

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  maintenance: { label: 'Maintenance', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  archived: { label: 'Archived', className: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', config.className)}>
      {config.label}
    </span>
  );
}
