'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { AnimatedComponentProps } from '@/lib/types'

interface AnimatedTextProps extends AnimatedComponentProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'typewriter'
  stagger?: boolean
  repeat?: boolean
}

const textVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const AnimatedText = React.forwardRef<HTMLElement, AnimatedTextProps>(
  (
    {
      text,
      as: Component = 'p',
      variant = 'fadeIn',
      stagger = false,
      repeat = false,
      delay = 0,
      duration = 0.6,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionComponent = motion[Component] as any

    if (variant === 'typewriter') {
      return (
        <MotionComponent
          ref={ref}
          className={className}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          {...props}
        >
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: delay + index * 0.05,
                duration: 0.1,
                repeat: repeat ? Infinity : 0,
                repeatType: 'reverse',
                repeatDelay: 2,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </MotionComponent>
      )
    }

    if (stagger) {
      return (
        <MotionComponent
          ref={ref}
          className={className}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          {...props}
        >
          {text.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterVariants}
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
        </MotionComponent>
      )
    }

    return (
      <MotionComponent
        ref={ref}
        className={className}
        variants={textVariants[variant]}
        initial="hidden"
        animate="visible"
        transition={{
          duration,
          delay,
          repeat: repeat ? Infinity : 0,
          repeatType: 'reverse',
          repeatDelay: 1,
        }}
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
export const AnimatedHeading = (props: Omit<AnimatedTextProps, 'as'>) => (
  <AnimatedText as="h1" variant="slideUp" {...props} />
)

export const AnimatedSubheading = (props: Omit<AnimatedTextProps, 'as'>) => (
  <AnimatedText as="h2" variant="fadeIn" {...props} />
)

export const AnimatedParagraph = (props: Omit<AnimatedTextProps, 'as'>) => (
  <AnimatedText as="p" variant="slideUp" delay={0.2} {...props} />
)

export const TypewriterText = (props: Omit<AnimatedTextProps, 'variant'>) => (
  <AnimatedText variant="typewriter" {...props} />
)
