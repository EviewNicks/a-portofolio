// Contact Section Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  timezone: string;
  availability: string;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  username: string;
  icon: string;
  isPublic: boolean;
}

export type SocialPlatform = 
  | 'github' 
  | 'linkedin' 
  | 'twitter' 
  | 'instagram' 
  | 'youtube' 
  | 'medium' 
  | 'dev' 
  | 'stackoverflow' 
  | 'other';

export interface FormValidationError {
  field: keyof ContactForm;
  message: string;
}

export interface ContactFormState {
  data: ContactForm;
  errors: FormValidationError[];
  isSubmitting: boolean;
  isSubmitted: boolean;
}