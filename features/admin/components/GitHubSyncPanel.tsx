'use client';

import { useState } from 'react';
import { RefreshCw, Github } from 'lucide-react';
import type { DynamicProject } from '@/features/projects/types';

interface GitHubSyncPanelProps {
  project: DynamicProject;
  secret: string;
  onSyncComplete: (updated: DynamicProject) => void;
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

export function GitHubSyncPanel({
  project,
  secret,
  onSyncComplete,
}: GitHubSyncPanelProps) {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{ added: number } | null>(null);
  const [error, setError] = useState('');

  const handleSync = async () => {
    setError('');
    setResult(null);
    setSyncing(true);
    try {
      const res = await fetch(`/api/github/sync?secret=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: project.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Sync failed.');
        return;
      }
      setResult({ added: data.added ?? 0 });
      // Refresh project to get updated last_sync_at
      const updated = await fetch(`/api/projects/${project.id}`).then((r) =>
        r.ok ? r.json() : project
      );
      onSyncComplete(updated);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

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
          <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm text-gray-300">
                {project.github_owner}/{project.github_repo}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {project.last_sync_at
                  ? `Last synced ${relativeTime(project.last_sync_at)}`
                  : 'Never synced'}
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>

          {result && (
            <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-2 rounded-lg">
              Sync complete — {result.added} new PR{result.added !== 1 ? 's' : ''} added.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
