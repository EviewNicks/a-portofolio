/**
 * Property tests and unit tests for project features validation utility functions
 * Feature: project-features-showcase
 */
import * as fc from 'fast-check';
import { validateFeatureInput, validateMediaFile } from './validation';

describe('validateFeatureInput', () => {
  // Feature: project-features-showcase, Property 1: Title Validation
  // Validates: Requirements 2.1, 2.8
  it('Property 1: rejects empty, whitespace-only, or overly long titles, and accepts valid ones', () => {
    // 1. Whitespace only or empty should be invalid
    fc.assert(
      fc.property(
        fc.string().map((s) => s.replace(/\S/g, ' ')), // replace all non-whitespace with spaces
        (whitespaceTitle) => {
          const result = validateFeatureInput({ title: whitespaceTitle });
          expect(result.valid).toBe(false);
          expect(result.errors.title).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );

    // 2. Titles longer than 200 characters should be invalid
    fc.assert(
      fc.property(
        fc.string({ minLength: 201, maxLength: 300 }),
        (longTitle) => {
          const result = validateFeatureInput({ title: longTitle });
          expect(result.valid).toBe(false);
          expect(result.errors.title).toBe('Title must not exceed 200 characters');
        }
      ),
      { numRuns: 100 }
    );

    // 3. Titles between 1 and 200 characters (non-whitespace) should be valid (when other fields are valid)
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        (validTitle) => {
          const result = validateFeatureInput({ title: validTitle });
          expect(result.valid).toBe(true);
          expect(result.errors.title).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: project-features-showcase, Property 2: Description Length Validation
  // Validates: Requirements 2.2, 2.8, 7.5
  it('Property 2: rejects description exceeding 50000 characters and accepts shorter ones', () => {
    // 1. Description longer than 50000 characters should be invalid
    fc.assert(
      fc.property(
        fc.string({ minLength: 50001, maxLength: 51000 }),
        (longDesc) => {
          const result = validateFeatureInput({
            title: 'Valid Title',
            description: longDesc,
          });
          expect(result.valid).toBe(false);
          expect(result.errors.description).toBe('Description must not exceed 50000 characters');
        }
      ),
      { numRuns: 100 }
    );

    // 2. Description equal to or less than 50000 characters should be valid
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 1000 }),
        (validDesc) => {
          const result = validateFeatureInput({
            title: 'Valid Title',
            description: validDesc,
          });
          expect(result.valid).toBe(true);
          expect(result.errors.description).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: project-features-showcase, Property 3: YouTube URL Format Validation
  // Validates: Requirements 2.3, 8.1, 8.3
  it('Property 3: accepts only valid YouTube URL formats', () => {
    const validYouTubeUrls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=123_456-abc',
      'https://youtu.be/123-abc_XYZ',
    ];

    // Valid ones pass
    for (const url of validYouTubeUrls) {
      const result = validateFeatureInput({
        title: 'Valid Title',
        youtube_url: url,
      });
      expect(result.valid).toBe(true);
      expect(result.errors.youtube_url).toBeUndefined();
    }

    // Invalid ones fail
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.trim().length > 0 && !s.startsWith('https://www.youtube.com/watch?v=') && !s.startsWith('https://youtu.be/')),
        (invalidUrl) => {
          const result = validateFeatureInput({
            title: 'Valid Title',
            youtube_url: invalidUrl,
          });
          expect(result.valid).toBe(false);
          expect(result.errors.youtube_url).toBe('Invalid YouTube URL format');
        }
      ),
      { numRuns: 100 }
    );

    // Exceeding 2048 characters fails
    const extremelyLongUrl = 'https://youtu.be/' + 'a'.repeat(2040);
    const result = validateFeatureInput({
      title: 'Valid Title',
      youtube_url: extremelyLongUrl,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.youtube_url).toBe('YouTube URL must not exceed 2048 characters');
  });

  // Feature: project-features-showcase, Property 4: Demo URL Protocol Validation
  // Validates: Requirements 2.4, 2.8
  it('Property 4: accepts only URLs starting with http:// or https://', () => {
    // Valid HTTP/HTTPS URLs pass
    fc.assert(
      fc.property(
        fc.constantFrom('http://', 'https://'),
        fc.string({ minLength: 1, maxLength: 50 }).filter((s) => !s.includes('/') && s.length > 0),
        (protocol, domain) => {
          const url = `${protocol}${domain}`;
          const result = validateFeatureInput({
            title: 'Valid Title',
            demo_url: url,
          });
          expect(result.valid).toBe(true);
          expect(result.errors.demo_url).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );

    // Invalid protocols fail
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.trim().length > 0 && !s.startsWith('http://') && !s.startsWith('https://')),
        (invalidUrl) => {
          const result = validateFeatureInput({
            title: 'Valid Title',
            demo_url: invalidUrl,
          });
          expect(result.valid).toBe(false);
          expect(result.errors.demo_url).toBe('Demo URL must start with http:// or https://');
        }
      ),
      { numRuns: 100 }
    );

    // Exceeding 2048 characters fails
    const extremelyLongUrl = 'https://' + 'a'.repeat(2045);
    const result = validateFeatureInput({
      title: 'Valid Title',
      demo_url: extremelyLongUrl,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.demo_url).toBe('Demo URL must not exceed 2048 characters');
  });

  // Tech stack validation test
  it('rejects tech stack with more than 50 items', () => {
    const tooManyTags = Array(51).fill('React');
    const result = validateFeatureInput({
      title: 'Valid Title',
      tech_stack: tooManyTags,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.tech_stack).toBe('Tech stack must not exceed 50 items');
  });
});

describe('validateMediaFile', () => {
  // Feature: project-features-showcase, Property 9: Media File Type Validation
  // Validates: Requirements 3.3
  it('Property 9: accepts only JPEG, PNG, GIF, and WebP, and rejects other types', () => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    // Allowed types pass
    for (const mime of allowedMimeTypes) {
      const error = validateMediaFile(mime, 1024);
      expect(error).toBeNull();
    }

    // Disallowed types fail
    fc.assert(
      fc.property(
        fc.string().filter((s) => !allowedMimeTypes.includes(s)),
        (invalidMime) => {
          const error = validateMediaFile(invalidMime, 1024);
          expect(error).toBe('Unsupported file format. Please upload JPEG, PNG, GIF, or WebP');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('rejects files larger than 10MB', () => {
    const maxSize = 10 * 1024 * 1024;
    expect(validateMediaFile('image/png', maxSize)).toBeNull();
    expect(validateMediaFile('image/png', maxSize + 1)).toBe('File size exceeds 10 MB limit');
  });
});
