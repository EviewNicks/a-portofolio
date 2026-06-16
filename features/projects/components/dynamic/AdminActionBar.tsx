'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Pencil, GitBranch, Trash2 } from 'lucide-react'
import type { DynamicProject } from '@/features/projects/types'

interface AdminActionBarProps {
  project: DynamicProject
  secret: string
}

export function AdminActionBar({ project, secret }: AdminActionBarProps) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/projects/${project.id}?secret=${secret}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.push('/projects')
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred while deleting')
    } finally {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  return (
    <>
      {/* Admin Action Bar */}
      <div
        data-testid="admin-action-bar"
        className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-sm backdrop-blur-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Admin Mode
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/projects/${project.id}/edit?secret=${secret}`}
              data-testid="btn-edit-project"
              className="bg-background hover:bg-muted border-border text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-all"
            >
              <Pencil size={14} /> Edit
            </Link>
            <Link
              href={`/admin/projects/${project.id}/timeline?secret=${secret}`}
              data-testid="btn-manage-timeline"
              className="bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-all"
            >
              <GitBranch size={14} /> Timeline
            </Link>
            <button
              onClick={() => setConfirmDelete(true)}
              data-testid="btn-delete-project"
              className="bg-destructive/10 hover:bg-destructive/20 border-destructive/20 text-destructive flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-all"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div
          data-testid="delete-project-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className="bg-card border-border mx-4 w-full max-w-sm space-y-4 rounded-2xl border p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-foreground font-semibold">Delete Project?</h3>
            <p className="text-muted-foreground text-sm">
              This will permanently delete &quot;{project.title}&quot; and all
              its timeline entries. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                data-testid="btn-confirm-delete"
                className="bg-destructive hover:bg-destructive/90 rounded-xl px-4 py-2 text-sm text-white transition-all disabled:opacity-50"
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
