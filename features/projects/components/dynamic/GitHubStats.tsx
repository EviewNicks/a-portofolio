import { Clock, GitFork, Star, Users } from 'lucide-react';
import type { GitHubStats } from '@/features/projects/types';

interface GitHubStatsProps {
  stats: GitHubStats;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function GitHubStatsPanel({ stats }: GitHubStatsProps) {
  const metrics = [
    {
      label: 'Stars',
      value: stats.stars,
      icon: Star,
      testId: 'github-stat-stars',
    },
    {
      label: 'Forks',
      value: stats.forks,
      icon: GitFork,
      testId: 'github-stat-forks',
    },
    {
      label: 'Contributors',
      value: stats.contributors,
      icon: Users,
      testId: 'github-stat-contributors',
    },
    {
      label: 'Last Commit',
      value: stats.last_commit_date ? formatDate(stats.last_commit_date) : '—',
      icon: Clock,
      testId: 'github-stat-last-commit',
    },
  ];

  return (
    <section data-testid="github-stats-panel" className="editorial-surface mb-10 p-5 sm:p-6 animate-editorial-reveal">
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-line-soft pb-4">
        <span className="editorial-label">
          GitHub
          <span className="ix">· Stats</span>
        </span>
        <span data-testid="github-stats-fetched-at" className="editorial-meta">
          Fetched {formatDate(stats.fetched_at)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              data-testid={metric.testId}
              className="group rounded-2xl border border-line/40 bg-paper-warm/55 p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-coral/30 hover:bg-paper"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon size={18} className="text-coral" aria-hidden="true" />
                <span className="h-px flex-1 bg-line-soft" />
              </div>
              <div className="font-editorial-tight text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-1 font-editorial-tight text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
