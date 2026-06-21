# Implementation Plan: Project Features Showcase

## Overview

This implementation plan converts the Project Features Showcase design into executable coding tasks. The system enables administrators to create and manage detailed feature presentations within projects, including multiple images, YouTube videos, markdown descriptions with syntax highlighting, technical stack information, and demo links.

The implementation follows a bottom-up approach: database schema → query functions → API routes → utility functions → UI components → integration. Each task builds incrementally with checkpoints to validate core functionality.

## Tasks

- [x] 1. Set up database schema and core types
  - [x] 1.1 Extend Prisma schema with ProjectFeature and ProjectFeatureMedia models
    - Add ProjectFeature model with all required fields (id, project_id, title, description, youtube_url, tech_stack, display_order, is_featured, demo_url, created_at, updated_at)
    - Add ProjectFeatureMedia model with fields (id, feature_id, storage_path, public_url, file_name, display_order, created_at)
    - Add features relationship to existing Project model
    - Configure foreign key constraints with CASCADE delete
    - Add indexes on [project_id, display_order] and [feature_id, display_order]
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  
  - [x] 1.2 Generate Prisma client and run migrations
    - Run `npx prisma generate` to update Prisma client
    - Create migration with `npx prisma migrate dev --name add_project_features`
    - Verify migration creates tables correctly in database
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 1.3 Create TypeScript types and interfaces
    - Create `features/projects/types.ts` additions for ProjectFeature, ProjectFeatureMedia, CreateFeatureInput, UpdateFeatureInput, FeatureValidationResult
    - Define type guards for runtime validation
    - _Requirements: 12.1, 12.2_

- [x] 2. Implement validation utilities
  - [x] 2.1 Create feature input validation function
    - Create `features/features/utils/validation.ts`
    - Implement `validateFeatureInput()` with title, description, youtube_url, demo_url, and tech_stack validation
    - Return FeatureValidationResult with field-specific errors
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.8, 2.15_
  
  - [x]* 2.2 Write property test for title validation
    - **Property 1: Title Validation**
    - **Validates: Requirements 2.1, 2.8**
  
  - [x]* 2.3 Write property test for description length validation
    - **Property 2: Description Length Validation**
    - **Validates: Requirements 2.2, 2.8, 7.5**
  
  - [x]* 2.4 Write property test for YouTube URL format validation
    - **Property 3: YouTube URL Format Validation**
    - **Validates: Requirements 2.3, 8.1, 8.3**
  
  - [x]* 2.5 Write property test for demo URL protocol validation
    - **Property 4: Demo URL Protocol Validation**
    - **Validates: Requirements 2.4, 2.8**
  
  - [x] 2.6 Create media file validation function
    - Implement `validateMediaFile()` for MIME type and file size validation
    - Support JPEG, PNG, GIF, WebP formats with 10MB limit
    - Return validation error messages
    - _Requirements: 3.2, 3.3_
  

- [x] 3. Implement storage utilities
  - [x] 3.1 Create storage path construction functions
    - Create `features/features/utils/storage.ts`
    - Implement `buildFeatureMediaPath()` with filename sanitization
    - Implement `getFeatureMediaBucket()` for bucket name
    - _Requirements: 3.1_
  
  - [x]* 3.2 Write property test for storage path construction
    - **Property 8: Storage Path Construction**
    - **Validates: Requirements 3.1**

- [x] 4. Implement database query functions
  - [x] 4.1 Create feature query functions
    - Create `lib/supabase/queries/features.ts`
    - Implement `getFeaturesByProjectId()` with display_order ordering
    - Implement `getFeatureById()` with media inclusion
    - _Requirements: 2.11, 2.12, 2.13, 2.14_
  
  - [x] 4.2 Create feature mutation functions
    - Implement `createFeature()` with validation
    - Implement `updateFeature()` with field isolation
    - Implement `deleteFeature()` with CASCADE behavior
    - Implement `updateFeatureDisplayOrder()` for bulk updates
    - _Requirements: 2.5, 2.6, 2.7, 2.9, 2.10, 4.9_
  
  - [x] 4.3 Create feature media query functions
    - Implement `getFeatureMedia()` with display_order ordering
    - Implement `createFeatureMedia()` for upload records
    - Implement `deleteFeatureMedia()` with storage cleanup
    - _Requirements: 3.4, 3.7, 3.8_
  
  - [x]* 4.4 Write property test for feature creation round-trip
    - **Property 5: Feature Creation Round-Trip**
    - **Validates: Requirements 2.5, 12.4**
  
  - [x]* 4.5 Write property test for feature update field isolation
    - **Property 6: Feature Update Field Isolation**
    - **Validates: Requirements 2.7**
  
  - [x]* 4.6 Write property test for display order preservation
    - **Property 7: Display Order Preservation**
    - **Validates: Requirements 2.11, 2.13, 4.2, 5.8, 6.3, 9.6**

- [x] 5. Checkpoint - Verify database layer
  - Ensure all query functions compile without errors
  - Run database migrations successfully
  - Test validation functions with sample data
  - Ask the user if questions arise

- [x] 6. Implement feature CRUD API routes
  - [x] 6.1 Create GET /api/projects/[id]/features route
    - Create `app/api/projects/[id]/features/route.ts`
    - Implement GET handler to fetch all features for a project
    - Include first media thumbnail for each feature
    - Order by display_order ascending
    - Return empty array for non-existent projects
    - _Requirements: 2.11, 2.12, 4.2, 5.1, 5.8_
  
  - [x] 6.2 Create GET /api/projects/[id]/features/[featureId] route
    - Create `app/api/projects/[id]/features/[featureId]/route.ts`
    - Implement GET handler to fetch single feature with all media
    - Return 404 if feature doesn't exist or doesn't belong to project
    - Order media by display_order ascending
    - _Requirements: 2.13, 2.14, 6.3, 6.9, 6.11, 6.12_
  
  - [x] 6.3 Create POST /api/projects/[id]/features route
    - Implement POST handler with admin secret validation
    - Validate all input fields using validateFeatureInput()
    - Return 400 with field-specific errors for invalid data
    - Return 403 for invalid/missing secret
    - Return 201 with created feature on success
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.15, 10.1, 10.2, 10.3, 10.4, 10.7_
  
  - [x] 6.4 Create PUT /api/projects/[id]/features/[featureId] route
    - Implement PUT handler with admin secret validation
    - Validate updated fields using validateFeatureInput()
    - Return 404 if feature doesn't exist
    - Return 400 for validation errors
    - Return updated feature on success
    - _Requirements: 2.7, 2.8, 2.9, 2.16, 10.1, 10.2, 10.3, 10.4, 10.7_
  
  - [x] 6.5 Create DELETE /api/projects/[id]/features/[featureId] route
    - Implement DELETE handler with admin secret validation
    - Return 404 if feature doesn't exist
    - Trigger CASCADE delete for media records
    - Return success status
    - _Requirements: 2.10, 2.17, 10.1, 10.2, 10.3, 10.4, 10.7_
  
  - [x] 6.6 Create PATCH /api/projects/[id]/features/reorder route
    - Implement PATCH handler with admin secret validation
    - Accept array of {id, display_order} objects
    - Update display_order values in transaction
    - Return success status
    - Rollback on failure
    - _Requirements: 4.9, 9.1, 9.3, 9.4_

- [x] 7. Implement feature media upload API routes
  - [x] 7.1 Create POST /api/features/media/upload route
    - Create `app/api/features/[id]/features/[featureId]/media/upload/route.ts`
    - Implement POST handler with admin secret validation
    - Parse FormData (file, feature_id, secret)
    - Validate file type (JPEG, PNG, GIF, WebP) and size (≤10MB)
    - Store file in Supabase Storage at feature-media/{feature_id}/{filename}
    - Create database record with storage_path and public_url
    - Return 201 with created media record
    - Return 400 for validation errors
    - Return 500 for storage failures
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.8, 4.6, 10.1, 10.2, 10.3, 10.4, 10.7_
  
  - [x] 7.2 Create DELETE /api/features/media/[id] route
    - Create `app/api/features/[id]/features/[featureId]/media/[id]/route.ts`
    - Implement DELETE handler with admin secret validation
    - Delete file from Supabase Storage
    - Delete database record
    - Return success status
    - Handle storage cleanup failures gracefully
    - _Requirements: 3.6, 3.7, 10.1, 10.2, 10.3, 10.4, 10.7_
  

- [x] 8. Checkpoint - Verify API layer
  - Ensure all API routes compile without errors
  - Test CRUD operations with valid and invalid inputs
  - Verify authentication checks work correctly
  - Ask the user if questions arise

- [x] 9. Implement admin interface components
  - [x] 9.1 Create admin features management page
    - Create `app/admin/projects/[id]/features/page.tsx`
    - Implement Server Component with admin secret validation
    - Fetch all features for the project
    - Return 403 if secret validation fails
    - Render AdminFeaturesManagement client component
    - _Requirements: 4.1, 4.2, 10.1, 10.2, 10.3, 10.4, 10.5, 10.7_
  
  - [x] 9.2 Create AdminFeaturesManagement component
    - Create `features/admin/components/AdminFeaturesManagement.tsx`
    - Implement Client Component with drag-and-drop state
    - Display feature list with drag handles
    - Handle feature reordering with visual indicators
    - Implement "Add New Feature" button
    - Display inline editing forms
    - Handle delete with confirmation dialog
    - _Requirements: 4.2, 4.3, 4.8, 4.12, 9.1, 9.2, 9.5_
  
  - [x] 9.3 Create FeatureForm component
    - Create `features/admin/components/FeatureForm.tsx`
    - Implement Client Component with form fields
    - Add fields: title (text, required), description (markdown editor), youtube_url (text), tech_stack (tag input), demo_url (text), is_featured (checkbox)
    - Implement client-side validation
    - Display field-specific error messages
    - Disable submit until validation passes
    - Preserve form data on validation failure
    - _Requirements: 4.4, 4.10, 4.11_
  
  - [x] 9.4 Create FeatureMediaUpload component
    - Create `features/admin/components/FeatureMediaUpload.tsx`
    - Implement Client Component with drag-and-drop upload
    - Support click-to-browse file selection
    - Display thumbnail previews (150x150px)
    - Enable thumbnail reordering via drag-and-drop
    - Show upload progress indicators
    - Display validation feedback
    - Enforce 20 image max, 10MB per file
    - _Requirements: 4.6, 4.7_
  
  - [x]* 9.5 Write property test for display order renumbering
    - **Property 11: Display Order Renumbering**
    - **Validates: Requirements 4.9, 9.1**

- [x] 10. Implement public interface components
  - [ ] 10.1 Update ProjectDetailTabs component
    - Update `features/projects/components/dynamic/ProjectDetailTabs.tsx`
    - Add "Features" tab to existing tab list
    - Show feature count badge if features exist
    - Render FeaturesTabContent when Features tab is selected
    - _Requirements: 5.1, 11.1, 11.3, 11.4_
  
  - [x] 10.2 Create FeaturesTabContent component
    - Create `features/features/components/FeaturesTabContent.tsx`
    - Implement Client Component with responsive grid
    - Configure grid: 1 column mobile, 2 columns tablet, 3 columns desktop
    - Render feature cards ordered by display_order
    - Display empty state message if no features
    - _Requirements: 5.2, 5.7, 5.8_
  
  - [x] 10.3 Create FeatureCard component
    - Create `features/features/components/FeatureCard.tsx`
    - Display thumbnail (first media or placeholder)
    - Display title
    - Display description excerpt (first 150 chars + ellipsis)
    - Handle empty description case
    - Navigate to feature detail page on click
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 11.4_
  
  - [x]* 10.4 Write property test for feature card rendering
    - **Property 12: Feature Card Rendering**
    - **Validates: Requirements 5.3**

- [x] 11. Implement feature detail page
  - [x] 11.1 Create feature detail page route
    - Create `app/projects/[id]/features/[featureId]/page.tsx`
    - Implement Server Component to fetch feature
    - Validate project ownership
    - Return 404 if not found or mismatched project
    - Return 500 for database errors
    - Render FeatureDetail component
    - _Requirements: 6.1, 6.9, 6.10, 6.11, 6.12_
  
  - [x] 11.2 Create FeatureDetail component
    - Create `features/features/components/FeatureDetail.tsx`
    - Implement Server Component layout
    - Display feature title (h1)
    - Conditionally render Media Gallery section
    - Conditionally render YouTube embed
    - Render markdown description with syntax highlighting
    - Display tech stack badges
    - Conditionally render demo link button
    - Display "Back to Project" button
    - _Requirements: 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.13_
  
  - [x] 11.3 Create FeatureMediaGallery component
    - Create `features/features/components/FeatureMediaGallery.tsx`
    - Implement Client Component with image navigation state
    - Display large image with prev/next buttons
    - Display thumbnail strip below main image
    - Enable thumbnail click to jump to image
    - Add keyboard navigation (arrow keys)
    - Order images by display_order
    - _Requirements: 6.3_
  
  - [x] 11.4 Create YouTubeEmbed component
    - Create `features/features/components/YouTubeEmbed.tsx`
    - Implement Client Component for iframe embed
    - Configure responsive iframe (100% width, 16:9 aspect ratio)
    - Enable standard YouTube player controls
    - Implement error boundary for failed loads
    - Display "Video unavailable" message on error
    - _Requirements: 6.4, 8.4, 8.5, 8.6, 8.7_
  
  - [x]* 11.5 Write property test for tech stack badge rendering
    - **Property 13: Tech Stack Badge Rendering**
    - **Validates: Requirements 6.6**

- [x] 12. Implement markdown rendering
  - [x] 12.1 Create MarkdownContent component
    - Create `features/features/components/MarkdownContent.tsx`
    - Configure react-markdown v10.x with remarkGfm and rehypeHighlight
    - Support all standard markdown elements per Requirements 7.3
    - Disable HTML rendering for XSS protection
    - Wrap in error boundary
    - Render raw text as fallback on parse failure
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6, 7.7, 11.1_
  
  - [x] 12.2 Install and configure highlight.js
    - Install highlight.js for syntax highlighting
    - Configure supported languages
    - Apply highlight.js CSS theme
    - _Requirements: 7.2, 11.1_
  
  - [x]* 12.3 Write property test for YouTube URL storage preservation
    - **Property 14: YouTube URL Storage Preservation**
    - **Validates: Requirements 8.2**
  
  - [x]* 12.4 Write property test for data serialization round-trip
    - **Property 15: Data Serialization Round-Trip**
    - **Validates: Requirements 12.4**

- [x] 13. Checkpoint - Verify UI layer
  - Ensure all components compile without errors
  - Check responsive layouts on different screen sizes
  - Verify markdown rendering and syntax highlighting
  - Test navigation flows
  - Ask the user if questions arise

- [ ] 14. Integration and polish
  - [ ] 14.1 Add error handling for API failures
    - Implement client-side error display for network failures
    - Add retry mechanisms for transient errors
    - Display user-friendly error messages
    - _Requirements: 4.11, 9.4, 9.7_
  
  - [ ] 14.2 Add loading states to all components
    - Add skeleton loaders for feature lists
    - Add spinners for form submissions
    - Add progress indicators for uploads
    - Preserve UI responsiveness during operations
  
  - [ ] 14.3 Implement image placeholders
    - Add placeholder image for features without media
    - Implement lazy loading for images
    - Add loading states for image galleries
    - _Requirements: 5.4_
  
  - [ ] 14.4 Apply consistent styling
    - Apply Tailwind CSS classes following existing patterns
    - Ensure responsive breakpoints match existing pages
    - Verify accessibility (ARIA labels, keyboard navigation)
    - _Requirements: 11.4, 11.5_
  
  - [ ] 14.5 Test authentication flows
    - Verify admin secret validation on all protected routes
    - Test unauthorized access returns 403
    - Verify no data leakage on auth failures
    - Test public routes accessible without authentication
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 15. Final checkpoint and verification
  - Run full application build without errors
  - Verify all database migrations applied
  - Test complete admin workflow (create, edit, reorder, delete)
  - Test complete public viewing workflow (browse, view detail)
  - Verify file uploads and storage operations
  - Verify markdown rendering and YouTube embeds
  - Test error handling and edge cases
  - Ensure all tests pass
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional property-based test tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical breakpoints
- Property tests validate universal correctness properties defined in the design
- Unit tests and integration tests validate specific examples and integration points
- The implementation uses TypeScript with Next.js App Router patterns
- Authentication uses admin secret validation matching existing admin pages
- Storage follows Supabase Storage patterns from existing project_media system
- Markdown rendering uses react-markdown v10.x with remarkGfm and rehypeHighlight plugins
- All API routes follow RESTful conventions with proper status codes
- Database operations use Prisma with CASCADE delete for referential integrity



## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "3.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "2.4", "2.5", "2.6", "3.2"] },
    { "id": 4, "tasks": ["2.7", "4.1"] },
    { "id": 5, "tasks": ["4.2", "4.3"] },
    { "id": 6, "tasks": ["4.4", "4.5", "4.6", "6.1"] },
    { "id": 7, "tasks": ["6.2", "6.3", "6.4", "6.5", "6.6", "7.1"] },
    { "id": 8, "tasks": ["7.2", "7.3", "9.1"] },
    { "id": 9, "tasks": ["9.2", "10.1"] },
    { "id": 10, "tasks": ["9.3", "9.4", "10.2"] },
    { "id": 11, "tasks": ["9.5", "10.3", "11.1"] },
    { "id": 12, "tasks": ["10.4", "11.2"] },
    { "id": 13, "tasks": ["11.3", "11.4", "12.1"] },
    { "id": 14, "tasks": ["11.5", "12.2"] },
    { "id": 15, "tasks": ["12.3", "12.4", "14.1"] },
    { "id": 16, "tasks": ["14.2", "14.3", "14.4"] },
    { "id": 17, "tasks": ["14.5"] }
  ]
}
```
