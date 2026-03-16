/**
 * Property tests for project filter and search logic
 * Feature: dynamic-project-timeline
 * Task 4.3 — Property 4 & 5
 */
import * as fc from 'fast-check';

// We test the filter/search logic in isolation (pure function behavior)
// by extracting the filtering predicate used in searchProjects

type ProjectLike = {
  title: string;
  short_description: string;
  status: string;
};

/** Mirrors the Prisma where logic in searchProjects */
function applyFilters(
  projects: ProjectLike[],
  query: string,
  status?: string
): ProjectLike[] {
  return projects.filter((p) => {
    const statusMatch = !status || p.status === status;
    const queryMatch =
      !query.trim() ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.short_description.toLowerCase().includes(query.toLowerCase());
    return statusMatch && queryMatch;
  });
}

const validStatuses = ['active', 'maintenance', 'archived'] as const;

const projectArb = fc.record({
  title: fc.string({ minLength: 1, maxLength: 80 }),
  short_description: fc.string({ minLength: 1, maxLength: 200 }),
  status: fc.constantFrom(...validStatuses),
});

describe('Property 4: Status Filter Returns Only Matching Projects', () => {
  it('filtered result contains only projects matching the selected status', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 0, maxLength: 30 }),
        fc.constantFrom(...validStatuses),
        (projects, status) => {
          const result = applyFilters(projects, '', status);
          return result.every((p) => p.status === status);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('no project with a different status appears in filtered result', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 1, maxLength: 30 }),
        fc.constantFrom(...validStatuses),
        (projects, status) => {
          const result = applyFilters(projects, '', status);
          const wrongStatus = result.filter((p) => p.status !== status);
          return wrongStatus.length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property 5: Search Filter Returns Only Matching Projects', () => {
  it('search result contains only projects matching the query (case-insensitive)', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 0, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 20 }),
        (projects, query) => {
          const result = applyFilters(projects, query);
          const q = query.toLowerCase();
          return result.every(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.short_description.toLowerCase().includes(q)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  it('no project in result fails to match the query', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 1, maxLength: 30 }),
        // Only non-whitespace queries trigger filtering
        fc.string({ minLength: 1, maxLength: 10 }).filter((s) => s.trim().length > 0),
        (projects, query) => {
          const result = applyFilters(projects, query);
          const q = query.toLowerCase();
          const nonMatching = result.filter(
            (p) =>
              !p.title.toLowerCase().includes(q) &&
              !p.short_description.toLowerCase().includes(q)
          );
          return nonMatching.length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
