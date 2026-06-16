'use client'

import { useState } from 'react'
import { RefreshCw, Github } from 'lucide-react'
import type { DynamicProject } from '@/features/projects/types'

interface GitHubSyncPanelProps {
  project: DynamicProject
  secret: string
  onSyncComplete: (updated: DynamicProject) => void
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days !== 1 ? 's' : ''} ago`
}

export function GitHubSyncPanel({
  project,
  secret,
  onSyncComplete,
}: GitHubSyncPanelProps) {
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState<{ added: number } | null>(null)
  const [error, setError] = useState('')

  const handleSync = async () => {
    setError('')
    setResult(null)
    setSyncing(true)
    try {
      const res = await fetch(`/api/github/sync?secret=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: project.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Sync failed.')
        return
      }
      setResult({ added: data.added ?? 0 })
      // Refresh project to get updated last_sync_at
      const response = await fetch(`/api/projects/${project.id}`).then(r =>
        r.ok ? r.json() : null
      )
      onSyncComplete(response?.data ?? project)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Github size={18} className="text-gray-400" />
        <h3 className="text-base font-semibold text-white">GitHub Sync</h3>
      </div>

      {!project.github_repo_url ? (
        <p className="text-sm text-gray-500">
          No GitHub repo linked to this project. Add a GitHub URL in the project
          settings to enable sync.
        </p>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
            <div>
              <p className="text-sm text-gray-300">
                {project.github_owner}/{project.github_repo}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {project.last_sync_at
                  ? `Last synced ${relativeTime(project.last_sync_at)}`
                  : 'Never synced'}
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              data-testid="btn-sync-now"
              className="flex items-center gap-1.5 rounded-lg bg-gray-700 px-3 py-1.5 text-sm text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
            >
              <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>

          {result && (
            <p
              data-testid="sync-result"
              className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400"
            >
              Sync complete — {result.added} new PR
              {result.added !== 1 ? 's' : ''} added.
            </p>
          )}

          {error && (
            <p
              data-testid="sync-error"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
