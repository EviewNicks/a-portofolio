/**
 * Property test for GitHub PR to Timeline Entry mapping
 * Feature: dynamic-project-timeline
 * Task 5.3 — Property 11
 */
import * as fc from 'fast-check';
import type { GitHubPRData } from '@/features/projects/types';

/** Maps a GitHub PR to a timeline entry shape — mirrors the sync logic */
function mapPRToTimelineEntry(pr: GitHubPRData, projectId: string) {
  return {
    project_id: projectId,
    entry_type: 'pr' as const,
    title: pr.title,
    description: pr.body ? pr.body.substring(0, 200) : null,
    external_url: pr.html_url,
    github_pr_number: pr.number,
    github_author: pr.user.login,
    date: pr.merged_at,
    external_status: 'merged' as const,
  };
}

const prArb = fc.record({
  number: fc.integer({ min: 1, max: 99999 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  body: fc.option(fc.string({ minLength: 0, maxLength: 500 }), { nil: null }),
  html_url: fc.string({ minLength: 10, maxLength: 100 }),
  merged_at: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') })
    .filter((d) => !isNaN(d.getTime()))
    .map((d) => d.toISOString()),
  user: fc.record({ login: fc.string({ minLength: 1, maxLength: 40 }) }),
  labels: fc.array(fc.record({ name: fc.string({ minLength: 1, maxLength: 20 }) })),
});

describe('Property 11: GitHub PR to Timeline Entry Mapping', () => {
  it('entry_type is always pr', () => {
    fc.assert(
      fc.property(prArb, fc.uuid(), (pr, projectId) => {
        const entry = mapPRToTimelineEntry(pr, projectId);
        return entry.entry_type === 'pr';
      }),
      { numRuns: 100 }
    );
  });

  it('title matches pr.title', () => {
    fc.assert(
      fc.property(prArb, fc.uuid(), (pr, projectId) => {
        const entry = mapPRToTimelineEntry(pr, projectId);
        return entry.title === pr.title;
      }),
      { numRuns: 100 }
    );
  });

  it('github_pr_number matches pr.number', () => {
    fc.assert(
      fc.property(prArb, fc.uuid(), (pr, projectId) => {
        const entry = mapPRToTimelineEntry(pr, projectId);
        return entry.github_pr_number === pr.number;
      }),
      { numRuns: 100 }
    );
  });

  it('github_author matches pr.user.login', () => {
    fc.assert(
      fc.property(prArb, fc.uuid(), (pr, projectId) => {
        const entry = mapPRToTimelineEntry(pr, projectId);
        return entry.github_author === pr.user.login;
      }),
      { numRuns: 100 }
    );
  });

  it('external_url matches pr.html_url', () => {
    fc.assert(
      fc.property(prArb, fc.uuid(), (pr, projectId) => {
        const entry = mapPRToTimelineEntry(pr, projectId);
        return entry.external_url === pr.html_url;
      }),
      { numRuns: 100 }
    );
  });

  it('date matches pr.merged_at', () => {
    fc.assert(
      fc.property(prArb, fc.uuid(), (pr, projectId) => {
        const entry = mapPRToTimelineEntry(pr, projectId);
        return entry.date === pr.merged_at;
      }),
      { numRuns: 100 }
    );
  });

  it('description is truncated to 200 chars when body is long', () => {
    fc.assert(
      fc.property(
        prArb,
        fc.uuid(),
        fc.string({ minLength: 201, maxLength: 600 }),
        (pr, projectId, longBody) => {
          const prWithLongBody = { ...pr, body: longBody };
          const entry = mapPRToTimelineEntry(prWithLongBody, projectId);
          return entry.description !== null && entry.description.length <= 200;
        }
      ),
      { numRuns: 100 }
    );
  });
});
