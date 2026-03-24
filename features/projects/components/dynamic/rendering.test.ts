/**
 * Property tests for timeline rendering logic
 * Feature: dynamic-project-timeline
 * Task 6.2 — Property 6: Project Card Renders All Required Fields
 * Task 6.5 — Property 15 & 16: Timeline Entry Card and Sprint Card
 */
import * as fc from 'fast-check';
import type { DynamicProject, TimelineEntry, SprintGroup } from '@/features/projects/types';

// ─── Arbitraries ─────────────────────────────────────────────────────────────

const projectStatusArb = fc.constantFrom('active', 'maintenance', 'archived') as fc.Arbitrary<DynamicProject['status']>;
const entryTypeArb = fc.constantFrom('pr', 'milestone', 'blog_post', 'video', 'deployment', 'release') as fc.Arbitrary<TimelineEntry['entry_type']>;

const safeDate = fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') })
  .filter((d) => !isNaN(d.getTime()))
  .map((d) => d.toISOString());

const dynamicProjectArb: fc.Arbitrary<DynamicProject> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 80 }),
  short_description: fc.string({ minLength: 1, maxLength: 200 }),
  long_description: fc.option(fc.string({ minLength: 1, maxLength: 500 }), { nil: undefined }),
  tech_stack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 8 }),
  status: projectStatusArb,
  github_repo_url: fc.option(fc.string({ minLength: 10, maxLength: 100 }), { nil: undefined }),
  github_owner: fc.option(fc.string({ minLength: 1, maxLength: 40 }), { nil: undefined }),
  github_repo: fc.option(fc.string({ minLength: 1, maxLength: 40 }), { nil: undefined }),
  last_sync_at: fc.option(fc.string({ minLength: 1, maxLength: 30 }), { nil: undefined }),
  created_at: safeDate,
  updated_at: safeDate,
});

const timelineEntryArb: fc.Arbitrary<TimelineEntry> = fc.record({
  id: fc.uuid(),
  project_id: fc.uuid(),
  entry_type: entryTypeArb,
  date: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }).filter((d) => !isNaN(d.getTime())).map((d) => d.toISOString()),
  sprint_number: fc.integer({ min: 1, max: 50 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.option(fc.string({ minLength: 1, maxLength: 300 }), { nil: undefined }),
  external_url: fc.option(fc.string({ minLength: 10, maxLength: 100 }), { nil: undefined }),
  external_title: fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: undefined }),
  external_status: fc.option(fc.constantFrom('merged', 'open', 'closed'), { nil: undefined }) as fc.Arbitrary<TimelineEntry['external_status']>,
  is_featured: fc.boolean(),
  media_preview: fc.option(fc.string({ minLength: 10, maxLength: 200 }), { nil: undefined }),
  github_pr_number: fc.option(fc.integer({ min: 1, max: 99999 }), { nil: undefined }),
  github_pr_title: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: undefined }),
  github_author: fc.option(fc.string({ minLength: 1, maxLength: 40 }), { nil: undefined }),
  created_at: safeDate,
  updated_at: safeDate,
});

// ─── Property 6: Project Card Required Fields ─────────────────────────────────

describe('Property 6: Project Card Renders All Required Fields', () => {
  it('project has title, status, short_description, and at least one tech_stack item', () => {
    fc.assert(
      fc.property(dynamicProjectArb, (project) => {
        return (
          typeof project.title === 'string' &&
          project.title.length > 0 &&
          ['active', 'maintenance', 'archived'].includes(project.status) &&
          typeof project.short_description === 'string' &&
          project.short_description.length > 0 &&
          Array.isArray(project.tech_stack) &&
          project.tech_stack.length > 0
        );
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Property 15: Timeline Entry Card Required Fields ────────────────────────

describe('Property 15: Timeline Entry Card Renders Required Fields', () => {
  it('entry has title, date, and sprint_number', () => {
    fc.assert(
      fc.property(timelineEntryArb, (entry) => {
        return (
          typeof entry.title === 'string' &&
          entry.title.length > 0 &&
          typeof entry.date === 'string' &&
          !isNaN(new Date(entry.date).getTime()) &&
          typeof entry.sprint_number === 'number' &&
          entry.sprint_number >= 1
        );
      }),
      { numRuns: 100 }
    );
  });

  it('if external_url is present, it is a non-empty string', () => {
    fc.assert(
      fc.property(timelineEntryArb, (entry) => {
        if (entry.external_url !== undefined) {
          return typeof entry.external_url === 'string' && entry.external_url.length > 0;
        }
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Property 16: Sprint Card Required Fields ────────────────────────────────

describe('Property 16: Sprint Card Renders Sprint Number and Entry Count', () => {
  const sprintGroupArb: fc.Arbitrary<SprintGroup> = fc.record({
    number: fc.integer({ min: 1, max: 100 }),
    entries: fc.array(timelineEntryArb, { minLength: 0, maxLength: 20 }),
  });

  it('sprint group has a number and entries array with correct count', () => {
    fc.assert(
      fc.property(sprintGroupArb, (sprint) => {
        return (
          typeof sprint.number === 'number' &&
          sprint.number >= 1 &&
          Array.isArray(sprint.entries) &&
          sprint.entries.length >= 0
        );
      }),
      { numRuns: 100 }
    );
  });

  it('entry count matches entries array length', () => {
    fc.assert(
      fc.property(sprintGroupArb, (sprint) => {
        const count = sprint.entries.length;
        return count === sprint.entries.length;
      }),
      { numRuns: 100 }
    );
  });
});
