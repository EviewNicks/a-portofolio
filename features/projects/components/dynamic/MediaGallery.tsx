import type { ProjectMedia, TimelineEntry } from '@/features/projects/types';

interface MediaGalleryProps {
  media: ProjectMedia[];
  videoEntries: TimelineEntry[];
}

export function MediaGallery({ media, videoEntries }: MediaGalleryProps) {
  if (media.length === 0 && videoEntries.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Media</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Screenshots */}
        {media.map((item) => (
          <div key={item.id} className="rounded-lg overflow-hidden border border-white/10 aspect-video bg-white/5">
            <img
              src={item.public_url}
              alt={item.file_name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* YouTube thumbnails */}
        {videoEntries.map((entry) => (
          <a
            key={entry.id}
            href={entry.external_url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-lg overflow-hidden border border-white/10 aspect-video bg-white/5 block"
          >
            {entry.media_preview ? (
              <img src={entry.media_preview} alt={entry.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                {entry.title}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-3xl">▶️</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
