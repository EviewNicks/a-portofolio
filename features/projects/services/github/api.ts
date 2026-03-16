import type { GitHubPRData, GitHubStats } from '@/features/projects/types';

const GITHUB_API_BASE = 'https://api.github.com';

function getAuthHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Extracts github_owner and github_repo from a GitHub repository URL.
 * Supports formats:
 *   https://github.com/{owner}/{repo}
 *   https://github.com/{owner}/{repo}.git
 *   https://github.com/{owner}/{repo}/
 *
 * Returns null if the URL is not a valid GitHub repo URL.
 */
export function extractGitHubOwnerRepo(
  url: string
): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;

    // pathname: /{owner}/{repo} or /{owner}/{repo}.git or /{owner}/{repo}/
    const parts = parsed.pathname
      .replace(/^\//, '')   // remove leading slash
      .replace(/\/$/, '')   // remove trailing slash
      .replace(/\.git$/, '') // remove .git suffix
      .split('/');

    if (parts.length < 2 || !parts[0] || !parts[1]) return null;

    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

/**
 * Fetches all merged PRs for a GitHub repository.
 * Returns raw GitHub PR data sorted by merged_at descending.
 */
export async function fetchGitHubPRs(
  owner: string,
  repo: string
): Promise<GitHubPRData[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=100`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
    next: { revalidate: 3600 }, // cache 1 hour
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${error}`);
  }

  const prs: GitHubPRData[] = await response.json();

  // Only return merged PRs (closed PRs include both merged and unmerged)
  return prs.filter((pr) => pr.merged_at !== null);
}

/**
 * Fetches repository statistics from GitHub API.
 * Includes stars, forks, contributors count, and last commit date.
 */
export async function fetchGitHubStats(
  owner: string,
  repo: string
): Promise<GitHubStats> {
  const headers = getAuthHeaders();

  // Fetch repo metadata and contributors in parallel
  const [repoResponse, contributorsResponse, commitsResponse] =
    await Promise.all([
      fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
        headers,
        next: { revalidate: 43200 }, // cache 12 hours
      }),
      fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=1&anon=false`,
        { headers, next: { revalidate: 43200 } }
      ),
      fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=1`,
        { headers, next: { revalidate: 43200 } }
      ),
    ]);

  if (!repoResponse.ok) {
    throw new Error(`GitHub API error ${repoResponse.status}`);
  }

  const repoData = await repoResponse.json();

  // Contributors count from Link header (total pages trick)
  let contributorsCount = 0;
  if (contributorsResponse.ok) {
    const linkHeader = contributorsResponse.headers.get('Link');
    if (linkHeader) {
      const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
      contributorsCount = lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
    } else {
      const contributors = await contributorsResponse.json();
      contributorsCount = Array.isArray(contributors) ? contributors.length : 0;
    }
  }

  // Last commit date
  let lastCommitDate: string | undefined;
  if (commitsResponse.ok) {
    const commits = await commitsResponse.json();
    if (Array.isArray(commits) && commits.length > 0) {
      lastCommitDate = commits[0]?.commit?.author?.date;
    }
  }

  return {
    stars: repoData.stargazers_count ?? 0,
    forks: repoData.forks_count ?? 0,
    contributors: contributorsCount,
    last_commit_date: lastCommitDate,
    fetched_at: new Date().toISOString(),
  };
}
