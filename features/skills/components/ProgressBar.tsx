'use client';

import React, { useEffect, useState } from 'react';
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
 * Animated progress bar component for skill proficiency display
 * 
 * Features:
 * - Smooth animation transitions
 * - Customizable colors and styling
 * - Percentage value display
 * - Accessibility labels and ARIA attributes
 * - Responsive design
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  animated = true,
  showValue = true,
  color = '#3b82f6',
  label,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [percentage, animated]);

  // Use the actual percentage for non-animated case
  const displayValue = animated ? animatedValue : percentage;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div
        className="w-full bg-muted/30 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: animated ? 1.5 : 0,
            ease: "easeOut",
            delay: animated ? 0.2 : 0,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;