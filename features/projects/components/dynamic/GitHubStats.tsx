import type { GitHubStats } from '@/features/projects/types';

interface GitHubStatsProps {
  stats: GitHubStats;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function GitHubStatsPanel({ stats }: GitHubStatsProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">GitHub Stats</h2>
        <span className="text-xs text-white/30">
          Last updated: {formatDate(stats.fetched_at)}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Stars" value={stats.stars} />
        <Stat label="Forks" value={stats.forks} />
        <Stat label="Contributors" value={stats.contributors} />
        <Stat
          label="Last Commit"
          value={stats.last_commit_date ? formatDate(stats.last_commit_date) : '—'}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/40 mt-0.5">{label}</div>
    </div>
  );
}
