// Global Design System Types

// Color System
export interface AIColorPalette {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  accent: {
    orange: string;
    amber: string;
    blue: string;
  };
  glass: {
    light: string;
    medium: string;
    heavy: string;
  };
  border: {
    light: string;
    medium: string;
    heavy: string;
  };
}

// Typography System
export interface FontSystem {
  display: string; // Playfair Display
  body: string;    // Poppins
  mono: string;    // Fira Code
}

// Theme System
export interface ThemeConfig {
  mode: 'light' | 'dark';
  colors: AIColorPalette;
  fonts: FontSystem;
  spacing: SpacingTokens;
  animations: AnimationConfig;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

// Animation Configuration
export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  parallax: ParallaxConfig;
}

export interface ParallaxConfig {
  speed: {
    slow: number;
    medium: number;
    fast: number;
  };
  intensity: {
    subtle: number;
    normal: number;
    strong: number;
  };
}

// Component Variants
export type GlassVariant = 'light' | 'medium' | 'heavy';
export type AnimationVariant = 'fade' | 'slide' | 'scale' | 'parallax';
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'muted';

// Responsive Breakpoints
export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Component Props Base Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animation?: AnimationVariant;
  delay?: number;
  duration?: number;
}

export interface GlassComponentProps extends BaseComponentProps {
  variant?: GlassVariant;
  blur?: boolean;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// API Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: string | number | RegExp;
  message: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}