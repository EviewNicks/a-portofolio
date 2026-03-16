import type {
  TimelineEntry,
  SprintGroup,
  ValidationResult,
} from '@/features/projects/types';

const VALID_PROJECT_STATUSES = ['active', 'maintenance', 'archived'] as const;

const VALID_ENTRY_TYPES = [
  'pr',
  'milestone',
  'blog_post',
  'video',
  'deployment',
  'release',
] as const;

/**
 * Groups timeline entries by sprint_number.
 * Returns sprint groups sorted by sprint_number ascending.
 * Within each group, entries are sorted by date ascending.
 */
export function groupEntriesBySprint(entries: TimelineEntry[]): SprintGroup[] {
  const map = new Map<number, TimelineEntry[]>();

  for (const entry of entries) {
    const existing = map.get(entry.sprint_number);
    if (existing) {
      existing.push(entry);
    } else {
      map.set(entry.sprint_number, [entry]);
    }
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([number, sprintEntries]) => ({
      number,
      entries: sprintEntries.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }));
}

/**
 * Validates project creation/update input.
 * Returns { valid: true, errors: [] } on success.
 */
export function validateProjectInput(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid input: expected an object'] };
  }

  const input = data as Record<string, unknown>;

  // title: required, non-empty/non-whitespace
  if (typeof input.title !== 'string' || input.title.trim() === '') {
    errors.push('title is required and must be a non-empty string');
  }

  // short_description: required, non-empty/non-whitespace
  if (
    typeof input.short_description !== 'string' ||
    input.short_description.trim() === ''
  ) {
    errors.push('short_description is required and must be a non-empty string');
  }

  // status: must be one of the valid values
  if (
    input.status !== undefined &&
    !VALID_PROJECT_STATUSES.includes(
      input.status as (typeof VALID_PROJECT_STATUSES)[number]
    )
  ) {
    errors.push(`status must be one of: ${VALID_PROJECT_STATUSES.join(', ')}`);
  }

  // tech_stack: must be an array if provided
  if (input.tech_stack !== undefined && !Array.isArray(input.tech_stack)) {
    errors.push('tech_stack must be an array of strings');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates timeline entry creation input.
 * Returns { valid: true, errors: [] } on success.
 */
export function validateTimelineEntryInput(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid input: expected an object'] };
  }

  const input = data as Record<string, unknown>;

  // project_id: required
  if (typeof input.project_id !== 'string' || input.project_id.trim() === '') {
    errors.push('project_id is required');
  }

  // entry_type: required, must be valid
  if (
    typeof input.entry_type !== 'string' ||
    !VALID_ENTRY_TYPES.includes(
      input.entry_type as (typeof VALID_ENTRY_TYPES)[number]
    )
  ) {
    errors.push(`entry_type must be one of: ${VALID_ENTRY_TYPES.join(', ')}`);
  }

  // date: required, must be a valid date string
  if (typeof input.date !== 'string' || input.date.trim() === '') {
    errors.push('date is required');
  } else if (isNaN(new Date(input.date).getTime())) {
    errors.push('date must be a valid ISO date string');
  }

  // sprint_number: required, must be integer >= 1
  if (typeof input.sprint_number !== 'number') {
    errors.push('sprint_number is required and must be a number');
  } else if (!Number.isInteger(input.sprint_number) || input.sprint_number < 1) {
    errors.push('sprint_number must be an integer greater than or equal to 1');
  }

  // title: required, non-empty
  if (typeof input.title !== 'string' || input.title.trim() === '') {
    errors.push('title is required and must be a non-empty string');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates the admin secret against the configured ADMIN_SECRET_KEY.
 * Returns true only if the provided secret exactly matches the env var.
 * Never exposes the expected secret value.
 */
export function validateAdminSecret(secret: string | undefined | null): boolean {
  const validSecret = process.env.ADMIN_SECRET_KEY;
  if (!validSecret || !secret) return false;
  return secret === validSecret;
}
