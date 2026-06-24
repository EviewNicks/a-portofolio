# Requirements Document

## Introduction

The Certificate Management System provides a standalone certificate page (`/certificate`) for displaying learning courses and certificates. The system treats Learning Progress and Certificates as a single entity (Course) differentiated by completion status. Courses with progress less than 100% appear in the Learning Progress section, while courses with 100% progress and a certificate image appear in the Certificates section. The system includes admin functionality for managing courses through a secret-based authentication mechanism.

## Glossary

- **Course**: A learning entity that represents either in-progress learning or a completed certificate, determined by progress percentage and certificate image presence
- **Certificate**: A Course with 100% progress and an associated certificate image
- **Learning Progress**: A Course with progress less than 100%, representing ongoing learning
- **AdminActionBar**: A UI component that provides administrative actions (create, edit, delete) visible only when secret authentication is active
- **Secret**: A query parameter value that enables admin mode when matching the environment configuration
- **Soft Delete**: Archiving a record by setting a deleted_at timestamp rather than permanently removing it
- **Slug**: A URL-friendly identifier derived from the course name for routing

## Requirements

### Requirement 1: Course Data Model

**User Story:** As a developer, I want a Course data model, so that learning progress and certificate data can be stored and managed in the database.

#### Acceptance Criteria

1. THE Course_Model SHALL include an id field as a unique identifier
2. THE Course_Model SHALL include a name field for the course or certificate title
3. THE Course_Model SHALL include an organisation field for the issuing organization
4. THE Course_Model SHALL include an issue_date field for the completion or issue date
5. THE Course_Model SHALL include a description field for course details
6. THE Course_Model SHALL include a progress field as a numeric value between 0 and 100
7. THE Course_Model SHALL include an optional certificate_image field for the certificate image URL
8. THE Course_Model SHALL include an optional platform field for the learning platform name
9. THE Course_Model SHALL include an optional url field for external course or credential links
10. THE Course_Model SHALL include a status field with values 'in_progress' or 'completed'
11. THE Course_Model SHALL include an optional deleted_at field for soft delete functionality
12. THE Course_Model SHALL include created_at and updated_at timestamp fields

### Requirement 2: Course Status Determination

**User Story:** As a user, I want courses automatically categorized by their progress, so that I can easily distinguish between learning progress and completed certificates.

#### Acceptance Criteria

1. WHEN a Course has progress less than 100, THE System SHALL set the status to 'in_progress'
2. WHEN a Course has progress equal to 100 and has a certificate_image, THE System SHALL set the status to 'completed'
3. WHEN a Course has progress equal to 100 but lacks a certificate_image, THE System SHALL set the status to 'completed'
4. THE System SHALL automatically update status when progress or certificate_image changes

### Requirement 3: Certificate Listing Page

**User Story:** As a visitor, I want to view all courses on a certificate listing page, so that I can see learning progress and completed certificates.

#### Acceptance Criteria

1. WHEN a user navigates to /certificate, THE System SHALL display a Certificate Listing Page
2. THE Certificate_Listing_Page SHALL display two sections: Learning Progress and Certificates
3. WHEN rendering the Learning Progress section, THE System SHALL display only Courses with status 'in_progress'
4. WHEN rendering the Certificates section, THE System SHALL display only Courses with status 'completed' and a certificate_image
5. THE Certificate_Listing_Page SHALL use a responsive grid layout with 1 column on mobile, 2 columns on tablet, and 3 columns on desktop
6. THE Certificate_Listing_Page SHALL display each Course as a card with name, organisation, and progress or completion indicator
7. THE Certificate_Listing_Page SHALL match the existing portfolio editorial design style
8. THE Certificate_Listing_Page SHALL use Framer Motion animations for card entrance effects

### Requirement 4: Certificate Detail Page

**User Story:** As a visitor, I want to view certificate details on a dedicated page, so that I can see the certificate image and full information.

#### Acceptance Criteria

1. WHEN a user navigates to /certificate/[slug], THE System SHALL display a Certificate Detail Page
2. THE System SHALL derive the slug from the Course name
3. WHEN displaying on desktop, THE Certificate_Detail_Page SHALL show a two-column layout with certificate image on the left and details on the right
4. WHEN displaying on mobile, THE Certificate_Detail_Page SHALL show the certificate image above the details
5. THE Certificate_Detail_Page SHALL display the Course name, organisation, issue date, and description
6. WHEN a Course with the specified slug does not exist or is deleted, THE System SHALL return a 404 response
7. THE Certificate_Detail_Page SHALL use Framer Motion animations for content reveal

### Requirement 5: Admin Mode Authentication

**User Story:** As an administrator, I want to access admin mode via a secret query parameter, so that I can manage courses without requiring a separate authentication system.

#### Acceptance Criteria

1. WHEN a user navigates to /certificate?secret=xxx where xxx matches the configured secret, THE System SHALL enable admin mode
2. WHEN admin mode is enabled, THE System SHALL display the AdminActionBar component
3. WHEN admin mode is enabled, THE System SHALL show admin action buttons for create, edit, and delete operations
4. WHEN the secret parameter does not match the configured value, THE System SHALL NOT enable admin mode
5. THE System SHALL use the same secret validation pattern as the existing project management feature

### Requirement 6: Admin Action Bar Component

**User Story:** As an administrator, I want an action bar to manage courses, so that I can perform CRUD operations from the certificate pages.

#### Acceptance Criteria

1. WHEN admin mode is enabled on the Certificate Listing Page, THE System SHALL display an AdminActionBar with a Create Course button
2. WHEN admin mode is enabled on the Certificate Detail Page, THE System SHALL display an AdminActionBar with Edit and Delete buttons
3. THE AdminActionBar SHALL match the visual style of the existing project AdminActionBar
4. THE AdminActionBar SHALL display an amber indicator showing "Admin Mode" status
5. THE AdminActionBar SHALL provide responsive button layout for different screen sizes

### Requirement 7: Course Creation Form

**User Story:** As an administrator, I want a form to create new courses, so that I can add learning progress and certificates to the portfolio.

#### Acceptance Criteria

1. WHEN an administrator navigates to /admin/certificate/new with a valid secret, THE System SHALL display the Course Creation Form
2. THE Course_Creation_Form SHALL include a Name field as a required text input
3. THE Course_Creation_Form SHALL include an Organisation field as a required text input
4. THE Course_Creation_Form SHALL include an Issue Date field as a date picker
5. THE Course_Creation_Form SHALL include a Description field as a textarea
6. THE Course_Creation_Form SHALL include a Progress field as a slider or numeric input between 0 and 100
7. THE Course_Creation_Form SHALL include a Certificate Image field as a media upload component
8. THE Course_Creation_Form SHALL include an optional Platform field as a text input
9. THE Course_Creation_Form SHALL include an optional URL field as a URL input
10. WHEN the form is submitted with valid data, THE System SHALL create a new Course record
11. WHEN a Course is created, THE System SHALL redirect to the Certificate Listing Page
12. THE Media_Upload_Component SHALL use the same upload system as the existing project media upload

### Requirement 8: Course Edit Form

**User Story:** As an administrator, I want a form to edit existing courses, so that I can update course information and progress.

#### Acceptance Criteria

1. WHEN an administrator navigates to /admin/certificate/[id]/edit with a valid secret, THE System SHALL display the Course Edit Form
2. THE Course_Edit_Form SHALL pre-populate all fields with the existing Course data
3. THE Course_Edit_Form SHALL include the same fields as the Course Creation Form
4. WHEN the form is submitted with valid data, THE System SHALL update the Course record
5. WHEN a Course is updated, THE System SHALL redirect to the Certificate Detail Page for that Course

### Requirement 9: Course Deletion

**User Story:** As an administrator, I want to delete courses with confirmation, so that I can remove outdated or incorrect entries safely.

#### Acceptance Criteria

1. WHEN an administrator clicks the Delete button, THE System SHALL display a confirmation modal
2. THE Confirmation_Modal SHALL require the administrator to type "delete" in an input field
3. WHEN the confirmation input matches "delete" exactly, THE System SHALL enable the confirm delete button
4. WHEN the confirm delete button is clicked, THE System SHALL perform a soft delete by setting the deleted_at timestamp
5. WHEN a Course is deleted, THE System SHALL redirect to the Certificate Listing Page
6. WHEN a Course is soft deleted, THE System SHALL NOT display it on any public pages

### Requirement 10: Course API Endpoints

**User Story:** As a developer, I want API endpoints for course management, so that the frontend can communicate with the database.

#### Acceptance Criteria

1. THE System SHALL provide a GET /api/certificates endpoint that returns all non-deleted Courses
2. THE System SHALL provide a GET /api/certificates/[slug] endpoint that returns a single Course by slug
3. THE System SHALL provide a POST /api/certificates endpoint that creates a new Course
4. THE System SHALL provide a PUT /api/certificates/[id] endpoint that updates an existing Course
5. THE System SHALL provide a DELETE /api/certificates/[id] endpoint that soft deletes a Course
6. WHEN an API request includes an invalid secret parameter, THE System SHALL return a 401 Unauthorized response for mutation endpoints
7. THE GET endpoints SHALL NOT require authentication

### Requirement 11: Responsive Design

**User Story:** As a visitor, I want the certificate pages to be responsive, so that I can view them on any device.

#### Acceptance Criteria

1. WHEN viewing on mobile devices (width < 768px), THE System SHALL display a single-column layout for course cards
2. WHEN viewing on tablet devices (width >= 768px and < 1024px), THE System SHALL display a two-column layout for course cards
3. WHEN viewing on desktop devices (width >= 1024px), THE System SHALL display a three-column layout for course cards
4. WHEN viewing the Certificate Detail Page on mobile, THE System SHALL stack the image above the details
5. WHEN viewing the Certificate Detail Page on desktop, THE System SHALL display the image and details side-by-side
6. THE System SHALL maintain the editorial design style across all screen sizes

### Requirement 12: Design System Integration

**User Story:** As a developer, I want the certificate pages to match the existing design system, so that the portfolio has a consistent visual identity.

#### Acceptance Criteria

1. THE Certificate_Pages SHALL use the coral accent color for labels and highlights
2. THE Certificate_Pages SHALL use editorial fonts (font-editorial-tight, font-editorial-serif, font-editorial-body)
3. THE Certificate_Pages SHALL use the bone/paper color palette
4. THE Certificate_Pages SHALL use Framer Motion whileInView animations for scroll-triggered effects
5. THE Certificate_Pages SHALL use stagger animations for card lists
6. THE Course_Cards SHALL match the visual style of existing project cards

### Requirement 13: Soft Delete Implementation

**User Story:** As an administrator, I want deleted courses to be archived rather than permanently removed, so that data can be recovered if needed.

#### Acceptance Criteria

1. WHEN a Course is deleted, THE System SHALL set the deleted_at field to the current timestamp
2. WHEN querying Courses, THE System SHALL exclude records where deleted_at is not null
3. WHEN a Course has a deleted_at value, THE System SHALL NOT display it on any public pages
4. THE System SHALL preserve all Course data including media when soft deleted
