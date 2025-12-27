'use client'

import React, { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  typingContainer, 
  typingChar, 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight, 
  scaleIn,
  ANIMATION_DURATION
} from '@/lib/utils/animations'

export interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  variant?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'typewriter'
    | 'stagger'
  className?: string
  delay?: number
  duration?: number
  stagger?: boolean
  repeat?: boolean
  children?: React.ReactNode
  onAnimationComplete?: () => void
}

const textVariants: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: fadeInUp,
  slideDown: fadeInDown,
  slideLeft: fadeInLeft,
  slideRight: fadeInRight,
  scale: scaleIn,
  stagger: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
}

const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.medium,
      ease: [0, 0, 0.2, 1],
    },
  },
}

/**
 * AnimatedText Component
 * 
 * A versatile text animation component with multiple animation variants.
 * Supports typing effects, staggered animations, and accessibility considerations.
 * 
 * Features:
 * - Multiple animation variants (fade, slide, scale, typewriter, stagger)
 * - Configurable timing and easing
 * - Reduced motion support for accessibility
 * - Staggered character/word animations
 * - Typewriter effect with customizable speed
 */
export const AnimatedText = React.forwardRef<HTMLElement, AnimatedTextProps>(
  (
    {
      text,
      as: Component = 'p',
      variant = 'fadeIn',
      className,
      delay = 0,
      duration = ANIMATION_DURATION.medium,
      stagger = false,
      repeat = false,
      children,
      onAnimationComplete,
      ...props
    },
    ref
  ) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      }
      return false
    })

    // Check for reduced motion preference
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionComponent = motion[Component as keyof typeof motion] as any

    // If reduced motion is preferred, render static text
    if (prefersReducedMotion) {
      const StaticComponent = Component as React.ElementType
      return (
        <StaticComponent
          ref={ref}
          className={className}
          {...props}
        >
          {text}
          {children}
        </StaticComponent>
      )
    }

    // Typewriter animation
    if (variant === 'typewriter') {
      return (
        <MotionComponent
          ref={ref}
          className={cn('inline-block', className)}
          variants={typingContainer}
          initial="initial"
          animate="animate"
          onAnimationComplete={onAnimationComplete}
          {...props}
        >
          {text.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={typingChar}
              className="inline-block"
              style={{ 
                // Preserve spaces
                whiteSpace: char === ' ' ? 'pre' : 'normal' 
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          {children}
        </MotionComponent>
      )
    }

    // Stagger animation (word by word or character by character)
    if (variant === 'stagger' || stagger) {
      return (
        <MotionComponent
          ref={ref}
          className={className}
          variants={textVariants.stagger}
          initial="initial"
          animate="animate"
          onAnimationComplete={onAnimationComplete}
          {...props}
        >
          {text.split(' ').map((word, wordIndex) => (
            <span key={`word-${wordIndex}`} className="inline-block">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`char-${wordIndex}-${charIndex}`}
                  variants={staggerItemVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < text.split(' ').length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
          {children}
        </MotionComponent>
      )
    }

    // Standard animation variants
    return (
      <MotionComponent
        ref={ref}
        className={className}
        variants={textVariants[variant]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration,
          delay,
          ease: [0, 0, 0.2, 1],
          repeat: repeat ? Infinity : 0,
          repeatType: repeat ? 'reverse' : undefined,
          repeatDelay: repeat ? 2 : undefined,
        }}
        onAnimationComplete={onAnimationComplete}
        {...props}
      >
        {text}
        {children}
      </MotionComponent>
    )
  }
)

AnimatedText.displayName = 'AnimatedText'

// Preset components for common use cases
export const AnimatedHeading = React.forwardRef<
  HTMLHeadingElement,
  Omit<AnimatedTextProps, 'as'>
>((props, ref) => (
  <AnimatedText 
    ref={ref as React.Ref<HTMLElement>}
    as="h1" 
    variant="slideUp" 
    className={cn('font-display font-bold', props.className)}
    {...props} 
  />
))
AnimatedHeading.displayName = 'AnimatedHeading'

export const AnimatedSubheading = React.forwardRef<
  HTMLHeadingElement,
  Omit<AnimatedTextProps, 'as'>
>((props, ref) => (
  <AnimatedText 
    ref={ref as React.Ref<HTMLElement>}
    as="h2" 
    variant="fadeIn" 
    className={cn('font-display font-semibold', props.className)}
    {...props} 
  />
))
AnimatedSubheading.displayName = 'AnimatedSubheading'

export const AnimatedParagraph = React.forwardRef<
  HTMLParagraphElement,
  Omit<AnimatedTextProps, 'as'>
>((props, ref) => (
  <AnimatedText 
    ref={ref as React.Ref<HTMLElement>}
    as="p" 
    variant="slideUp" 
    delay={0.2} 
    className={cn('font-body', props.className)}
    {...props} 
  />
))
AnimatedParagraph.displayName = 'AnimatedParagraph'

export const TypewriterText = React.forwardRef<
  HTMLElement,
  Omit<AnimatedTextProps, 'variant'>
>((props, ref) => (
  <AnimatedText 
    ref={ref}
    variant="typewriter" 
    className={cn('font-code', props.className)}
    {...props} 
  />
))
TypewriterText.displayName = 'TypewriterText'

export const StaggeredText = React.forwardRef<
  HTMLElement,
  Omit<AnimatedTextProps, 'variant' | 'stagger'>
>((props, ref) => (
  <AnimatedText 
    ref={ref}
    variant="stagger" 
    stagger={true}
    {...props} 
  />
))
StaggeredText.displayName = 'StaggeredText'

// Hero-specific text components
export const HeroTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<AnimatedTextProps, 'as' | 'variant'>
>((props, ref) => (
  <AnimatedText 
    ref={ref as React.Ref<HTMLElement>}
    as="h1" 
    variant="slideUp" 
    className={cn(
      'font-display font-bold text-4xl md:text-6xl lg:text-7xl',
      'bg-linear-to-r from-primary to-ai-amber bg-clip-text text-transparent',
      props.className
    )}
    {...props} 
  />
))
HeroTitle.displayName = 'HeroTitle'

export const HeroSubtitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<AnimatedTextProps, 'as' | 'variant'>
>((props, ref) => (
  <AnimatedText 
    ref={ref as React.Ref<HTMLElement>}
    as="h2" 
    variant="fadeIn" 
    delay={0.3}
    className={cn(
      'font-body text-xl md:text-2xl lg:text-3xl text-muted-foreground',
      props.className
    )}
    {...props} 
  />
))
HeroSubtitle.displayName = 'HeroSubtitle'
