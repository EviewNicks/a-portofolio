'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { AlertCircle } from 'lucide-react'

interface YouTubeEmbedProps {
  url: string
  title?: string
}

export function getYouTubeId(url: string): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('?')[0]
    }
    if (
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'm.youtube.com'
    ) {
      return parsed.searchParams.get('v')
    }
  } catch {
    // Regex fallback
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    if (match && match[2] && match[2].length === 11) {
      return match[2]
    }
  }
  return null
}

function YouTubePlayer({ url, title }: YouTubeEmbedProps) {
  const videoId = getYouTubeId(url)

  if (!videoId) {
    throw new Error('Invalid YouTube URL')
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`

  return (
    <div className="editorial-surface editorial-shadow relative aspect-video w-full overflow-hidden rounded-2xl bg-ink">
      <iframe
        src={embedUrl}
        title={title || 'YouTube video player'}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

function VideoErrorFallback() {
  return (
    <div className="editorial-surface flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center">
      <AlertCircle className="text-coral" size={40} strokeWidth={1.5} />
      <div>
        <p className="font-editorial-tight font-semibold text-ink">Video unavailable</p>
        <p className="mt-1 font-editorial-body text-xs text-ink-faint">
          The video stream could not be loaded or the URL is malformed.
        </p>
      </div>
    </div>
  )
}

export function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  if (!url) return null

  return (
    <ErrorBoundary FallbackComponent={VideoErrorFallback}>
      <YouTubePlayer url={url} title={title} />
    </ErrorBoundary>
  )
}
