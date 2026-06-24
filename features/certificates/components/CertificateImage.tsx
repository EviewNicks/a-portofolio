'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CertificateImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Whether to apply the hover zoom effect (used on detail page) */
  zoomOnHover?: boolean;
}

/**
 * CertificateImage
 *
 * Next.js Image wrapper with 4:3 aspect ratio, subtle filters,
 * and a graceful fallback placeholder if the image fails to load.
 * Mirrors the pattern used in CertificationCard inside LearningProgress.tsx.
 */
export const CertificateImage: React.FC<CertificateImageProps> = ({
  src,
  alt,
  className,
  zoomOnHover = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        'relative aspect-4/3 rounded-[14px] overflow-hidden',
        'bg-paper-dark border border-line-soft',
        className,
      )}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            'object-cover',
            'saturate-[0.92] contrast-[1.03]',
            'transition-transform duration-500 ease-out',
            zoomOnHover && 'group-hover:scale-[1.035]',
          )}
          unoptimized={src.startsWith('http')}
          onError={() => setHasError(true)}
        />
      ) : (
        /* Fallback placeholder */
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-paper-dark gap-3"
          aria-hidden="true"
        >
          <svg
            className="w-10 h-10 text-ink-faint"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p
            className="text-[11px] text-ink-faint tracking-[0.08em] text-center"
            style={{ fontFamily: 'var(--font-editorial-mono)' }}
          >
            Certificate image
            <br />
            unavailable
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateImage;
