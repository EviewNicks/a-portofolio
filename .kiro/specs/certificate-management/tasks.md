# Implementation Plan: Certificate Management System

## Overview

This implementation plan breaks down the Certificate Management System into manageable coding tasks, organized by functional area. The system will be built incrementally with proper testing and validation at each checkpoint. Development follows a database-first approach, establishing the data layer before implementing UI components and API endpoints.

---

## Tasks

### 1. Database Setup and Schema

- [x] 1.1 Create Prisma schema migration for courses
  - Add Course model with all required fields (id, name, slug, organisation, issue_date, description, progress, certificate_image, platform, url, status, deleted_at, timestamps)
  - Define CourseStatus enum with 'in_progress' and 'completed' values
  - Add database indexes for status, deleted_at, and slug fields
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12_

- [x] 1.2 Run Prisma migration and verify database schema
  - Execute `prisma migrate dev` to create the courses table
  - Verify table structure matches schema definition
  - Test that indexes are created correctly
  - _Requirements: 1.1, 1.2_

### 2. Core Types and Utilities

- [x] 2.1 Create TypeScript types and interfaces
  - Define Course, CourseStatus, CourseInput, CourseUpdate types in `features/certificates/types.ts`
  - Export types for use across the feature
  - _Requirements: 1.1_

- [x] 2.2 Implement slug generation utility
  - Create `features/certificates/services/slugify.ts` with slug generation function
  - Test that course names are converted to URL-safe slugs (lowercase, hyphens, no special chars)
  - _Requirements: 4.2_

- [x] 2.3 Implement status determination logic
  - Create utility functions in `features/certificates/utils/validation.ts`
  - Implement `determineStatus()` to set status based on progress and certificate_image
  - Implement `categorizeForDisplay()` to determine if course is 'learning' or 'certificate'
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2.4 Create input validation utilities
  - Implement validation for course name, organisation, progress (0-100), issue date
  - Add validation for optional fields (description, url formatting)
  - _Requirements: 7.2, 7.3, 7.4, 7.5_

### 3. Database Query Layer

- [x] 3.1 Create Prisma database queries file
  - Implement `getAllCourses()` - fetches all non-deleted courses sorted by creation date
  - Implement `getCourseBySlug()` - fetches single course by slug, excluding deleted records
  - Implement `createCourse()` - creates new course with slug generation
  - Implement `updateCourse()` - updates course by id
  - Implement `softDeleteCourse()` - sets deleted_at timestamp
  - Store queries in `lib/supabase/queries/certificates.ts`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 13.1, 13.2, 13.3_

- [x] 3.2 Add secret validation helper
  - Create `lib/api/validateSecret.ts` helper function
  - Validates query/request secret parameter against `ADMIN_SECRET_KEY` environment variable
  - Returns boolean indicating validity
  - _Requirements: 5.1, 10.6_

### 4. API Routes - Certificates Endpoint

- [x] 4.1 Create GET /api/certificates route
  - Returns all non-deleted courses as paginated JSON response
  - No authentication required
  - Handle errors with proper HTTP status codes
  - _Requirements: 10.1_

- [x] 4.2 Create GET /api/certificates/[slug] route
  - Returns single course by slug parameter
  - Return 404 if not found or deleted
  - No authentication required
  - _Requirements: 4.6, 10.2_

- [x] 4.3 Create POST /api/certificates route
  - Validate secret parameter (401 if invalid)
  - Validate request body using validation utilities
  - Create new course with slug generation
  - Return 201 with created course data
  - Handle 409 conflict if slug already exists
  - _Requirements: 7.10, 10.3, 10.6_

- [x] 4.4 Create PUT /api/certificates/[id] route
  - Validate secret parameter (401 if invalid)
  - Validate request body fields
  - Update course record by id
  - Return 200 with updated course data
  - Handle 404 if course not found
  - _Requirements: 10.4, 10.6_

- [x] 4.5 Create DELETE /api/certificates/[id] route
  - Validate secret parameter (401 if invalid)
  - Perform soft delete by setting deleted_at timestamp
  - Return 204 No Content on success
  - Handle 404 if course not found
  - _Requirements: 9.4, 10.5, 10.6, 13.1_

### 5. Core Components - Layout and Structure

- [x] 5.1 Create CertificateHeader component
  - Display section rule divider with course count
  - Display page title "Learning & Certificates"
  - Display subtitle and description with editorial styling
  - Use editorial fonts and coral accents
  - _Requirements: 3.4, 12.1, 12.2_

- [x] 5.2 Create CertificateGrid component
  - Accept courses array and display/filter parameters
  - Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
  - Add stagger animation for cards
  - Display "No courses" message when empty
  - _Requirements: 3.5, 3.6, 11.1, 11.2, 11.3_

- [x] 5.3 Create CertificateCard component
  - Display course name, organisation, and progress indicator
  - Show progress bar for in-progress courses
  - Show certificate image thumbnail for completed courses
  - Implement card hover animation
  - Add link to detail page
  - _Requirements: 3.6, 12.5_

- [x] 5.4 Create CourseProgressBar component
  - Display progress percentage (0-100) as animated bar
  - Use coral color for filled portion
  - Animate width changes smoothly
  - _Requirements: 3.6_

- [x] 5.5 Create CertificateImage component
  - Display certificate image with proper aspect ratio
  - Handle missing/invalid images gracefully
  - Implement responsive sizing (600x400px on desktop)
  - _Requirements: 4.5_

### 6. Core Components - Admin Features

- [x] 6.1 Create CertificateActionBar component
  - Display admin mode indicator (amber dot + "Admin Mode")
  - Render different buttons based on context (listing vs detail)
  - On listing page: show "+ Create Course" button
  - On detail page: show "Edit" and "Delete" buttons
  - Style with amber background and backdrop blur
  - _Requirements: 5.2, 5.3, 5.4, 5.5, 6.1_

- [x] 6.2 Create CertificateDeleteModal component
  - Display confirmation modal when delete clicked
  - Require user to type "delete" exactly in input field
  - Disable confirm button until text matches
  - Show loading state during deletion
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 6.3 Create useCertificateForm hook
  - Manage form state (values, errors, loading)
  - Handle form submission (create/update)
  - Integrate with API endpoints
  - Provide reset and validation functions
  - Store in `features/certificates/hooks/useCertificateForm.ts`
  - _Requirements: 7.1, 8.1_

### 7. Pages - Public Listing Page

- [x] 7.1 Create /certificate page (root layout)
  - Fetch all courses from GET /api/certificates
  - Pass isAdmin prop based on secret query parameter
  - Render CertificateListingClient component
  - Set page metadata (title, description)
  - _Requirements: 3.1, 5.1_

- [x] 7.2 Create CertificateListingClient component
  - Accept courses and isAdmin props
  - Separate courses into learning and certificates arrays
  - Render CertificateHeader component
  - Render CertificateActionBar if admin
  - Render two CertificateGrid sections (Learning and Certificates)
  - Implement stagger animations using Framer Motion
  - _Requirements: 3.2, 3.3, 3.4, 3.7, 3.8, 5.1, 5.2, 5.3, 12.4, 12.5_

- [x] 7.3 Checkpoint - Verify listing page functionality
  - Ensure all tests pass
  - Test responsive layout on mobile, tablet, desktop
  - Verify admin mode toggle works with secret parameter
  - Ask user if questions arise

### 8. Pages - Detail Page

- [ ] 8.1 Create /certificate/[slug] page
  - Fetch course by slug from GET /api/certificates/[slug]
  - Generate static params for all courses
  - Return 404 if course not found or deleted
  - Render CertificateDetailClient component
  - _Requirements: 4.1, 4.2_

- [ ] 8.2 Create CertificateDetailClient component
  - Accept course and isAdmin props
  - Display CertificateActionBar if admin
  - Render two-column layout on desktop (image left, details right)
  - Render stacked layout on mobile (image top, details bottom)
  - Display course details with editorial styling
  - Add "View Credential" link if external URL exists
  - Implement Framer Motion reveal animations
  - _Requirements: 4.3, 4.4, 4.5, 4.7, 11.4, 11.5, 12.4_

- [ ] 8.3 Checkpoint - Verify detail page functionality
  - Ensure all tests pass
  - Test responsive layouts
  - Verify admin mode on detail page
  - Ask user if questions arise

### 9. Pages - Admin Course Form

- [ ] 9.1 Create /admin/certificate/new page
  - Check secret authentication (redirect to listing if invalid)
  - Render AdminCourseForm component
  - _Requirements: 7.1_

- [ ] 9.2 Create /admin/certificate/[id]/edit page
  - Check secret authentication (redirect to listing if invalid)
  - Fetch course by id from database
  - Handle 404 if course not found
  - Render AdminCourseForm component with course data
  - _Requirements: 8.1, 8.2_

- [ ] 9.3 Create AdminCourseForm component
  - Build form with all fields from design (name, organisation, issue_date, progress, certificate_image, platform, url, description)
  - Use existing MediaUpload component for certificate_image field
  - Implement progress slider (0-100)
  - Use useCertificateForm hook for state management
  - Validate inputs before submission
  - Show validation errors inline
  - Handle form submission (POST for new, PUT for edit)
  - Redirect to listing or detail page on success
  - Show toast/notification on error
  - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.12, 8.2, 8.3, 8.4_

- [ ] 9.4 Checkpoint - Verify admin forms functionality
  - Ensure all tests pass
  - Test form validation
  - Test create course flow
  - Test edit course flow
  - Ask user if questions arise

### 10. Admin Features - Complete Flow

- [ ] 10.1 Implement admin delete flow
  - Wire up delete button on detail page to open delete modal
  - Implement delete handler that calls DELETE /api/certificates/[id]
  - Pass secret parameter to API
  - Handle success/error responses
  - Redirect to listing page on successful deletion
  - _Requirements: 9.1, 9.5, 9.6_

- [ ] 10.2 Add admin navigation helpers
  - Create breadcrumb navigation for admin pages
  - Show path: Home · Certificates · New/Edit
  - _Requirements: 9.1_

- [ ] 10.3 Checkpoint - Verify complete admin flow
  - Create a test course
  - Edit the test course
  - Delete the test course
  - Verify all redirects work correctly
  - Ask user if questions arise

### 11. Testing - Unit Tests

- [ ] 11.1 Write tests for slug generation utility
  - Test valid course names convert to proper slugs
  - Test special characters are removed/replaced
  - Test multiple spaces become single hyphens
  - _Requirements: 2.1_

- [ ] 11.2 Write tests for status determination logic
  - Test in_progress status for progress < 100
  - Test completed status for progress = 100
  - Test display categorization (learning vs certificate)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 11.3 Write tests for input validation utilities
  - Test required field validation
  - Test progress range validation (0-100)
  - Test URL format validation
  - Test date parsing
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 11.4 Write tests for API route handlers
  - Test GET /api/certificates returns all courses
  - Test GET /api/certificates/[slug] returns correct course
  - Test POST validation and 401 for invalid secret
  - Test PUT validation and updates
  - Test DELETE performs soft delete
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 11.5 Write tests for CertificateCard component
  - Test renders course data correctly
  - Test progress bar displays for in-progress courses
  - Test certificate image shows for completed courses
  - Test link to detail page works
  - _Requirements: 3.6_

- [ ] 11.6 Write tests for CertificateGrid component
  - Test responsive column counts
  - Test empty state message
  - Test stagger animation setup
  - _Requirements: 3.5, 11.1, 11.2, 11.3_

- [ ] 11.7 Write tests for AdminCourseForm component
  - Test form renders with empty fields (create mode)
  - Test form pre-populates with course data (edit mode)
  - Test validation errors display
  - Test form submission calls correct API
  - _Requirements: 7.1, 7.2, 8.1, 8.2_

- [ ] 11.8 Write tests for CertificateActionBar component
  - Test admin mode indicator displays
  - Test buttons render correctly for different contexts
  - Test button links to correct pages
  - _Requirements: 5.2, 5.3, 5.4, 5.5_

### 12. Testing - Integration Tests

- [ ] 12.1 Write end-to-end create course test
  - Navigate to /admin/certificate/new with valid secret
  - Fill form with test data
  - Submit form
  - Verify course appears on listing page
  - _Requirements: 7.1, 7.10_

- [ ] 12.2 Write end-to-end edit course test
  - Navigate to detail page
  - Click edit button
  - Change course data
  - Submit form
  - Verify changes appear on detail page
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 12.3 Write end-to-end delete course test
  - Navigate to detail page
  - Click delete button
  - Type "delete" in confirmation modal
  - Confirm deletion
  - Verify course removed from listing
  - Verify soft delete in database
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 13.1, 13.2, 13.3_

- [ ] 12.4 Write admin authentication test
  - Test that admin controls don't appear without secret
  - Test that admin controls appear with valid secret
  - Test that admin controls don't appear with invalid secret
  - _Requirements: 5.1, 5.2, 5.5_

### 13. Final Integration and Polish

- [ ] 13.1 Wire up all page routing
  - Verify all routes work correctly
  - Test 404 handling for missing courses
  - Test redirects for invalid admin access
  - _Requirements: 3.1, 4.1, 4.6, 7.1, 8.1, 9.1_

- [ ] 13.2 Add error boundaries and error states
  - Wrap components with error boundaries
  - Handle API errors gracefully
  - Display user-friendly error messages
  - Add retry functionality where appropriate
  - _Requirements: 3.1, 8.1_

- [ ] 13.3 Verify design system compliance
  - Check all colors match palette (coral, bone, paper, ink)
  - Verify editorial fonts used correctly
  - Test Framer Motion animations on all components
  - Verify responsive layouts on actual devices/breakpoints
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [ ] 13.4 Final checkpoint - Complete integration test
  - Run all tests and verify they pass
  - Test complete user flow from listing to detail to create to delete
  - Verify no console errors or warnings
  - Test on multiple browsers/devices
  - Ask user if questions arise

---

## Notes

- **Database-First Approach**: Start with schema and migrations to establish the contract before building UI/API
- **API Layer**: Build routes systematically from data queries up through response formatting
- **Component Reusability**: CertificateGrid and CertificateCard handle both learning and certificate displays
- **Admin Mode**: Uses same pattern as existing project management feature (query parameter secret)
- **Soft Delete**: All deletions set `deleted_at` timestamp; queries exclude soft-deleted records
- **Responsive Design**: Use existing tailwind breakpoints (mobile < 768px, tablet 768-1023px, desktop ≥ 1024px)
- **Media Upload**: Reuse existing FeatureMediaUpload component for certificate image uploads
- **Animations**: Use Framer Motion with stagger and reveal patterns established in design
- **Error Handling**: All API errors return proper HTTP status codes with descriptive messages
- **Optional Fields**: Some form fields are optional; ensure validation reflects this

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1", "1.2"]
    },
    {
      "id": 1,
      "tasks": ["2.1", "2.2", "2.3", "2.4", "3.2"]
    },
    {
      "id": 2,
      "tasks": ["3.1"]
    },
    {
      "id": 3,
      "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5"]
    },
    {
      "id": 4,
      "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5", "6.1", "6.2", "6.3"]
    },
    {
      "id": 5,
      "tasks": ["7.1", "7.2", "8.1", "8.2", "9.1", "9.2", "9.3"]
    },
    {
      "id": 6,
      "tasks": ["7.3", "8.3", "10.1", "10.2", "10.3"]
    },
    {
      "id": 7,
      "tasks": ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "11.7", "11.8"]
    },
    {
      "id": 8,
      "tasks": ["12.1", "12.2", "12.3", "12.4"]
    },
    {
      "id": 9,
      "tasks": ["13.1", "13.2", "13.3", "13.4"]
    }
  ]
}
```

