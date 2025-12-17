// About Section Types
export interface AboutProps {
  name: string;
  title: string;
  bio: string;
  skills: Skill[];
  experience: Experience[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'ai' | 'tools' | 'other';
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'achievement';
}