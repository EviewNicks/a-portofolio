import Link from 'next/link';
import { getAllProjects } from '@/lib/supabase/queries/projects';
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline';
import { groupEntriesBySprint } from '@/features/projects/utils/timeline';
import { AdminProjectCard } from '@/features/admin/components/AdminProjectCard';
import { FolderOpen, GitBranch, Clock, Plus } from 'lucide-react';
import { headers } from 'next/headers';
import type { DynamicProject, ProjectStatus, TimelineEntry } from '@/features/projects/types';

export default async function AdminOverviewPage() {
  // Read secret from header forwarded by proxy.ts for link passthrough
  const headersList = await headers();
  const secret = headersList.get('x-admin-secret') ?? '';

  const projects = await getAllProjects();

  // Build per-project stats
  type ProjectStats = { sprintCount: number; prCount: number };
  const projectStats = new Map<string, ProjectStats>();

  let totalEntries = 0;
  let lastSyncAt: Date | null = null;

  for (const project of projects) {
    const rawEntries = await getTimelineEntriesByProjectId(project.id);
    const entries = rawEntries.map((e) => ({
      ...e,
      date: e.date.toISOString(),
      created_at: e.created_at.toISOString(),
      updated_at: e.updated_at.toISOString(),
    })) as unknown as TimelineEntry[];

    totalEntries += entries.length;

    const sprints = groupEntriesBySprint(entries);
    const prCount = entries.filter((e) => e.entry_type === 'pr').length;
    projectStats.set(project.id, { sprintCount: sprints.length, prCount });

    if (project.last_sync_at) {
      const syncDate = new Date(project.last_sync_at);
      if (!lastSyncAt || syncDate > lastSyncAt) lastSyncAt = syncDate;
    }
  }

  const activeProjects = projects.filter((p) => p.status === 'active').length;

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: GitBranch,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Timeline Entries',
      value: totalEntries,
      icon: Clock,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Portfolio admin dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
          >
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Last sync info */}
      {lastSyncAt && (
        <p className="text-xs text-muted-foreground">
          Last GitHub sync:{' '}
          {lastSyncAt.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      )}

      {/* Quick actions */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/projects?secret=${secret}`}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border hover:bg-foreground/5 text-foreground rounded-lg text-sm transition-colors"
          >
            <FolderOpen size={16} />
            View All Projects
          </Link>
          <Link
            href={`/admin/projects/new?secret=${secret}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm transition-colors"
          >
            <Plus size={16} />
            New Project
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.slice(0, 5).map((project) => {
              const s = projectStats.get(project.id) ?? { sprintCount: 0, prCount: 0 };
              const dynamicProject: DynamicProject = {
                ...project,
                long_description: project.long_description ?? undefined,
                github_repo_url: project.github_repo_url ?? undefined,
                github_owner: project.github_owner ?? undefined,
                github_repo: project.github_repo ?? undefined,
                last_sync_at: project.last_sync_at?.toISOString() ?? undefined,
                created_at: project.created_at.toISOString(),
                updated_at: project.updated_at.toISOString(),
                tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
                status: project.status as ProjectStatus,
              };
              return (
                <AdminProjectCard
                  key={project.id}
                  project={dynamicProject}
                  secret={secret}
                  sprintCount={s.sprintCount}
                  prCount={s.prCount}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
