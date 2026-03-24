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
    <div data-testid="github-stats-panel" className="rounded-xl glass-card p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">GitHub Stats</h2>
        <span data-testid="github-stats-fetched-at" className="text-xs text-muted-foreground/60">
          Last updated: {formatDate(stats.fetched_at)}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Stars" value={stats.stars} testId="github-stat-stars" />
        <Stat label="Forks" value={stats.forks} testId="github-stat-forks" />
        <Stat label="Contributors" value={stats.contributors} testId="github-stat-contributors" />
        <Stat
          label="Last Commit"
          value={stats.last_commit_date ? formatDate(stats.last_commit_date) : '—'}
          testId="github-stat-last-commit"
        />
      </div>
    </div>
  );
}

function Stat({ label, value, testId }: { label: string; value: string | number; testId?: string }) {
  return (
    <div data-testid={testId} className="text-center">
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
