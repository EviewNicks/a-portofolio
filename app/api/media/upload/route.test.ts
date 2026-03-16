/**
 * Property test untuk image file type validation
 * Feature: dynamic-project-timeline
 * Property 17: Image File Type Validation — Validates: Requirements 7.2, 7.3
 */
import * as fc from 'fast-check';
import {
  validateMediaFile,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} from '@/features/projects/services/media/api';

const invalidMimeArb = fc
  .string({ minLength: 1, maxLength: 50 })
  .filter((s) => !(ALLOWED_MIME_TYPES as readonly string[]).includes(s) && s.trim().length > 0);

const validMimeArb = fc.constantFrom(...ALLOWED_MIME_TYPES);
const validSizeArb = fc.integer({ min: 0, max: MAX_FILE_SIZE_BYTES });
const oversizedArb = fc.integer({ min: MAX_FILE_SIZE_BYTES + 1, max: MAX_FILE_SIZE_BYTES * 3 });

describe('Image File Type Validation', () => {
  it('Property 17a: invalid MIME types are rejected', () => {
    fc.assert(
      fc.property(invalidMimeArb, validSizeArb, (mimeType, size) => {
        const result = validateMediaFile(mimeType, size);
        expect(result).not.toBeNull();
        expect(result).toContain('Invalid file type');
      }),
      { numRuns: 100 }
    );
  });

  it('Property 17b: valid MIME type and size <= 5MB are accepted', () => {
    fc.assert(
      fc.property(validMimeArb, validSizeArb, (mimeType, size) => {
        const result = validateMediaFile(mimeType, size);
        expect(result).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it('Property 17c: files exceeding 5MB are rejected', () => {
    fc.assert(
      fc.property(validMimeArb, oversizedArb, (mimeType, size) => {
        const result = validateMediaFile(mimeType, size);
        expect(result).not.toBeNull();
        expect(result).toContain('5MB');
      }),
      { numRuns: 100 }
    );
  });

  it('edge: exactly 5MB is accepted', () => {
    expect(validateMediaFile('image/jpeg', MAX_FILE_SIZE_BYTES)).toBeNull();
  });

  it('edge: 5MB + 1 byte is rejected', () => {
    expect(validateMediaFile('image/jpeg', MAX_FILE_SIZE_BYTES + 1)).not.toBeNull();
  });

  it('edge: all three valid MIME types pass', () => {
    for (const mime of ALLOWED_MIME_TYPES) {
      expect(validateMediaFile(mime, 1024)).toBeNull();
    }
  });
});
