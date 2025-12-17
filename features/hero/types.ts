// Hero Section Types
export interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroParallaxConfig {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  intensity: number;
}

export interface HeroAnimationVariants {
  initial: object;
  animate: object;
  exit: object;
}