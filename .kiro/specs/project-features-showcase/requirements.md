# Requirements Document

## Introduction

The Project Features Showcase system enables portfolio administrators to create and manage detailed feature presentations within projects. Each feature can include multiple images, YouTube video demonstrations, markdown descriptions with syntax highlighting, technical stack information, and demo links. Public users can browse features through a dedicated Features tab and view detailed feature pages with comprehensive media galleries.

This system extends the existing portfolio application built with Next.js App Router, TypeScript, and Supabase, following established patterns for media management and admin authentication.

## Glossary

- **Feature_System**: The Project Features Showcase system
- **Feature**: A specific capability or implementation within a project that can be showcased independently
- **Feature_Media**: Images associated with a feature, stored in Supabase Storage
- **Feature_Detail_Page**: A dedicated page at `/projects/[id]/features/[featureId]` showing complete feature information
- **Admin_Interface**: Protected pages requiring admin secret key authentication
- **Public_Interface**: Publicly accessible pages for viewing features
- **Features_Tab**: A new tab within the project detail page displaying feature cards
- **Media_Gallery**: A component displaying multiple images for a feature
- **Markdown_Description**: Feature description formatted with markdown and syntax highlighting
- **Tech_Stack_Badges**: Visual indicators showing technologies used in a feature
- **Display_Order**: An integer field controlling the sequence in which features appear
- **Supabase_Storage**: Cloud storage service for feature images following existing project_media patterns

## Requirements

### Requirement 1: Feature Data Model

**User Story:** As a developer, I want to store feature data in the database, so that features persist across sessions.

#### Acceptance Criteria

1. THE Feature_System SHALL create a `project_features` table with fields: id (UUID primary key, NOT NULL), project_id (foreign key to projects, NOT NULL), title (text NOT NULL, max 200 characters), description (text, max 50000 characters), youtube_url (text, max 2048 characters), tech_stack (text array, max 50 items), display_order (integer NOT NULL, range 0 to 2147483647), is_featured (boolean NOT NULL), demo_url (text, max 2048 characters), created_at (timestamp NOT NULL, auto-populated), updated_at (timestamp NOT NULL, auto-populated)
2. THE Feature_System SHALL create a `project_feature_media` table with fields: id (UUID primary key, NOT NULL), feature_id (foreign key to project_features, NOT NULL), storage_path (text NOT NULL, max 1024 characters), public_url (text NOT NULL, max 2048 characters), file_name (text NOT NULL, max 255 characters), display_order (integer NOT NULL, default 0), created_at (timestamp NOT NULL, auto-populated)
3. THE Feature_System SHALL enforce foreign key constraints between project_features.project_id and projects.id with CASCADE delete
4. THE Feature_System SHALL enforce foreign key constraints between project_feature_media.feature_id and project_features.id with CASCADE delete
5. THE Feature_System SHALL set default value of display_order to 0
6. THE Feature_System SHALL set default value of is_featured to false
7. WHEN a feature record is updated, THE Feature_System SHALL automatically update the updated_at timestamp to the current server time

### Requirement 2: Feature CRUD Operations

**User Story:** As an administrator, I want to create, read, update, and delete features, so that I can manage project showcase content.

#### Acceptance Criteria

1. WHEN an admin creates a feature with a title, THE Feature_System SHALL validate that title is not empty and does not exceed 200 characters
2. WHEN an admin creates a feature with a description, THE Feature_System SHALL validate that description does not exceed 50000 characters
3. WHEN an admin creates a feature with a youtube_url, THE Feature_System SHALL validate that youtube_url matches the format https://www.youtube.com/watch?v=* or https://youtu.be/*
4. WHEN an admin creates a feature with a demo_url, THE Feature_System SHALL validate that demo_url starts with https:// or http://
5. WHEN an admin creates a feature, THE Feature_System SHALL store the feature with provided title (required), description (optional), youtube_url (optional), tech_stack (optional), demo_url (optional), and is_featured (default false)
6. WHEN an admin creates a feature, THE Feature_System SHALL set created_at and updated_at to current timestamp
7. WHEN an admin updates a feature, THE Feature_System SHALL allow modification of title, description, youtube_url, tech_stack, demo_url, and is_featured fields only
8. WHEN an admin updates a feature, THE Feature_System SHALL validate updated fields using the same validation rules as create operation
9. WHEN an admin updates a feature, THE Feature_System SHALL update the updated_at timestamp to current server time
10. WHEN an admin deletes a feature, THE Feature_System SHALL remove the feature record and all associated feature media records via CASCADE delete
11. WHEN an admin requests features for a project, THE Feature_System SHALL return all features ordered by display_order ascending
12. WHEN an admin requests features for a non-existent project, THE Feature_System SHALL return an empty array
13. WHEN an admin requests a single feature by ID, THE Feature_System SHALL return the feature with all associated media records ordered by display_order ascending
14. WHEN an admin requests a single feature with non-existent ID, THE Feature_System SHALL return a 404 not found error
15. IF an admin attempts to create a feature with invalid field values, THEN THE Feature_System SHALL reject the operation and return a validation error message
16. IF an admin attempts to update a non-existent feature, THEN THE Feature_System SHALL return a 404 not found error
17. IF an admin attempts to delete a non-existent feature, THEN THE Feature_System SHALL return a 404 not found error

### Requirement 3: Feature Media Management

**User Story:** As an administrator, I want to upload multiple images for each feature, so that I can create comprehensive visual presentations.

#### Acceptance Criteria

1. WHEN an admin uploads an image for a feature, THE Feature_System SHALL store the file in Supabase_Storage at path `feature-media/{feature_id}/{filename}`
2. IF an uploaded file size exceeds 10 MB, THEN THE Feature_System SHALL reject the upload and return an error message "File size exceeds 10 MB limit"
3. IF an uploaded file format is not JPEG, PNG, GIF, or WebP, THEN THE Feature_System SHALL reject the upload and return an error message "Unsupported file format. Please upload JPEG, PNG, GIF, or WebP"
4. WHEN an image upload is successful, THE Feature_System SHALL create a project_feature_media record with storage_path, public_url, and file_name
5. IF image storage in Supabase_Storage fails, THEN THE Feature_System SHALL return an error message "Failed to upload image. Please try again"
6. WHEN a feature is deleted, THE Feature_System SHALL delete all associated files from Supabase_Storage via CASCADE delete trigger
7. WHEN a feature media record is deleted, THE Feature_System SHALL remove the file from Supabase_Storage before deleting the database record
8. THE Feature_System SHALL generate public URLs for uploaded images using Supabase Storage public bucket

### Requirement 4: Admin Features Management Interface

**User Story:** As an administrator, I want a dedicated management page for project features, so that I can efficiently organize and edit feature content.

#### Acceptance Criteria

1. THE Feature_System SHALL provide a page at `/admin/projects/[id]/features` requiring admin secret key authentication
2. WHEN an admin accesses the features management page, THE Admin_Interface SHALL display all features for the specified project ordered by display_order ascending
3. THE Admin_Interface SHALL provide a button to create a new feature
4. WHEN an admin clicks a feature, THE Admin_Interface SHALL display a form to edit title (required, max 200 chars), description (optional, max 50000 chars), youtube_url (optional, max 2048 chars), tech_stack (optional, max 50 items), demo_url (optional, max 2048 chars), and is_featured (boolean)
5. THE Admin_Interface SHALL provide a markdown editor with live preview for the description field
6. THE Admin_Interface SHALL provide file upload controls to add multiple images with maximum 20 images per feature and 10 MB per file
7. THE Admin_Interface SHALL display thumbnails of uploaded images (150x150 pixels) with delete buttons
8. THE Admin_Interface SHALL provide a delete button to remove the entire feature with confirmation dialog
9. WHEN an admin drags a feature to a new position, THE Admin_Interface SHALL renumber display_order values sequentially starting from 1
10. WHEN an admin submits the feature form with invalid data, THE Admin_Interface SHALL display field-specific validation error messages without submitting to the server
11. IF feature save operation fails, THEN THE Admin_Interface SHALL display an error message and retain form data
12. WHEN an admin cancels feature editing, THE Admin_Interface SHALL discard unsaved changes and return to the feature list view

### Requirement 5: Public Features Tab

**User Story:** As a user, I want to see a Features tab on project detail pages, so that I can browse available features.

#### Acceptance Criteria

1. THE Public_Interface SHALL add a "Features" tab to the ProjectDetailTabs component
2. WHEN a user selects the Features tab, THE Public_Interface SHALL display feature cards in a responsive grid layout with 1 column on mobile, 2 columns on tablet, and 3 columns on desktop
3. THE Public_Interface SHALL display each feature card with a thumbnail image (first uploaded image by display_order), title, and description excerpt truncated to 150 characters with ellipsis
4. IF a feature has no uploaded images, THEN THE Public_Interface SHALL display a placeholder image on the feature card
5. IF a feature has an empty description, THEN THE Public_Interface SHALL display only the title without an excerpt
6. WHEN a user clicks a feature card, THE Public_Interface SHALL navigate to `/projects/[id]/features/[featureId]`
7. WHEN no features exist for a project, THE Public_Interface SHALL display a message "No features available for this project"
8. THE Public_Interface SHALL order feature cards by display_order ascending

### Requirement 6: Feature Detail Page

**User Story:** As a user, I want to view detailed information about a feature, so that I can understand its capabilities and implementation.

#### Acceptance Criteria

1. THE Public_Interface SHALL provide a page at `/projects/[id]/features/[featureId]`
2. WHEN a user navigates to a Feature_Detail_Page, THE Public_Interface SHALL display the feature title as a heading
3. THE Feature_Detail_Page SHALL display a Media_Gallery showing all uploaded images ordered by display_order with previous and next navigation buttons
4. IF a youtube_url is provided, THEN THE Feature_Detail_Page SHALL embed a YouTube video player using iframe
5. THE Feature_Detail_Page SHALL render the Markdown_Description with syntax highlighting for code blocks
6. THE Feature_Detail_Page SHALL display Tech_Stack_Badges for each technology in the tech_stack array
7. IF a demo_url is provided, THEN THE Feature_Detail_Page SHALL display a button linking to the demo
8. THE Feature_Detail_Page SHALL provide a "Back to Project" button navigating to `/projects/[id]`
9. IF a feature does not exist, THEN THE Feature_Detail_Page SHALL return a 404 not found response
10. IF database retrieval fails for a feature, THEN THE Feature_Detail_Page SHALL return a 500 internal server error response
11. IF the project ID in the URL is invalid, THEN THE Feature_Detail_Page SHALL return a 404 not found response
12. IF the feature exists but belongs to a different project than the project ID in the URL, THEN THE Feature_Detail_Page SHALL return a 404 not found response
13. IF a feature has no uploaded images, THEN THE Feature_Detail_Page SHALL hide the Media_Gallery section

### Requirement 7: Markdown Description Rendering

**User Story:** As an administrator, I want to write feature descriptions in markdown with syntax highlighting, so that I can create well-formatted technical documentation.

#### Acceptance Criteria

1. THE Feature_System SHALL parse markdown descriptions using react-markdown version 10.x with remarkGfm and rehypeHighlight plugins
2. THE Feature_System SHALL apply syntax highlighting to code blocks within markdown descriptions using highlight.js
3. THE Feature_System SHALL support the following markdown elements: paragraphs, headings (h1-h6), ordered lists, unordered lists, links, bold, italic, strikethrough, inline code, code blocks with language specification, blockquotes, horizontal rules, tables, task lists, and line breaks
4. THE Feature_System SHALL sanitize markdown output by disallowing raw HTML rendering to prevent XSS attacks
5. IF a markdown description exceeds 50000 characters, THEN THE Feature_System SHALL reject the input with a validation error
6. IF a markdown description is empty or contains only whitespace, THEN THE Feature_System SHALL render an empty content section without error
7. IF markdown parsing fails due to malformed syntax, THEN THE Feature_System SHALL render the raw markdown text as plain text without error

### Requirement 8: YouTube Video Integration

**User Story:** As an administrator, I want to embed YouTube videos in features, so that I can demonstrate feature functionality.

#### Acceptance Criteria

1. WHEN an admin provides a youtube_url, THE Feature_System SHALL validate that the URL matches the pattern https://www.youtube.com/watch?v=* or https://youtu.be/*
2. WHEN an admin provides a youtube_url, THE Feature_System SHALL store the complete URL without extraction or modification with a maximum length of 2048 characters
3. IF an admin provides an invalid youtube_url format, THEN THE Feature_System SHALL reject the input with a validation error message
4. WHEN rendering a feature detail page with a youtube_url, THE Public_Interface SHALL embed the YouTube video using an iframe player with width 100% and aspect ratio 16:9
5. THE Public_Interface SHALL configure the YouTube embed iframe to enable standard player controls (play, pause, volume, fullscreen)
6. IF a youtube_url is not provided, THEN THE Feature_Detail_Page SHALL not display a video section
7. IF YouTube video fails to load in the iframe, THEN THE Feature_Detail_Page SHALL display the video section with an error message "Video unavailable"

### Requirement 9: Feature Display Order Management

**User Story:** As an administrator, I want to reorder features using drag and drop, so that I can control the presentation sequence.

#### Acceptance Criteria

1. WHEN an admin drags a feature to a new position, THE Admin_Interface SHALL renumber all display_order values in the list sequentially starting from 1
2. WHEN an admin drags a feature, THE Admin_Interface SHALL display a visual drop position indicator showing where the feature will be placed
3. WHEN display_order values are updated, THE Feature_System SHALL persist changes to the database within 5 seconds
4. IF display_order persistence fails, THEN THE Admin_Interface SHALL revert the UI to the previous order and display an error message "Failed to save order. Please try again"
5. IF an admin drops a feature at an invalid position, THEN THE Admin_Interface SHALL cancel the drag operation and return the feature to its original position
6. THE Public_Interface SHALL display features ordered by display_order ascending with lowest display_order appearing first
7. IF persistence fails, THEN THE Admin_Interface SHALL preserve user changes in memory and allow retry without requiring re-drag

### Requirement 10: Authentication and Authorization

**User Story:** As a system, I want to protect admin features with authentication, so that only authorized users can manage content.

#### Acceptance Criteria

1. THE Admin_Interface SHALL require a URL query parameter named "secret" for all admin pages
2. WHEN the "secret" parameter value exactly matches the environment variable ADMIN_SECRET_KEY, THE Admin_Interface SHALL grant access to the admin page
3. IF the "secret" parameter is absent, THEN THE Admin_Interface SHALL deny access and return a 403 forbidden response with message "Access denied"
4. IF the "secret" parameter value does not match ADMIN_SECRET_KEY, THEN THE Admin_Interface SHALL deny access and return a 403 forbidden response with message "Invalid credentials"
5. WHEN an unauthorized user attempts to access an admin page, THE Admin_Interface SHALL not display any admin controls or feature data
6. THE Public_Interface SHALL allow unrestricted access to all pages under `/projects/[id]/features/*` without requiring authentication
7. THE Admin_Interface validation SHALL occur before any data fetching or rendering operations to prevent information disclosure

### Requirement 11: Integration with Existing Project System

**User Story:** As a developer, I want the features system to integrate seamlessly with existing projects, so that users have a consistent experience.

#### Acceptance Criteria

1. THE Feature_System SHALL follow the same TypeScript patterns used in existing project components
2. THE Feature_System SHALL follow the same Supabase client patterns used in existing media management
3. THE Feature_System SHALL follow the same file structure conventions used in the Next.js App Router
4. THE Feature_System SHALL reuse existing UI components for buttons, forms, and layouts where applicable
5. THE Feature_System SHALL use the same styling approach (Tailwind CSS) as existing project pages

### Requirement 12: Parser and Pretty Printer for Feature Data

**User Story:** As a developer, I want to parse and format feature data structures, so that data is consistently validated and formatted.

#### Acceptance Criteria

1. THE Feature_System SHALL provide TypeScript type definitions for Feature, FeatureMedia, and related data structures
2. THE Feature_System SHALL validate incoming feature data against defined types before database operations
3. THE Feature_System SHALL provide utility functions to format feature data for API responses
4. FOR ALL valid feature data objects, parsing then formatting then parsing SHALL produce an equivalent object (round-trip property)
