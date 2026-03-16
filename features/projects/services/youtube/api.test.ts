/**
 * Property tests for YouTube API utility functions
 * Feature: dynamic-project-timeline, Property 13: YouTube URL Video ID Extraction
 */
import * as fc from 'fast-check';
import { extractYouTubeVideoId } from './api';

// A valid YouTube video ID is exactly 11 chars: alphanumeric, hyphens, underscores
const validVideoId = fc.stringMatching(/^[a-zA-Z0-9_-]{11}$/);

describe('extractYouTubeVideoId', () => {
  /**
   * Property 13: YouTube URL Video ID Extraction
   * For any valid YouTube URL in standard formats, extracting the video_id should
   * return an 11-character alphanumeric/hyphen/underscore string.
   * For any URL that does not match a known YouTube URL pattern, extraction should return null.
   * Validates: Requirements 6.1, 6.6
   */

  it('Property 13: extracts 11-char video ID from youtube.com/watch?v= URLs', () => {
    fc.assert(
      fc.property(validVideoId, (videoId) => {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        const result = extractYouTubeVideoId(url);
        expect(result).toBe(videoId);
        expect(result).toHaveLength(11);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 13: extracts 11-char video ID from youtu.be/ short URLs', () => {
    fc.assert(
      fc.property(validVideoId, (videoId) => {
        const url = `https://youtu.be/${videoId}`;
        const result = extractYouTubeVideoId(url);
        expect(result).toBe(videoId);
        expect(result).toHaveLength(11);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 13: extracts 11-char video ID from youtube.com/embed/ URLs', () => {
    fc.assert(
      fc.property(validVideoId, (videoId) => {
        const url = `https://www.youtube.com/embed/${videoId}`;
        const result = extractYouTubeVideoId(url);
        expect(result).toBe(videoId);
        expect(result).toHaveLength(11);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 13: extracts 11-char video ID from youtube.com/shorts/ URLs', () => {
    fc.assert(
      fc.property(validVideoId, (videoId) => {
        const url = `https://www.youtube.com/shorts/${videoId}`;
        const result = extractYouTubeVideoId(url);
        expect(result).toBe(videoId);
        expect(result).toHaveLength(11);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 13: extracts 11-char video ID from youtube.com/watch with extra params', () => {
    fc.assert(
      fc.property(validVideoId, (videoId) => {
        const url = `https://www.youtube.com/watch?t=30&v=${videoId}&feature=share`;
        const result = extractYouTubeVideoId(url);
        expect(result).toBe(videoId);
        expect(result).toHaveLength(11);
      }),
      { numRuns: 100 }
    );
  });

  // Edge cases: invalid/non-YouTube URLs should return null
  it('returns null for non-YouTube URLs', () => {
    const invalidUrls = [
      'https://vimeo.com/123456789',
      'https://dailymotion.com/video/abc',
      'not-a-url',
      '',
      'https://youtube.com/',
      'https://youtube.com/watch',
      'https://youtube.com/watch?v=',
      'https://youtube.com/watch?v=tooshort',   // < 11 chars
      'https://youtube.com/watch?v=toolongvideoid123', // > 11 chars
    ];
    for (const url of invalidUrls) {
      expect(extractYouTubeVideoId(url)).toBeNull();
    }
  });

  it('Property 13: returns null for arbitrary non-YouTube strings', () => {
    fc.assert(
      fc.property(
        fc.string().filter(
          (s) =>
            !s.includes('youtube.com') &&
            !s.includes('youtu.be')
        ),
        (randomString) => {
          const result = extractYouTubeVideoId(randomString);
          expect(result).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
