'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Pencil, Trash2, Eye, GitBranch, Plus } from 'lucide-react'
import type { DynamicProject } from '@/features/projects/types'

interface ProjectRow extends DynamicProject {
  _count?: {
    timeline_entries: number
  }
}

interface AdminProjectListProps {
  projects: ProjectRow[]
  secret: string
  onDelete: (id: string) => void
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400',
  maintenance: 'bg-yellow-500/10 text-yellow-400',
  archived: 'bg-gray-500/10 text-gray-400',
}

export function AdminProjectList({
  projects,
  secret,
  onDelete,
}: AdminProjectListProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/projects/${id}?secret=${secret}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        onDelete(id)
      }
    } finally {
      setDeleting(false)
      setConfirmId(null)
    }
  }

  if (projects.length === 0) {
    return (
      <div
        data-testid="project-list-empty"
        className="py-16 text-center text-gray-500"
      >
        <p>No projects yet.</p>
        <Link
          href={`/admin/projects/new?secret=${secret}`}
          className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <Plus size={14} /> Create your first project
        </Link>
      </div>
    )
  }

  return (
    <>
      <div
        data-testid="project-table"
        className="overflow-x-auto rounded-xl border border-gray-800"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50">
              <th className="px-4 py-3 text-left font-medium text-gray-400">
                Project
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">
                Status
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-gray-400 sm:table-cell">
                Last Sync
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {projects.map(project => (
              <tr
                key={project.id}
                data-testid="project-row"
                data-project-id={project.id}
                className="bg-gray-900 hover:bg-gray-800/50"
              >
                <td className="px-4 py-3">
                  <p
                    data-testid="project-row-title"
                    className="font-medium text-white"
                  >
                    {project.title}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                    {project.short_description}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span
                    data-testid="project-row-status"
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[project.status] ?? ''}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-xs text-gray-500 sm:table-cell">
                  {project.last_sync_at
                    ? new Date(project.last_sync_at).toLocaleDateString('id-ID')
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/projects/${project.id}?secret=${secret}`}
                      data-testid="btn-view-project"
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                      title="View"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/edit?secret=${secret}`}
                      data-testid="btn-edit-project"
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/timeline?secret=${secret}`}
                      data-testid="btn-timeline-project"
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                      title="Timeline"
                    >
                      <GitBranch size={15} />
                    </Link>
                    <button
                      onClick={() => setConfirmId(project.id)}
                      data-testid="btn-delete-project"
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-400/10 hover:text-red-400"
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
        <div
          data-testid="delete-project-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div className="mx-4 w-full max-w-sm space-y-4 rounded-xl border border-gray-700 bg-gray-900 p-6">
            <h3 className="font-semibold text-white">Delete Project?</h3>
            <p className="text-sm text-gray-400">
              This will permanently delete the project and all its timeline
              entries. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                data-testid="btn-cancel-delete"
                className="px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deleting}
                data-testid="btn-confirm-delete"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
