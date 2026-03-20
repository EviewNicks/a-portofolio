'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pencil, GitBranch, Trash2, ExternalLink } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';

interface AdminProjectDetailProps {
  project: DynamicProject;
  secret: string;
  timelineCount: number;
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400',
  maintenance: 'bg-yellow-500/10 text-yellow-400',
  archived: 'bg-gray-500/10 text-gray-400',
};

export function AdminProjectDetail({
  project,
  secret,
  timelineCount,
}: AdminProjectDetailProps) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}?secret=${secret}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push(`/admin/projects?secret=${secret}`);
      }
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_STYLES[project.status] ?? ''}`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{project.short_description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <Link
            href={`/admin/projects/${project.id}/edit?secret=${secret}`}
            data-testid="btn-edit-project-detail"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
          >
            <Pencil size={14} /> Edit
          </Link>
          <Link
            href={`/admin/projects/${project.id}/timeline?secret=${secret}`}
            data-testid="btn-manage-timeline"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
          >
            <GitBranch size={14} /> Timeline
          </Link>
          <button
            onClick={() => setConfirmDelete(true)}
            data-testid="btn-delete-project-detail"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg text-sm transition-colors"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.long_description && (
          <div className="sm:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Description
            </p>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">
              {project.long_description}
            </p>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tech_stack.length > 0 ? (
              project.tech_stack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-blue-600/20 text-blue-300 text-xs rounded-full"
                >
                  {t}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">—</span>
            )}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            GitHub
          </p>
          {project.github_repo_url ? (
            <div className="space-y-1">
              <a
                href={project.github_repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={13} />
                {project.github_owner}/{project.github_repo}
              </a>
              {project.last_sync_at && (
                <p className="text-xs text-gray-500">
                  Last sync:{' '}
                  {new Date(project.last_sync_at).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              )}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">No GitHub repo linked</span>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Timeline Entries
          </p>
          <p className="text-2xl font-bold text-white">{timelineCount}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Created
          </p>
          <p className="text-sm text-gray-300">
            {new Date(project.created_at).toLocaleDateString('id-ID', {
              dateStyle: 'long',
            })}
          </p>
        </div>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div data-testid="delete-project-detail-modal" className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full mx-4 space-y-4">
            <h3 className="font-semibold text-white">Delete Project?</h3>
            <p className="text-sm text-gray-400">
              This will permanently delete &quot;{project.title}&quot; and all
              its timeline entries. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                data-testid="btn-confirm-delete-detail"
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
