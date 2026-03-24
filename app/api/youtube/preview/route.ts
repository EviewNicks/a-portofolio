import { NextRequest, NextResponse } from 'next/server';
import { extractYouTubeVideoId, fetchYouTubeMetadata } from '@/features/projects/services/youtube/api';

// POST /api/youtube/preview
// Body: { url: string }
// Returns: YouTubePreview data (stateless — not saved to DB)
export async function POST(request: NextRequest) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
  }

  // Validate URL format and extract video_id before calling YouTube API
  const videoId = extractYouTubeVideoId(url.trim());
  if (!videoId) {
    return NextResponse.json(
      { error: 'Invalid YouTube URL format. Supported formats: youtube.com/watch?v=, youtu.be/, youtube.com/embed/' },
      { status: 400 }
    );
  }

  // Fetch metadata from YouTube Data API v3
  try {
    const preview = await fetchYouTubeMetadata(videoId);
    return NextResponse.json({ data: preview });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'YouTube API error';

    if (message.includes('Video not found')) {
      return NextResponse.json(
        { error: `Video not found: ${videoId}` },
        { status: 404 }
      );
    }

    if (message.includes('YOUTUBE_API_KEY')) {
      console.error('[POST /api/youtube/preview] Missing API key');
      return NextResponse.json(
        { error: 'YouTube API is not configured' },
        { status: 500 }
      );
    }

    console.error('[POST /api/youtube/preview]', error);
    return NextResponse.json(
      { error: `YouTube API error: ${message}` },
      { status: 500 }
    );
  }
}
