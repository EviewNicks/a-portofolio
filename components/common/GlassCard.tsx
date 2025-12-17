import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn, glassCard } from '@/lib/utils'
import { GlassVariant } from '@/lib/types'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'className'> {
  className?: string
  variant?: GlassVariant
  blur?: boolean
  hover?: boolean
  glow?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'medium',
      blur = true,
      hover = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          glassCard(variant),
          blur && 'backdrop-saturate-150',
          hover &&
            'transition-all duration-300 hover:scale-105 hover:shadow-2xl',
          glow && 'hover:shadow-orange-500/25',
          className
        )}
        whileHover={hover ? { y: -5 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Variants for different use cases
export const GlassCardVariants = {
  subtle: (props: Omit<GlassCardProps, 'variant'>) => (
    <GlassCard variant="light" {...props} />
  ),
  normal: (props: Omit<GlassCardProps, 'variant'>) => (
    <GlassCard variant="medium" {...props} />
  ),
  intense: (props: Omit<GlassCardProps, 'variant'>) => (
    <GlassCard variant="heavy" {...props} />
  ),
  interactive: (props: Omit<GlassCardProps, 'variant' | 'hover' | 'glow'>) => (
    <GlassCard variant="medium" hover glow {...props} />
  ),
}
