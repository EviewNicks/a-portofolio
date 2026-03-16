import type { YouTubePreview } from '@/features/projects/types';

/**
 * Extracts the YouTube video ID from various URL formats:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://www.youtube.com/v/VIDEO_ID
 *   https://www.youtube.com/shorts/VIDEO_ID
 *
 * Returns null if the URL does not match any known YouTube format.
 * A valid video ID is exactly 11 characters: alphanumeric, hyphens, underscores.
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  const patterns = [
    // Standard watch URL: youtube.com/watch?v=ID (exactly 11 chars, not followed by more ID chars)
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/,
    // Short URL: youtu.be/ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/,
    // Embed URL: youtube.com/embed/ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/,
    // Old format: youtube.com/v/ID
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/,
    // Shorts: youtube.com/shorts/ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

/**
 * Fetches video metadata from YouTube Data API v3.
 * Requires YOUTUBE_API_KEY environment variable.
 *
 * Throws an error if:
 * - API key is missing
 * - Video is not found
 * - API returns an error
 */
export async function fetchYouTubeMetadata(
  videoId: string
): Promise<YouTubePreview> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error('YOUTUBE_API_KEY environment variable is not set');
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error ${response.status}`);
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error(`Video not found: ${videoId}`);
  }

  const item = data.items[0];
  const snippet = item.snippet;
  const statistics = item.statistics;

  // Prefer maxres thumbnail, fall back to high, then default
  const thumbnail =
    snippet.thumbnails?.maxres?.url ??
    snippet.thumbnails?.high?.url ??
    snippet.thumbnails?.default?.url ??
    '';

  return {
    video_id: videoId,
    title: snippet.title ?? '',
    thumbnail_url: thumbnail,
    view_count: statistics?.viewCount ?? '0',
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}
