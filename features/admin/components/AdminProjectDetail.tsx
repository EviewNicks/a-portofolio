'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pencil, GitBranch, Trash2, ExternalLink, Tag, Github, Clock, Calendar } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';

interface AdminProjectDetailProps {
  project: DynamicProject;
  secret: string;
  timelineCount: number;
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  maintenance: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  archived: 'bg-muted text-muted-foreground border border-border',
};

export function AdminProjectDetail({
  project,
  secret,
  timelineCount,
}: AdminProjectDetailProps) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Guard: tech_stack may be null/undefined from DB
  const techStack: string[] = Array.isArray(project.tech_stack) ? project.tech_stack : [];

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
    <div className="space-y-6" style={{ fontFamily: 'var(--font-poppins)' }}>
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {project.title}
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[project.status] ?? 'bg-muted text-muted-foreground'}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{project.short_description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0 flex-wrap">
            <Link
              href={`/admin/projects/${project.id}/edit?secret=${secret}`}
              data-testid="btn-edit-project-detail"
              className="flex items-center gap-1.5 px-3 py-2 bg-background hover:bg-muted border border-border text-muted-foreground hover:text-foreground rounded-xl text-sm transition-all"
            >
              <Pencil size={14} /> Edit
            </Link>
            <Link
              href={`/admin/projects/${project.id}/timeline?secret=${secret}`}
              data-testid="btn-manage-timeline"
              className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-xl text-sm transition-all"
            >
              <GitBranch size={14} /> Timeline
            </Link>
            <button
              onClick={() => setConfirmDelete(true)}
              data-testid="btn-delete-project-detail"
              className="flex items-center gap-1.5 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 text-destructive rounded-xl text-sm transition-all"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Long description — full width */}
        {project.long_description && (
          <div className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 space-y-2 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {project.long_description}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techStack.length > 0 ? (
              techStack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/20 text-xs font-medium rounded-full"
                >
                  {t}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">—</span>
            )}
          </div>
        </div>

        {/* GitHub */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Github size={14} className="text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              GitHub
            </p>
          </div>
          {project.github_repo_url ? (
            <div className="space-y-1.5">
              <a
                href={project.github_repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={13} />
                {project.github_owner}/{project.github_repo}
              </a>
              {project.last_sync_at && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={11} />
                  Last sync:{' '}
                  {new Date(project.last_sync_at).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">No GitHub repo linked</span>
          )}
        </div>

        {/* Timeline count */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <GitBranch size={14} className="text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Timeline Entries
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground">{timelineCount}</p>
        </div>

        {/* Created */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Created
            </p>
          </div>
          <p className="text-sm text-foreground">
            {new Date(project.created_at).toLocaleDateString('id-ID', {
              dateStyle: 'long',
            })}
          </p>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div
          data-testid="delete-project-detail-modal"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4 shadow-xl">
            <h3 className="font-semibold text-foreground">Delete Project?</h3>
            <p className="text-sm text-muted-foreground">
              This will permanently delete &quot;{project.title}&quot; and all
              its timeline entries. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                data-testid="btn-confirm-delete-detail"
                className="px-4 py-2 text-sm bg-destructive hover:bg-destructive/90 text-white rounded-xl transition-all disabled:opacity-50"
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
