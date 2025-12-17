// Projects Section Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  images: ProjectImage[];
  links: ProjectLink[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 
  | 'ai-ml' 
  | 'web-development' 
  | 'mobile' 
  | 'data-science' 
  | 'automation' 
  | 'other';

export type ProjectStatus = 
  | 'completed' 
  | 'in-progress' 
  | 'planned' 
  | 'archived';

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
}

export interface ProjectLink {
  id: string;
  type: 'github' | 'demo' | 'documentation' | 'article' | 'other';
  url: string;
  label: string;
}

export interface ProjectFilter {
  category?: ProjectCategory;
  status?: ProjectStatus;
  featured?: boolean;
  search?: string;
}