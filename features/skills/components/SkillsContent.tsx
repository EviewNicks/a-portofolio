'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkillsData, SkillCategory } from '@/lib/types/portfolio';

interface SkillsContentProps {
  skillsData: SkillsData;
  className?: string;
}

interface CapabilityCardProps {
  category: SkillCategory;
  index: number;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─────────────────────────────────────────────────────────────
   CAPABILITY CARD — editorial bone card, numbered, with arrow-mark
───────────────────────────────────────────────────────────── */
const CapabilityCard: React.FC<CapabilityCardProps> = ({ category, index }) => {
  const num = String(index + 1).padStart(2, '0');

  // Short description per category using existing data
  const lead = category.description;
  const topSkills = category.skills.slice(0, 3).map(s => s.name).join(', ');
  const avgLevel = Math.round(
    category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: easeOutExpo }}
      whileHover={{ y: -3 }}
      className={cn(
        'relative rounded-[18px] overflow-hidden p-[28px_26px_32px] group cursor-pointer',
        'bg-bone border border-line-soft',
        'shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18),inset_0_0_0_1px_rgba(21,20,15,0.06)]',
        'transition-[border-color] duration-200',
        'hover:border-[rgba(237,111,92,0.35)]'
      )}
      style={{ padding: '28px 26px 32px' }}
    >
      {/* Top: number + category tag */}
      <div className="flex justify-between items-baseline mb-4">
        <span
          className="font-serif italic font-medium text-[22px] text-coral tracking-[0.04em]"
          style={{ fontFamily: 'var(--font-editorial-serif)' }}
        >
          {num}
        </span>
        <span
          className="font-sans text-[9.5px] text-ink-faint tracking-[0.18em] uppercase font-medium"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          {category.name.split(' ')[0]}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-sans font-bold text-[22px] leading-[1.05] tracking-[-0.014em] text-ink mb-3.5"
        style={{ fontFamily: 'var(--font-editorial-tight)' }}
      >
        {category.name}
      </h3>

      {/* Description */}
      <p
        className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[24ch] mb-4"
        style={{ fontFamily: 'var(--font-editorial-body)' }}
      >
        {lead}
      </p>

      {/* Minimalist progress bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-ink-faint"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            Proficiency
          </span>
          <span className="font-mono text-[10px] text-ink-faint">{avgLevel}%</span>
        </div>
        <div className="w-full h-[2px] bg-line-soft rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: avgLevel / 100 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 1.1, delay: 0.3 + index * 0.08, ease: easeOutExpo }}
          />
        </div>
      </div>

      {/* Skill tags row */}
      <p
        className="font-sans text-[10.5px] text-ink-faint tracking-[0.1em] uppercase"
        style={{ fontFamily: 'var(--font-editorial-tight)' }}
      >
        {topSkills}
      </p>

      {/* Arrow-mark circle button (bottom-right) */}
      <span
        className={cn(
          'absolute right-[22px] bottom-[22px] w-7 h-7 rounded-full',
          'border border-line flex items-center justify-center',
          'text-ink transition-all duration-[180ms]',
          'group-hover:bg-coral group-hover:border-coral group-hover:text-white'
        )}
      >
        <svg viewBox="0 0 12 12" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6]">
          <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CAPABILITIES ART — left decorative frame with corners + ribbon
───────────────────────────────────────────────────────────── */
const CapabilitiesArt: React.FC = () => (
  <motion.div
    className="relative aspect-square w-full max-w-[540px]"
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, ease: easeOutExpo }}
  >
    {/* Corner decorators */}
    <div className="absolute w-[22px] h-[22px] border-t border-l border-ink-faint top-0 left-0" />
    <div className="absolute w-[22px] h-[22px] border-t border-r border-ink-faint top-0 right-0" />
    <div className="absolute w-[22px] h-[22px] border-b border-l border-ink-faint bottom-0 left-0" />
    <div className="absolute w-[22px] h-[22px] border-b border-r border-ink-faint bottom-0 right-0" />

    {/* Vertical Ribbon */}
    <span
      className="absolute right-[-42px] top-[50%] font-sans text-[10.5px] tracking-[0.42em] uppercase text-ink-faint [writing-mode:vertical-rl] rotate-180 whitespace-nowrap select-none hidden lg:block"
      style={{ fontFamily: 'var(--font-editorial-tight)' }}
    >
      <b className="text-coral">ARDI</b>&nbsp;·&nbsp;CAPABILITY MATRIX&nbsp;·&nbsp;ARDI/26
    </span>

    {/* Decorative inner plate */}
    <div className="w-full h-full bg-bone border border-line-soft rounded-[14px] flex flex-col items-center justify-center gap-8 p-10">
      {/* Large decorative number */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="font-serif italic text-[clamp(80px,12vw,150px)] font-medium leading-none text-ink-faint select-none"
        style={{ fontFamily: 'var(--font-editorial-serif)' }}
        aria-hidden
      >
        III.
      </motion.div>

      {/* Sub label */}
      <div className="text-center space-y-1">
        <p
          className="font-sans text-[10.5px] tracking-[0.22em] uppercase text-ink-faint font-semibold"
          style={{ fontFamily: 'var(--font-editorial-tight)' }}
        >
          Plate Nº 03 · Capabilities
        </p>
        <div className="w-8 h-px bg-coral mx-auto" />
      </div>

      {/* Mini stats grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {[
          { val: 'AI', sub: 'Research' },
          { val: 'Web', sub: 'Engineering' },
          { val: 'ML', sub: 'Systems' },
          { val: 'Cloud', sub: 'Infra' },
        ].map((item) => (
          <div
            key={item.val}
            className="text-center p-3 rounded-[10px] bg-paper border border-line-soft"
          >
            <div
              className="font-sans font-bold text-[14px] text-ink tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {item.val}
            </div>
            <div
              className="font-sans text-[9px] tracking-[0.14em] uppercase text-ink-faint"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   SKILLS CONTENT — main export
───────────────────────────────────────────────────────────── */
export const SkillsContent: React.FC<SkillsContentProps> = ({
  skillsData,
  className,
}) => {
  return (
    <div className={cn('container mx-auto px-6 md:px-8 lg:px-16', className)}>

      {/* Section Rule */}
      <motion.div
        className="border-t border-line pt-[18px] mb-12 flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint"
        initial={{ opacity: 0, scaleX: 0.92 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        style={{ originX: 0 }}
      >
        <span
          className="font-serif italic text-coral text-[14px] tracking-wider normal-case"
          style={{ fontFamily: 'var(--font-editorial-serif)' }}
        >
          III.
        </span>
        <span className="hidden sm:flex items-center gap-[26px]">
          <span>Capabilities · Research · Engineering</span>
          <span className="text-coral">·</span>
          <span>4 surfaces / 1 loop</span>
        </span>
        <span>003 / 008</span>
      </motion.div>

      {/* Asymmetric 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[70px] items-center">

        {/* Left — Art Frame */}
        <CapabilitiesArt />

        {/* Right — Copy + Cards Grid */}
        <div>
          {/* Overline label */}
          <motion.span
            className="inline-flex items-center gap-3 mb-5 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <span className="inline-block w-[18px] h-[1px] bg-coral" />
            Capabilities
            <span className="text-ink-faint font-normal">· Nº 03</span>
          </motion.span>

          {/* Display Heading */}
          <motion.h2
            className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-[1.0] text-[clamp(40px,4.8vw,64px)] mb-[22px]"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.08, duration: 0.7, ease: easeOutExpo }}
          >
            Skills, research, and systems for{' '}
            <em
              className="font-medium not-italic"
              style={{ fontFamily: 'var(--font-editorial-serif)', fontStyle: 'italic' }}
            >
              essential
            </em>{' '}
            intelligence
            <span className="text-coral">.</span>
          </motion.h2>

          {/* Lead paragraph */}
          <motion.p
            className="font-body text-[16px] text-ink-soft leading-[1.55] max-w-[42ch] mb-[22px]"
            style={{ fontFamily: 'var(--font-editorial-body)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.14, duration: 0.7, ease: easeOutExpo }}
          >
            Deep AI knowledge meets production-grade engineering. Every line of code and every pixel serves a purpose.
          </motion.p>

          {/* 2×2 Capability Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mt-[22px]">
            {skillsData.categories.map((category, index) => (
              <CapabilityCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsContent;