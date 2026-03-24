/**
 * Property tests for core timeline utility functions
 * Feature: dynamic-project-timeline
 */
import * as fc from 'fast-check';
import {
  groupEntriesBySprint,
  validateProjectInput,
  validateTimelineEntryInput,
  validateAdminSecret,
} from './timeline';
import type { TimelineEntry } from '@/features/projects/types';

// ─── Arbitraries ────────────────────────────────────────────────────────────

const validEntryTypes = [
  'pr',
  'milestone',
  'blog_post',
  'video',
  'deployment',
  'release',
] as const;

const validStatuses = ['active', 'maintenance', 'archived'] as const;

const timelineEntryArb = fc.record<TimelineEntry>({
  id: fc.uuid(),
  project_id: fc.uuid(),
  entry_type: fc.constantFrom(...validEntryTypes),
  date: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') })
    .filter((d) => !isNaN(d.getTime()))
    .map((d) => d.toISOString()),
  sprint_number: fc.integer({ min: 1, max: 50 }),
  title: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
  is_featured: fc.boolean(),
  created_at: fc.constant(new Date().toISOString()),
  updated_at: fc.constant(new Date().toISOString()),
});

// ─── groupEntriesBySprint ────────────────────────────────────────────────────

describe('groupEntriesBySprint', () => {
  /**
   * Property 7: Sprint Grouping Produces Unique, Ascending Sprint Numbers
   * Validates: Requirements 3.4
   */
  it('Property 7: produces unique sprint numbers in ascending order', () => {
    fc.assert(
      fc.property(fc.array(timelineEntryArb, { maxLength: 50 }), (entries) => {
        const groups = groupEntriesBySprint(entries);
        const sprintNumbers = groups.map((g) => g.number);

        // (a) each sprint_number appears exactly once
        const uniqueNumbers = new Set(sprintNumbers);
        expect(uniqueNumbers.size).toBe(sprintNumbers.length);

        // (b) groups are sorted ascending
        for (let i = 1; i < sprintNumbers.length; i++) {
          expect(sprintNumbers[i]).toBeGreaterThan(sprintNumbers[i - 1]);
        }

        // (c) every entry appears in exactly one group
        const allEntryIds = groups.flatMap((g) => g.entries.map((e) => e.id));
        expect(allEntryIds.length).toBe(entries.length);
        expect(new Set(allEntryIds).size).toBe(entries.length);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Entries Within Sprint Are Sorted by Date Ascending
   * Validates: Requirements 4.6
   */
  it('Property 8: entries within each sprint are sorted by date ascending', () => {
    fc.assert(
      fc.property(fc.array(timelineEntryArb, { maxLength: 50 }), (entries) => {
        const groups = groupEntriesBySprint(entries);
        for (const group of groups) {
          for (let i = 1; i < group.entries.length; i++) {
            const prev = new Date(group.entries[i - 1].date).getTime();
            const curr = new Date(group.entries[i].date).getTime();
            expect(curr).toBeGreaterThanOrEqual(prev);
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('returns empty array for empty input', () => {
    expect(groupEntriesBySprint([])).toEqual([]);
  });
});

// ─── validateProjectInput ────────────────────────────────────────────────────

describe('validateProjectInput', () => {
  /**
   * Property 2: Project Status Validation
   * Validates: Requirements 1.5
   */
  it('Property 2: accepts only valid status values', () => {
    // Valid statuses pass
    for (const status of validStatuses) {
      const result = validateProjectInput({
        title: 'Test',
        short_description: 'Desc',
        status,
        tech_stack: [],
      });
      expect(result.valid).toBe(true);
    }

    // Invalid statuses fail
    fc.assert(
      fc.property(
        fc.string().filter((s) => !(validStatuses as readonly string[]).includes(s)),
        (invalidStatus) => {
          const result = validateProjectInput({
            title: 'Test',
            short_description: 'Desc',
            status: invalidStatus,
            tech_stack: [],
          });
          expect(result.valid).toBe(false);
          expect(result.errors.some((e) => e.includes('status'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Project Creation Requires Non-Empty Title and Description
   * Validates: Requirements 1.6
   */
  it('Property 3: rejects whitespace-only or empty title', () => {
    fc.assert(
      fc.property(
        fc.string().map((s) => s.replace(/\S/g, ' ')), // force all-whitespace
        (whitespaceTitle) => {
          const result = validateProjectInput({
            title: whitespaceTitle,
            short_description: 'Valid description',
            tech_stack: [],
          });
          expect(result.valid).toBe(false);
          expect(result.errors.some((e) => e.includes('title'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: rejects whitespace-only or empty short_description', () => {
    fc.assert(
      fc.property(
        fc.string().map((s) => s.replace(/\S/g, ' ')),
        (whitespaceDesc) => {
          const result = validateProjectInput({
            title: 'Valid title',
            short_description: whitespaceDesc,
            tech_stack: [],
          });
          expect(result.valid).toBe(false);
          expect(result.errors.some((e) => e.includes('short_description'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: accepts non-whitespace title and description', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (title, desc) => {
          const result = validateProjectInput({
            title,
            short_description: desc,
            tech_stack: [],
          });
          expect(result.valid).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── validateTimelineEntryInput ──────────────────────────────────────────────

describe('validateTimelineEntryInput', () => {
  /**
   * Property 9: Timeline Entry Type Validation
   * Validates: Requirements 4.1
   */
  it('Property 9: accepts only valid entry_type values', () => {
    // Valid types pass
    for (const entryType of validEntryTypes) {
      const result = validateTimelineEntryInput({
        project_id: 'proj-1',
        entry_type: entryType,
        date: new Date().toISOString(),
        sprint_number: 1,
        title: 'Test entry',
      });
      expect(result.valid).toBe(true);
    }

    // Invalid types fail
    fc.assert(
      fc.property(
        fc.string().filter((s) => !(validEntryTypes as readonly string[]).includes(s)),
        (invalidType) => {
          const result = validateTimelineEntryInput({
            project_id: 'proj-1',
            entry_type: invalidType,
            date: new Date().toISOString(),
            sprint_number: 1,
            title: 'Test entry',
          });
          expect(result.valid).toBe(false);
          expect(result.errors.some((e) => e.includes('entry_type'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Timeline Entry Required Fields Validation
   * Validates: Requirements 4.2, 4.3
   */
  it('Property 10: rejects sprint_number less than 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ max: 0 }),
        (invalidSprint) => {
          const result = validateTimelineEntryInput({
            project_id: 'proj-1',
            entry_type: 'milestone',
            date: new Date().toISOString(),
            sprint_number: invalidSprint,
            title: 'Test',
          });
          expect(result.valid).toBe(false);
          expect(result.errors.some((e) => e.includes('sprint_number'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 10: rejects missing required fields', () => {
    const requiredFields = ['project_id', 'entry_type', 'date', 'sprint_number', 'title'];
    const validBase = {
      project_id: 'proj-1',
      entry_type: 'milestone',
      date: new Date().toISOString(),
      sprint_number: 1,
      title: 'Test',
    };

    for (const field of requiredFields) {
      const input = { ...validBase, [field]: undefined };
      const result = validateTimelineEntryInput(input);
      expect(result.valid).toBe(false);
    }
  });

  it('accepts valid complete entry', () => {
    const result = validateTimelineEntryInput({
      project_id: 'proj-1',
      entry_type: 'pr',
      date: '2026-03-01T00:00:00.000Z',
      sprint_number: 2,
      title: 'Add feature X',
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

// ─── validateAdminSecret ─────────────────────────────────────────────────────

describe('validateAdminSecret', () => {
  /**
   * Property 14: Admin Secret Validation Rejects Non-Matching Strings
   * Validates: Requirements 8.1, 8.2, 8.3
   */
  it('Property 14: returns false when ADMIN_SECRET_KEY is not set', () => {
    const original = process.env.ADMIN_SECRET_KEY;
    delete process.env.ADMIN_SECRET_KEY;

    fc.assert(
      fc.property(fc.string(), (anySecret) => {
        expect(validateAdminSecret(anySecret)).toBe(false);
      }),
      { numRuns: 100 }
    );

    process.env.ADMIN_SECRET_KEY = original;
  });

  it('Property 14: returns false for any string that does not match the secret', () => {
    const secret = 'my-super-secret-key-12345';
    process.env.ADMIN_SECRET_KEY = secret;

    fc.assert(
      fc.property(
        fc.string().filter((s) => s !== secret),
        (wrongSecret) => {
          expect(validateAdminSecret(wrongSecret)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );

    delete process.env.ADMIN_SECRET_KEY;
  });

  it('returns true only for the exact matching secret', () => {
    const secret = 'exact-secret-abc123';
    process.env.ADMIN_SECRET_KEY = secret;

    expect(validateAdminSecret(secret)).toBe(true);
    expect(validateAdminSecret(secret + ' ')).toBe(false);
    expect(validateAdminSecret(secret.toUpperCase())).toBe(false);
    expect(validateAdminSecret('')).toBe(false);
    expect(validateAdminSecret(null)).toBe(false);
    expect(validateAdminSecret(undefined)).toBe(false);

    delete process.env.ADMIN_SECRET_KEY;
  });
});
