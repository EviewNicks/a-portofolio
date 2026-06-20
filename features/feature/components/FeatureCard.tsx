'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Cpu } from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'

interface FeatureCardProps {
  projectId: string;
  feature: ProjectFeature;
}

function getExcerpt(text: string | null | undefined, limit = 150): string {
  if (!text) return 'No description available.'

  const cleanText = text
    .replace(/[#*`_~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleanText.length <= limit) return cleanText
  return cleanText.substring(0, limit) + '...'
}

export function FeatureCard({ projectId, feature }: FeatureCardProps) {
  const searchParams = useSearchParams()
  const secret = searchParams?.get('secret') ?? ''

  const detailUrl = `/projects/${projectId}/features/${feature.id}${
    secret ? `?secret=${secret}` : ''
  }`

  const thumbnailUrl = feature.media?.[0]?.public_url

  return (
    <Link
      href={detailUrl}
      className="group editorial-surface flex flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-paper-dark">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-coral/10 via-paper to-ink/5">
            <Cpu size={40} className="text-coral/50" aria-hidden="true" />
          </div>
        )}

        {feature.is_featured && (
          <span className="absolute right-3 top-3 rounded-full border border-coral/30 bg-coral/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-coral backdrop-blur">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-editorial-serif text-sm italic text-coral">
            {feature.display_order}.
          </span>
          <ArrowRight size={16} className="text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-coral" aria-hidden="true" />
        </div>

        <h4 className="font-editorial-tight text-base font-bold leading-tight tracking-[-0.01em] text-ink group-hover:text-coral">
          {feature.title}
        </h4>

        <p className="mt-3 flex-1 font-editorial-body text-sm leading-relaxed text-ink-mute">
          {getExcerpt(feature.description)}
        </p>

        {feature.tech_stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {feature.tech_stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="editorial-code border border-line/40 px-2 py-1 text-[0.62rem]"
              >
                {tech}
              </span>
            ))}
            {feature.tech_stack.length > 3 && (
              <span className="self-center font-editorial-mono text-[0.62rem] tracking-[0.04em] text-ink-faint">
                +{feature.tech_stack.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-editorial-tight text-xs font-bold uppercase tracking-[0.14em] text-coral">
          <span>Explore Details</span>
          <ArrowRight size={14} aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}
