// Certificate Management Types
// Defines all TypeScript types and interfaces for the certificate feature

export type CourseStatus = 'in_progress' | 'completed'

export interface Course {
  id: string
  name: string
  slug: string
  organisation: string
  issue_date: string // ISO date string
  description?: string
  progress: number // 0-100
  certificate_image?: string // Public URL of certificate image
  certificate_storage_path?: string // Internal storage path (optional)
  platform?: string
  url?: string
  status: CourseStatus
  deleted_at?: string
  created_at: string
  updated_at: string
}

export interface CourseInput {
  name: string
  organisation: string
  issue_date: string
  description?: string
  progress: number
  certificate_image?: string
  platform?: string
  url?: string
}

export interface CourseUpdate {
  name?: string
  organisation?: string
  issue_date?: string
  description?: string
  progress?: number
  certificate_image?: string
  platform?: string
  url?: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}
