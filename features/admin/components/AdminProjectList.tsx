'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Pencil, Trash2, Eye, GitBranch, Plus } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';

interface ProjectRow extends DynamicProject {
  _count?: {
    timeline_entries: number;
  };
}

interface AdminProjectListProps {
  projects: ProjectRow[];
  secret: string;
  onDelete: (id: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400',
  maintenance: 'bg-yellow-500/10 text-yellow-400',
  archived: 'bg-gray-500/10 text-gray-400',
};

export function AdminProjectList({
  projects,
  secret,
  onDelete,
}: AdminProjectListProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${id}?secret=${secret}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onDelete(id);
      }
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div data-testid="project-list-empty" className="text-center py-16 text-gray-500">
        <p>No projects yet.</p>
        <Link
          href={`/admin/projects/new?secret=${secret}`}
          className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <Plus size={14} /> Create your first project
        </Link>
      </div>
    );
  }

  return (
    <>
      <div data-testid="project-table" className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50">
              <th className="text-left px-4 py-3 text-gray-400 font-medium">
                Project
              </th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium">
                Status
              </th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden sm:table-cell">
                Last Sync
              </th>
              <th className="text-right px-4 py-3 text-gray-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {projects.map((project) => (
              <tr key={project.id} data-testid="project-row" data-project-id={project.id} className="bg-gray-900 hover:bg-gray-800/50">
                <td className="px-4 py-3">
                  <p data-testid="project-row-title" className="font-medium text-white">{project.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {project.short_description}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span
                    data-testid="project-row-status"
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_STYLES[project.status] ?? ''}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">
                  {project.last_sync_at
                    ? new Date(project.last_sync_at).toLocaleDateString('id-ID')
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/projects/${project.id}?secret=${secret}`}
                      data-testid="btn-view-project"
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      title="View"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/edit?secret=${secret}`}
                      data-testid="btn-edit-project"
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/timeline?secret=${secret}`}
                      data-testid="btn-timeline-project"
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      title="Timeline"
                    >
                      <GitBranch size={15} />
                    </Link>
                    <button
                      onClick={() => setConfirmId(project.id)}
                      data-testid="btn-delete-project"
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      {confirmId && (
        <div data-testid="delete-project-modal" className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full mx-4 space-y-4">
            <h3 className="font-semibold text-white">Delete Project?</h3>
            <p className="text-sm text-gray-400">
              This will permanently delete the project and all its timeline
              entries. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                data-testid="btn-cancel-delete"
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deleting}
                data-testid="btn-confirm-delete"
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
