/**
 * Property and unit tests for project features storage path construction
 * Feature: project-features-showcase
 */
import * as fc from 'fast-check';
import { buildFeatureMediaPath, getFeatureMediaBucket } from './storage';

describe('buildFeatureMediaPath', () => {
  // Feature: project-features-showcase, Property 8: Storage Path Construction
  // Validates: Requirements 3.1
  it('Property 8: produces path with sanitized filename containing only alphanumeric, dot, underscore, and hyphen', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.string({ minLength: 1 }),
        (featureId, filename) => {
          const path = buildFeatureMediaPath(featureId, filename);
          expect(path.startsWith(`feature-media/${featureId}/`)).toBe(true);
          
          const parts = path.split('/');
          const sanitizedFilename = parts[parts.length - 1];
          
          // Verify it matches the sanitized regex: alphanumeric, dot, underscore, hyphen only
          expect(/^[a-zA-Z0-9._-]+$/.test(sanitizedFilename)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('correctly handles specific filenames with special characters', () => {
    const featureId = 'test-id';
    
    // Normal file
    expect(buildFeatureMediaPath(featureId, 'image.jpg')).toBe('feature-media/test-id/image.jpg');
    
    // Filename with spaces and special chars
    expect(buildFeatureMediaPath(featureId, 'my image #1!.jpg')).toBe('feature-media/test-id/my_image__1_.jpg');
    
    // Path traversal attempt
    expect(buildFeatureMediaPath(featureId, '../../etc/passwd')).toBe('feature-media/test-id/.._.._etc_passwd');
  });
});

describe('getFeatureMediaBucket', () => {
  it('returns the correct bucket name', () => {
    expect(getFeatureMediaBucket()).toBe('public');
  });
});
