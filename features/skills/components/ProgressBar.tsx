'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  animated?: boolean;
  showValue?: boolean;
  color?: string;
  label?: string;
}

/**
 * ProgressBar Component
 *
 * Animated progress bar using whileInView (not mount-triggered).
 * Uses scaleX transform from origin-left for smooth editorial reveal.
 *
 * Features:
 * - whileInView trigger (viewport-aware, runs when element becomes visible)
 * - Customizable colors via `color` prop
 * - Percentage label + ARIA attributes
 * - Reduced motion safe
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  animated = true,
  showValue = true,
  color = 'var(--coral)',
  label,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-[11px] font-medium text-[var(--ink-faint)] tracking-[0.16em] uppercase"
            style={{ fontFamily: 'var(--font-editorial-tight)' }}
          >
            {label}
          </span>
          {showValue && (
            <span
              className="text-[13px] font-bold text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-editorial-tight)' }}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className="w-full bg-[var(--line-soft)] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        <motion.div
          className="h-full rounded-full origin-left"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: percentage / 100 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={
            animated
              ? { duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  );
};

export default ProgressBar;