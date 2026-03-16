'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/features/projects/types';

const STATUS_OPTIONS: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'archived', label: 'Archived' },
];

export function DynamicProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') ?? 'all';
  const currentQuery = searchParams.get('query') ?? '';

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search projects..."
        defaultValue={currentQuery}
        onChange={(e) => updateParam('query', e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/30"
      />

      {/* Status filter */}
      <div className="flex gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateParam('status', opt.value)}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              currentStatus === opt.value
                ? 'bg-primary text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
