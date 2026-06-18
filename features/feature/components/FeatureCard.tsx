'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Cpu, ArrowRight } from 'lucide-react'
import type { ProjectFeature } from '@/features/projects/types'

interface FeatureCardProps {
  projectId: string;
  feature: ProjectFeature;
}

// Utility to create a plain text excerpt from markdown content
function getExcerpt(text: string | null | undefined, limit = 150): string {
  if (!text) return 'No description available.'
  
  // Basic markdown stripping (headers, bold, links)
  const cleanText = text
    .replace(/[#*`_~]/g, '') // Remove simple formatting characters
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Simplify links to just their text
    .replace(/\s+/g, ' ') // Collapse whitespaces
    .trim()

  if (cleanText.length <= limit) return cleanText
  return cleanText.substring(0, limit) + '...'
}

export function FeatureCard({ projectId, feature }: FeatureCardProps) {
  const searchParams = useSearchParams()
  const secret = searchParams?.get('secret') ?? ''

  // Build detail navigation URL
  const detailUrl = `/projects/${projectId}/features/${feature.id}${
    secret ? `?secret=${secret}` : ''
  }`

  // Retrieve the first image from media array as the thumbnail
  const thumbnailUrl = feature.media?.[0]?.public_url

  return (
    <Link
      href={detailUrl}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Media / Thumbnail area */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-muted/30 flex items-center justify-center">
            <Cpu size={40} className="text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
          </div>
        )}
        
        {feature.is_featured && (
          <span className="absolute top-3 right-3 rounded-full bg-yellow-500/10 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col p-5">
        <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
          {feature.title}
        </h4>
        
        <p className="mt-2 flex-1 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {getExcerpt(feature.description)}
        </p>

        {/* Tech Stack tags */}
        {feature.tech_stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {feature.tech_stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
            {feature.tech_stack.length > 3 && (
              <span className="text-[9px] text-muted-foreground self-center">
                +{feature.tech_stack.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
          <span>Explore Details</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
