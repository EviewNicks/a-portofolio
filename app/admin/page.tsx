import Link from 'next/link';
import { getAllProjects } from '@/lib/supabase/queries/projects';
import { getTimelineEntriesByProjectId } from '@/lib/supabase/queries/timeline';
import { FolderOpen, GitBranch, Clock, Plus } from 'lucide-react';

interface AdminOverviewPageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default async function AdminOverviewPage({
  searchParams,
}: AdminOverviewPageProps) {
  const params = await searchParams;
  const secret = params?.secret ?? '';

  const projects = await getAllProjects();

  // Count total timeline entries across all projects
  let totalEntries = 0;
  let lastSyncAt: Date | null = null;

  for (const project of projects) {
    const entries = await getTimelineEntriesByProjectId(project.id);
    totalEntries += entries.length;

    if (project.last_sync_at) {
      const syncDate = new Date(project.last_sync_at);
      if (!lastSyncAt || syncDate > lastSyncAt) {
        lastSyncAt = syncDate;
      }
    }
  }

  const activeProjects = projects.filter((p) => p.status === 'active').length;

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: GitBranch,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      label: 'Timeline Entries',
      value: totalEntries,
      icon: Clock,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          Portfolio admin dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4"
          >
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Last sync info */}
      {lastSyncAt && (
        <p className="text-xs text-gray-500">
          Last GitHub sync:{' '}
          {lastSyncAt.toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
      )}

      {/* Quick actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/projects?secret=${secret}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
          >
            <FolderOpen size={16} />
            View All Projects
          </Link>
          <Link
            href={`/admin/projects/new?secret=${secret}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
          >
            <Plus size={16} />
            New Project
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Recent Projects
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {project.status}
                  </p>
                </div>
                <Link
                  href={`/admin/projects/${project.id}?secret=${secret}`}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Manage →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
