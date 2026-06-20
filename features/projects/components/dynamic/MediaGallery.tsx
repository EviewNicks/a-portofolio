'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Image as ImageIcon, Maximize2, Play, X } from 'lucide-react';
import type { ProjectMedia, TimelineEntry } from '@/features/projects/types';

interface MediaGalleryProps {
  media: ProjectMedia[];
  videoEntries: TimelineEntry[];
}

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
  caption: string;
  meta: string;
  externalUrl?: string;
};

export function MediaGallery({ media, videoEntries }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: MediaItem[] = [
    ...media.map((item, index) => ({
      id: item.id,
      type: 'image' as const,
      src: item.public_url,
      alt: item.file_name,
      title: item.file_name,
      caption: 'Project media capture',
      meta: `Screen ${String(index + 1).padStart(2, '0')}`,
    })),
    ...videoEntries.map((entry, index) => ({
      id: entry.id,
      type: 'video' as const,
      src: entry.media_preview ?? '',
      alt: entry.title,
      title: entry.title,
      caption: entry.description ?? 'Video walkthrough',
      meta: `Video ${String(index + 1).padStart(2, '0')}`,
      externalUrl: entry.external_url,
    })),
  ];

  useEffect(() => {
    if (activeIndex === null || items.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === null ? null : (current - 1 + items.length) % items.length));
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? null : (current + 1) % items.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items.length]);

  if (items.length === 0) return null;

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section className="relative isolate mb-20 mt-20 overflow-hidden rounded-[2rem] bg-ink p-6 text-paper shadow-2xl sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'><filter id=\'n2\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n2)\'/></svg>")',
          backgroundSize: '240px 240px',
        }}
      />

      <div className="relative">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper/20 pt-4">
          <span className="editorial-meta">Gallery / Media</span>
          <span className="text-coral font-editorial-serif italic">Visual assets</span>
          <span className="editorial-meta">002 / 004</span>
        </div>

        <div className="mb-8">
          <span className="editorial-label text-coral before:bg-coral">
            Gallery
            <span className="ix">· {items.length} assets</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const isVideo = item.type === 'video';
            const ItemIcon = isVideo ? Play : Maximize2;

            return (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-paper text-ink shadow-2xl transition-transform duration-300 hover:-translate-y-1"
                style={{
                  transform: `rotate(${(index % 2 === 0 ? -1.2 : 0.9) * (index < 6 ? 1 : 0)}deg) translateY(${index < 6 ? Math.min(index * 3, 18) : 0}px)`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/60"
                  aria-label={`Open ${item.title}`}
                >
                  <div className="relative aspect-video overflow-hidden bg-paper-dark">
                    {item.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-paper-dark p-6 text-center font-editorial-mono text-xs uppercase tracking-[0.04em] text-ink-faint">
                        <div className="flex items-center gap-2">
                          <ImageIcon size={18} aria-hidden="true" />
                          {item.title}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                      <ItemIcon size={32} className="text-paper" aria-hidden="true" />
                    </div>
                    <span className="absolute left-3 top-3 rounded bg-paper/90 px-2 py-1 font-editorial-tight text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
                      {isVideo ? 'Video' : 'Screen'}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="font-editorial-tight text-[0.65rem] font-bold uppercase tracking-[0.18em] text-coral">
                        {isVideo ? 'Walkthrough' : 'Capture'}
                      </span>
                      <span className="font-editorial-mono text-[0.65rem] tracking-[0.04em] text-ink-faint">
                        {item.meta}
                      </span>
                    </div>
                    <h3 className="font-editorial-tight text-base font-bold leading-tight tracking-[-0.01em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 font-editorial-body text-sm leading-relaxed text-ink-mute">
                      {item.caption}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-editorial-tight text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint">
                      <span className="text-coral font-semibold">2026 · Project</span>
                      <span>{isVideo ? 'External' : 'Screen capture'}</span>
                    </div>
                  </div>
                </button>

                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-paper/90 p-2 text-ink shadow-sm backdrop-blur transition hover:bg-coral hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/60"
                    aria-label={`Open video ${item.title}`}
                  >
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 inline-flex rounded-full border border-paper/20 bg-paper/10 p-3 text-paper transition hover:bg-coral hover:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/60"
            aria-label="Close media preview"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div
            className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-paper/10 bg-paper shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="aspect-video bg-paper-dark">
              {activeItem.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeItem.src} alt={activeItem.alt} className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center font-editorial-mono text-sm uppercase tracking-[0.04em] text-ink-faint">
                  {activeItem.title}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-4">
              <div>
                <div className="font-editorial-tight text-sm font-bold uppercase tracking-[0.18em] text-coral">
                  {activeItem.type === 'video' ? 'Video walkthrough' : 'Image preview'}
                </div>
                <h3 className="mt-1 font-editorial-tight text-lg font-bold text-ink">{activeItem.title}</h3>
              </div>
              {activeItem.externalUrl && (
                <a
                  href={activeItem.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-editorial-mono text-xs text-ink-soft transition hover:border-coral hover:text-coral"
                >
                  Open source
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
