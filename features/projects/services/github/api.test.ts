/**
 * Property tests for GitHub API utility functions
 * Feature: dynamic-project-timeline
 */
import * as fc from 'fast-check';
import { extractGitHubOwnerRepo } from './api';

// Arbitrary for valid GitHub username/repo name segments
// GitHub allows alphanumeric, hyphens, underscores, dots (but not starting with dot)
const validSegment = fc
  .stringMatching(/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,38}$/)
  .filter((s) => s.length > 0);

describe('extractGitHubOwnerRepo', () => {
  /**
   * Property 1: GitHub URL Extraction Correctness
   * For any valid GitHub repository URL in formats
   * https://github.com/{owner}/{repo} or https://github.com/{owner}/{repo}.git,
   * extracting owner and repo should return the correct owner and repo strings
   * without trailing slashes or .git suffix.
   * Validates: Requirements 1.2
   */
  it('Property 1: extracts correct owner and repo from standard GitHub URLs', () => {
    fc.assert(
      fc.property(validSegment, validSegment, (owner, repo) => {
        const url = `https://github.com/${owner}/${repo}`;
        const result = extractGitHubOwnerRepo(url);
        expect(result).not.toBeNull();
        expect(result!.owner).toBe(owner);
        expect(result!.repo).toBe(repo);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 1: extracts correct owner and repo from .git URLs', () => {
    fc.assert(
      fc.property(validSegment, validSegment, (owner, repo) => {
        const url = `https://github.com/${owner}/${repo}.git`;
        const result = extractGitHubOwnerRepo(url);
        expect(result).not.toBeNull();
        expect(result!.owner).toBe(owner);
        // repo should NOT have .git suffix
        expect(result!.repo).toBe(repo);
        expect(result!.repo).not.toMatch(/\.git$/);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 1: extracts correct owner and repo from trailing-slash URLs', () => {
    fc.assert(
      fc.property(validSegment, validSegment, (owner, repo) => {
        const url = `https://github.com/${owner}/${repo}/`;
        const result = extractGitHubOwnerRepo(url);
        expect(result).not.toBeNull();
        expect(result!.owner).toBe(owner);
        expect(result!.repo).toBe(repo);
      }),
      { numRuns: 100 }
    );
  });

  // Edge cases: invalid URLs should return null
  it('returns null for non-GitHub URLs', () => {
    const invalidUrls = [
      'https://gitlab.com/owner/repo',
      'https://bitbucket.org/owner/repo',
      'not-a-url',
      '',
      'https://github.com/only-owner',
      'https://github.com/',
    ];
    for (const url of invalidUrls) {
      expect(extractGitHubOwnerRepo(url)).toBeNull();
    }
  });

  it('returns null for arbitrary non-GitHub strings', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => !s.includes('github.com')),
        (randomString) => {
          const result = extractGitHubOwnerRepo(randomString);
          expect(result).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
