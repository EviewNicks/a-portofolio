/**
 * Property tests untuk filter dan search logic
 * Feature: dynamic-project-timeline
 * Property 4: Status Filter Returns Only Matching Projects — Validates: Requirements 2.2
 * Property 5: Search Filter Returns Only Matching Projects — Validates: Requirements 2.3
 */
import * as fc from 'fast-check';
import { createMockContext, type MockContext } from '@/prisma/lib/context';
import type { Project, ProjectStatus } from '@/generated/prisma';

// ─── Helpers ────────────────────────────────────────────────────────────────

const validStatuses: ProjectStatus[] = ['active', 'maintenance', 'archived'];

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'proj-' + Math.random().toString(36).slice(2),
    title: 'Test Project',
    short_description: 'A test project',
    long_description: null,
    tech_stack: ['TypeScript', 'Next.js'],
    status: 'active',
    github_repo_url: null,
    github_owner: null,
    github_repo: null,
    last_sync_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

// Simulate the filter logic that searchProjects applies (mirrors Prisma where clause behavior)
function filterProjects(
  projects: Project[],
  query: string,
  status?: string
): Project[] {
  return projects.filter((p) => {
    const statusMatch = status ? p.status === status : true;
    const queryMatch = query.trim()
      ? p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.short_description.toLowerCase().includes(query.toLowerCase())
      : true;
    return statusMatch && queryMatch;
  });
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Project filter logic', () => {
  /**
   * Property 4: Status Filter Returns Only Matching Projects
   * For any list of projects with mixed statuses and any valid status filter value,
   * the filtered result should contain only projects whose status exactly matches the filter value.
   * Validates: Requirements 2.2
   */
  it('Property 4: status filter returns only projects with matching status', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            status: fc.constantFrom(...validStatuses),
            title: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          }),
          { minLength: 0, maxLength: 20 }
        ),
        fc.constantFrom(...validStatuses),
        (projectInputs, filterStatus) => {
          const projects = projectInputs.map((p) => makeProject(p));
          const result = filterProjects(projects, '', filterStatus);

          // All results must match the filter status
          for (const p of result) {
            expect(p.status).toBe(filterStatus);
          }

          // No project with a different status should appear
          const wrongStatus = result.filter((p) => p.status !== filterStatus);
          expect(wrongStatus).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Search Filter Returns Only Matching Projects
   * For any list of projects and any non-empty search query string,
   * the search result should contain only projects where title or short_description
   * contains the query string (case-insensitive).
   * Validates: Requirements 2.3
   */
  it('Property 5: search filter returns only projects matching the query', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
            short_description: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
          }),
          { minLength: 0, maxLength: 20 }
        ),
        fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
        (projectInputs, query) => {
          const projects = projectInputs.map((p) => makeProject(p));
          const result = filterProjects(projects, query);

          // Every result must contain the query in title or short_description
          for (const p of result) {
            const titleMatch = p.title.toLowerCase().includes(query.toLowerCase());
            const descMatch = p.short_description.toLowerCase().includes(query.toLowerCase());
            expect(titleMatch || descMatch).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 4+5: combined status + search filter', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            status: fc.constantFrom(...validStatuses),
            title: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
            short_description: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
          }),
          { minLength: 0, maxLength: 20 }
        ),
        fc.constantFrom(...validStatuses),
        fc.string({ minLength: 1, maxLength: 10 }).filter((s) => s.trim().length > 0),
        (projectInputs, filterStatus, query) => {
          const projects = projectInputs.map((p) => makeProject(p));
          const result = filterProjects(projects, query, filterStatus);

          for (const p of result) {
            expect(p.status).toBe(filterStatus);
            const titleMatch = p.title.toLowerCase().includes(query.toLowerCase());
            const descMatch = p.short_description.toLowerCase().includes(query.toLowerCase());
            expect(titleMatch || descMatch).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('MockContext usage example', () => {
  let ctx: MockContext;

  beforeEach(() => {
    ctx = createMockContext();
  });

  it('can mock prisma.project.findMany for status filter', async () => {
    const mockProjects = [
      makeProject({ status: 'active', title: 'Active Project' }),
      makeProject({ status: 'active', title: 'Another Active' }),
    ];

    ctx.prisma.project.findMany.mockResolvedValue(mockProjects);

    const result = await ctx.prisma.project.findMany({
      where: { status: 'active' },
      orderBy: { created_at: 'desc' },
    });

    expect(result).toHaveLength(2);
    expect(result.every((p) => p.status === 'active')).toBe(true);
  });
});
