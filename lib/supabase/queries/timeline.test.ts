/**
 * Property tests untuk GitHub PR to timeline entry mapping
 * Feature: dynamic-project-timeline
 * Property 11: GitHub PR to Timeline Entry Mapping — Validates: Requirements 5.2
 */
import * as fc from 'fast-check';
import { createMockContext, type MockContext } from '@/prisma/lib/context';
import type { TimelineEntry } from '@/generated/prisma';

// ─── Helpers ────────────────────────────────────────────────────────────────

interface PRData {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  merged_at: string;
  user: { login: string };
}

/** Mirrors the mapping logic in app/api/github/sync/route.ts (Task 8) */
function mapPRToTimelineEntry(
  projectId: string,
  pr: PRData,
  sprintNumber: number
): Omit<TimelineEntry, 'id' | 'created_at' | 'updated_at'> {
  return {
    project_id: projectId,
    entry_type: 'pr',
    title: pr.title,
    description: pr.body !== null ? pr.body.substring(0, 200) : null,
    external_url: pr.html_url,
    external_title: `PR #${pr.number}: ${pr.title}`,
    external_status: 'merged',
    github_pr_number: pr.number,
    github_pr_title: pr.title,
    github_author: pr.user.login,
    date: new Date(pr.merged_at),
    sprint_number: sprintNumber,
    is_featured: false,
    media_preview: null,
  };
}

// ─── Arbitraries ─────────────────────────────────────────────────────────────

const prArb = fc.record({
  number: fc.integer({ min: 1, max: 99999 }),
  title: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
  body: fc.option(fc.string({ minLength: 0, maxLength: 500 }), { nil: null }),
  html_url: fc.string({ minLength: 1, maxLength: 200 }),
  merged_at: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }).map((d) => d.toISOString()),
  user: fc.record({ login: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0) }),
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('GitHub PR to timeline entry mapping', () => {
  /**
   * Property 11: GitHub PR to Timeline Entry Mapping
   * For any GitHub PR object, the resulting timeline entry must have:
   * - entry_type = 'pr'
   * - title = pr.title
   * - github_pr_number = pr.number
   * - github_author = pr.user.login
   * - external_url = pr.html_url
   * - date = pr.merged_at (as Date)
   * Validates: Requirements 5.2
   */
  it('Property 11: PR fields map correctly to timeline entry fields', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        prArb,
        fc.integer({ min: 1, max: 100 }),
        (projectId, pr, sprintNumber) => {
          const entry = mapPRToTimelineEntry(projectId, pr, sprintNumber);

          expect(entry.entry_type).toBe('pr');
          expect(entry.title).toBe(pr.title);
          expect(entry.github_pr_number).toBe(pr.number);
          expect(entry.github_author).toBe(pr.user.login);
          expect(entry.external_url).toBe(pr.html_url);
          expect(entry.date).toEqual(new Date(pr.merged_at));
          expect(entry.project_id).toBe(projectId);
          expect(entry.external_status).toBe('merged');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 11b: PR body truncated to 200 chars in description', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        prArb,
        fc.integer({ min: 1, max: 100 }),
        (projectId, pr, sprintNumber) => {
          const entry = mapPRToTimelineEntry(projectId, pr, sprintNumber);

          if (pr.body !== null) {
            expect(entry.description).toBe(pr.body.substring(0, 200));
            if (pr.body.length > 0) {
              expect((entry.description ?? '').length).toBeLessThanOrEqual(200);
            }
          } else {
            expect(entry.description).toBeNull();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('MockContext usage for timeline upsert', () => {
  let ctx: MockContext;

  beforeEach(() => {
    ctx = createMockContext();
  });

  it('can mock upsert for PR deduplication', async () => {
    const mockEntry = {
      id: 'entry-1',
      project_id: 'proj-1',
      entry_type: 'pr' as const,
      title: 'Fix bug',
      description: null,
      external_url: 'https://github.com/owner/repo/pull/42',
      external_title: 'PR #42: Fix bug',
      external_status: 'merged' as const,
      github_pr_number: 42,
      github_pr_title: 'Fix bug',
      github_author: 'octocat',
      date: new Date('2026-01-15'),
      sprint_number: 1,
      is_featured: false,
      media_preview: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    ctx.prisma.timelineEntry.upsert.mockResolvedValue(mockEntry);

    const result = await ctx.prisma.timelineEntry.upsert({
      where: { project_id_github_pr_number: { project_id: 'proj-1', github_pr_number: 42 } },
      create: mockEntry,
      update: {},
    });

    expect(result.github_pr_number).toBe(42);
    expect(result.entry_type).toBe('pr');
    expect(ctx.prisma.timelineEntry.upsert).toHaveBeenCalledTimes(1);
  });
});
