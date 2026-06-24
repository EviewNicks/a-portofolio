'use client'

import React from 'react'
import heroData from '@/docs/data/hero-section.json'
import { HeroSectionData } from '@/lib/types/portfolio'

/**
 * WireSection Component - Tech Stack & Role Marquee
 * 
 * Sits below the Hero Section:
 * - Left side: Status badge with pulse indicator
 * - Right side: Dual-track scrolling marquee
 * - Row 1: Tools & Libraries (scrolling left)
 * - Row 2: Skills & Roles (scrolling right)
 * - High-performance CSS animation with pause-on-hover
 */
export const WireSection: React.FC = () => {
  const { hero } = heroData as HeroSectionData
  const wireData = hero.wire

  if (!wireData) return null

  // Melipatgandakan data agar scroll tidak berujung/seamless
  const toolsRepeated = [...wireData.tools, ...wireData.tools, ...wireData.tools, ...wireData.tools]
  const skillsRepeated = [...wireData.skills, ...wireData.skills, ...wireData.skills, ...wireData.skills]

  return (
    <div className="border-b border-line py-[26px] md:py-[28px] bg-paper relative overflow-hidden select-none">
      {/* Inline styles for marquee performance */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-x {
          animation: marquee-x 45s linear infinite;
        }
        .animate-marquee-x-reverse {
          animation: marquee-x 52s linear infinite reverse;
        }
      `}} />

      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-[32px] items-center">
          
          {/* Left Block - Pulse & Info */}
          <div className="flex items-center gap-[14px] border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-[24px] min-h-[56px] shrink-0">
            <span className="w-[22px] h-[22px] rounded-full border border-line flex items-center justify-center shrink-0">
              <span className="w-[6px] h-[6px] rounded-full bg-coral animate-pulse" />
            </span>
            <div className="font-sans text-[11px] leading-[1.4] flex flex-col gap-[3px]">
              <b className="text-ink font-bold tracking-[0.18em] uppercase">From the field</b>
              <span className="text-ink-faint font-semibold tracking-[0.14em] uppercase">Research · Engineering</span>
            </div>
          </div>

          {/* Right Block - Double-Row Marquee */}
          <div className="flex flex-col gap-[10px] min-w-0 w-full relative">
            {/* Fade Gradients Overlay on Edges */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

            {/* Row 1 - Tools (Moves Left) */}
            <div className="overflow-hidden w-full py-0.5">
              <div className="inline-flex items-center gap-[36px] w-max whitespace-nowrap animate-marquee-x hover:[animation-play-state:paused] cursor-pointer will-change-transform">
                {toolsRepeated.map((item, idx) => (
                  <span
                    key={`tool-${idx}`}
                    className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0"
                  >
                    <span className="text-coral text-[16px] leading-[0] relative top-[-1px] mr-[2px] font-bold">·</span>
                    <span className="text-ink font-medium tracking-[0.18em] uppercase">{item.name}</span>
                    <span className="font-mono text-[10.5px] text-ink-faint">{item.coord}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2 - Skills (Moves Right) */}
            <div className="overflow-hidden w-full py-0.5">
              <div className="inline-flex items-center gap-[36px] w-max whitespace-nowrap animate-marquee-x-reverse hover:[animation-play-state:paused] cursor-pointer will-change-transform">
                {skillsRepeated.map((item, idx) => (
                  <span
                    key={`skill-${idx}`}
                    className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0"
                  >
                    <span className="text-coral text-[16px] leading-[0] relative top-[-1px] mr-[2px] font-bold">·</span>
                    <span className="font-mono text-ink text-[11.5px] font-medium">{item.handle}</span>
                    <span className="text-coral text-[10px] tracking-[0.16em] uppercase">{item.role}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
