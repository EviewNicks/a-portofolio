'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectFeatureMedia } from '@/features/projects/types'

interface FeatureMediaGalleryProps {
  media: ProjectFeatureMedia[]
}

export function FeatureMediaGallery({ media }: FeatureMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const safeActiveIndex = activeIndex < media.length ? activeIndex : 0

  const showNext = useCallback(() => {
    setActiveIndex(prev => {
      const current = prev < media.length ? prev : 0
      return (current + 1) % media.length
    })
  }, [media.length])

  const showPrev = useCallback(() => {
    setActiveIndex(prev => {
      const current = prev < media.length ? prev : 0
      return (current - 1 + media.length) % media.length
    })
  }, [media.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        showNext()
      } else if (e.key === 'ArrowLeft') {
        showPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showNext, showPrev])

  if (media.length === 0) return null

  const activeMedia = media[safeActiveIndex]

  return (
    <div className="space-y-5">
      <div className="editorial-surface editorial-shadow group relative aspect-video w-full overflow-hidden rounded-2xl bg-bone">
        <Image
          src={activeMedia.public_url}
          alt={activeMedia.file_name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-contain transition-opacity duration-300"
          unoptimized
        />

        {media.length > 1 && (
          <>
            <button
              onClick={showPrev}
              className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 bg-ink/70 text-paper backdrop-blur-md transition-all hover:border-coral hover:bg-coral active:scale-95 sm:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={showNext}
              className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 bg-ink/70 text-paper backdrop-blur-md transition-all hover:border-coral hover:bg-coral active:scale-95 sm:right-4"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute right-4 bottom-4 rounded-full bg-ink/70 px-4 py-2 font-editorial-mono text-xs font-medium uppercase tracking-[0.08em] text-paper/90 backdrop-blur-md">
              <span className="font-semibold text-paper">{safeActiveIndex + 1}</span>
              <span className="mx-1 text-paper/40">/</span>
              <span>{media.length}</span>
            </div>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-line scrollbar-track-transparent">
          {media.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-paper-warm transition-all ${
                idx === safeActiveIndex
                  ? 'border-coral opacity-100 shadow-lg shadow-coral/10'
                  : 'border-transparent opacity-55 hover:opacity-85'
              }`}
              aria-label={`Show image ${idx + 1}`}
              aria-current={idx === safeActiveIndex ? 'true' : undefined}
            >
              <Image
                src={item.public_url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="112px"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
