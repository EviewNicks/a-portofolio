// Portfolio Data Types
// TypeScript interfaces for JSON data structures used throughout the portfolio

export interface ParallaxLayer {
  element: string;
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface CallToAction {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface Avatar {
  url: string;
  alt: string;
}

export interface Background {
  type: string;
  theme: string;
  particles: boolean;
}

export interface ParallaxConfig {
  enabled: boolean;
  layers: ParallaxLayer[];
}

// Hero Section Types
export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  cta: {
    primary: CallToAction;
    secondary: CallToAction;
  };
  highlights: string[];
  avatar: Avatar;
  background: Background;
  parallax: ParallaxConfig;
}

export interface HeroSectionData {
  hero: HeroData;
}

// About Section Types
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  timezone: string;
  bio: string;
  philosophy: string;
  interests: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  semester: string;
  period: string;
  gpa: string;
  status: string;
  focus_areas: string[];
}

export interface Achievement {
  title: string;
  period: string;
  description: string;
}

export interface EducationDetails {
  current: Education;
  achievements: Achievement[];
}

export interface Value {
  title: string;
  description: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}

export interface AboutData {
  personal: PersonalInfo;
  education: EducationDetails;
  career_objectives: string[];
  values: Value[];
  stats: Statistic[];
}

export interface AboutSectionData {
  about: AboutData;
}

// Skills Section Types
export interface Skill {
  id: string;
  name: string;
  level: number;
  experience: string;
  icon: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface LearningItem {
  name: string;
  progress: number;
  target_date: string;
  reason: string;
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'planned' | 'in-progress' | 'completed';
  target_date?: string;
}

export interface SkillsData {
  categories: SkillCategory[];
  learning: LearningItem[];
  certifications: Certification[];
}

export interface SkillsSectionData {
  skills: SkillsData;
}

// Projects Section Types
export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  caption?: string;
}

export interface ProjectLink {
  id: string;
  type: 'github' | 'demo' | 'website' | 'documentation';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  images: ProjectImage[];
  links: ProjectLink[];
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterOption {
  id: string;
  name: string;
  count: number;
}

export interface ProjectFilters {
  categories: FilterOption[];
  status: FilterOption[];
}

export interface ProjectStats {
  total_projects: number;
  completed_projects: number;
  in_progress: number;
  technologies_used: number;
  github_stars: number;
  total_commits: number;
}

export interface ProjectsData {
  featured: Project[];
  academic: Project[];
  personal: Project[];
  filters: ProjectFilters;
  stats: ProjectStats;
}

export interface ProjectsSectionData {
  projects: ProjectsData;
}

// Experience Section Types
export interface ExperienceEntry {
  id: string;
  date: string;
  title: string;
  organization: string;
  type: 'education' | 'work' | 'project';
  status: 'current' | 'completed';
  description: string;
  details: string[];
  technologies: string[];
  achievements: string[];
  location: string;
}

export interface ExperienceSummary {
  total_experience: string;
  education_years: string;
  work_experience: string;
  projects_completed: string;
  technologies_learned: string;
  certifications: string;
}

export interface SkillProgression {
  year: string;
  skills: string[];
}

export interface ExperienceData {
  timeline: ExperienceEntry[];
  summary: ExperienceSummary;
  skills_progression: SkillProgression[];
}

export interface ExperienceSectionData {
  experience: ExperienceData;
}

// Contact Section Types
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  timezone: string;
  availability: string;
  response_time: string;
  languages: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
  icon: string;
  isPublic: boolean;
  description: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  required: boolean;
  placeholder: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  options?: Array<{
    value: string;
    label: string;
  }>;
}

export interface FormSettings {
  submitText: string;
  successMessage: string;
  errorMessage: string;
  emailService: string;
  recaptcha: boolean;
}

export interface ContactForm {
  fields: FormField[];
  settings: FormSettings;
}

export interface ContactCTA {
  title: string;
  subtitle: string;
  description: string;
  buttons: Array<{
    text: string;
    action: string;
    url?: string;
    variant: string;
  }>;
}

export interface AvailabilityType {
  type: string;
  title: string;
  description: string;
  available: boolean;
  duration: string;
  start_date: string;
}

export interface Availability {
  status: 'available' | 'busy' | 'unavailable';
  types: AvailabilityType[];
}

export interface ContactData {
  info: ContactInfo;
  social_links: SocialLink[];
  form: ContactForm;
  cta: ContactCTA;
  availability: Availability;
}

export interface ContactSectionData {
  contact: ContactData;
}

// Animation and UI Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  stagger?: number;
}

export interface GlassmorphismVariant {
  background: string;
  blur: string;
  border: string;
  shadow: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

// Component Props Types
export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy';
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

export interface ParallaxContainerProps {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'typing' | 'fade' | 'slide';
  config?: AnimationConfig;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  animated?: boolean;
  showValue?: boolean;
  color?: string;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface NavigationState {
  activeSection: string;
  isScrolling: boolean;
  sections: NavigationItem[];
}

// Error Handling Types
export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorSection?: string;
}

export interface PortfolioError {
  type: 'data' | 'animation' | 'network' | 'unknown';
  message: string;
  section?: string;
  timestamp: Date;
}