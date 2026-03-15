# Requirements Document

## Introduction

Fitur Dynamic Project Management Timeline mengubah portfolio statis menjadi sistem portfolio dinamis berbasis bukti kerja. Sistem ini memungkinkan recruiter dan klien melihat perjalanan teknis Ardiansyah melalui PR GitHub, milestone, video, dan blog post yang diorganisir dalam sprint-based timeline. Admin dapat mengelola semua konten melalui dashboard yang dilindungi secret key.

## Glossary

- **System**: Aplikasi Next.js portfolio (a-portofolio)
- **Project**: Entitas proyek yang memiliki metadata, GitHub repo, dan timeline entries
- **Timeline_Entry**: Satu item dalam timeline proyek (PR, milestone, blog, video, deployment, release)
- **Sprint**: Kelompok timeline entries berdasarkan nomor sprint yang ditentukan secara manual
- **Admin**: Ardiansyah sebagai pemilik portfolio yang mengelola konten via admin dashboard
- **Visitor**: Recruiter, klien, atau pengunjung umum yang melihat portfolio
- **GitHub_Sync**: Proses otomatis mengambil merged PR dari GitHub API
- **YouTube_Preview**: Sistem preview metadata video YouTube sebelum disimpan ke timeline
- **Supabase**: Backend-as-a-service yang digunakan sebagai database dan storage
- **PAT**: Personal Access Token untuk autentikasi GitHub API
- **Secret_Key**: String rahasia yang digunakan untuk mengakses admin dashboard via URL parameter

---

## Requirements

### Requirement 1: Project Data Management

**User Story:** As an Admin, I want to create and manage projects in Supabase, so that I can maintain an up-to-date portfolio with dynamic data.

#### Acceptance Criteria

1. WHEN an Admin submits a valid project creation form, THE System SHALL persist the project to Supabase with fields: title, short_description, long_description, tech_stack, status, and github_repo_url
2. WHEN a github_repo_url is provided, THE System SHALL extract and store github_owner and github_repo from the URL
3. WHEN an Admin updates a project, THE System SHALL update the record in Supabase and set updated_at to the current timestamp
4. WHEN an Admin deletes a project, THE System SHALL remove the project and all associated timeline_entries from Supabase via cascade delete
5. THE System SHALL support project status values of: active, maintenance, and archived
6. IF a project creation form is submitted with an empty title or empty short_description, THEN THE System SHALL reject the submission and return a validation error message

### Requirement 2: Project List Page

**User Story:** As a Visitor, I want to browse all projects on a dedicated projects page, so that I can discover and filter Ardiansyah's work.

#### Acceptance Criteria

1. WHEN a Visitor navigates to `/projects`, THE System SHALL display all projects from Supabase in a grid layout
2. WHEN a Visitor selects a status filter (active, maintenance, archived), THE System SHALL display only projects matching the selected status
3. WHEN a Visitor enters a search query, THE System SHALL display only projects whose title or tech_stack contains the query string (case-insensitive)
4. THE System SHALL display on each project card: title, status badge, short_description, tech_stack tags, sprint count, and PR count
5. WHEN no projects match the active filter or search query, THE System SHALL display an empty state message
6. WHEN a Visitor clicks "View Project" on a project card, THE System SHALL navigate to `/projects/[id]`

### Requirement 3: Project Detail Page

**User Story:** As a Visitor, I want to view comprehensive project details including GitHub stats and sprint timeline, so that I can assess the development process and technical depth.

#### Acceptance Criteria

1. WHEN a Visitor navigates to `/projects/[id]`, THE System SHALL display the project header with: title, long_description, tech_stack, status, and GitHub repo link
2. WHEN a project has a linked GitHub repo, THE System SHALL display GitHub stats: stars, forks, contributors, and last commit date
3. WHEN GitHub API is unavailable, THE System SHALL display the last cached stats and show a "last updated" timestamp
4. THE System SHALL display a sprint-based timeline where timeline_entries are grouped by sprint_number in ascending order
5. WHEN a Visitor navigates to `/projects/[id]` for a non-existent project id, THE System SHALL return a 404 page
6. THE System SHALL display a media gallery section showing uploaded screenshots and linked YouTube videos

### Requirement 4: Timeline Entry Management

**User Story:** As an Admin, I want to add, edit, and delete timeline entries for each project, so that I can document the development journey accurately.

#### Acceptance Criteria

1. THE System SHALL support six timeline entry types: pr, milestone, blog_post, video, deployment, and release
2. WHEN an Admin submits a timeline entry, THE System SHALL require: project_id, entry_type, date, sprint_number, and title
3. WHEN an Admin submits a timeline entry with sprint_number less than 1, THE System SHALL reject the submission with a validation error
4. WHEN an Admin deletes a timeline entry, THE System SHALL remove it from Supabase immediately
5. WHEN an Admin marks a timeline entry as is_featured, THE System SHALL visually highlight that entry in the public timeline view
6. THE System SHALL display timeline entries within each sprint sorted by date in ascending order

### Requirement 5: GitHub PR Auto-Sync

**User Story:** As an Admin, I want to sync merged PRs from GitHub automatically, so that I can populate the timeline with evidence of development work without manual entry.

#### Acceptance Criteria

1. WHEN an Admin triggers a GitHub sync for a project, THE System SHALL fetch all merged PRs from the GitHub API using the project's github_owner and github_repo
2. WHEN a merged PR is fetched, THE System SHALL create a timeline entry with entry_type 'pr', using the PR title, body (truncated to 200 characters), html_url, pr number, author login, and merged_at date
3. WHEN a PR already exists in the database (same github_pr_number for the same project_id), THE System SHALL skip that PR and not create a duplicate entry
4. WHEN the GitHub API returns an error or rate limit response, THE System SHALL display an error message to the Admin and not modify existing data
5. WHEN a GitHub sync completes successfully, THE System SHALL update the project's last_sync_at timestamp

### Requirement 6: YouTube Preview System

**User Story:** As an Admin, I want to preview YouTube video metadata before adding it to the timeline, so that I can verify the correct video is being linked.

#### Acceptance Criteria

1. WHEN an Admin submits a YouTube URL, THE System SHALL extract the video_id from the URL
2. WHEN a valid video_id is extracted, THE System SHALL fetch video metadata from the YouTube Data API v3 including: title, thumbnail_url, and view_count
3. WHEN the YouTube API returns valid metadata, THE System SHALL display a preview card showing the thumbnail, title, and view count before saving
4. WHEN an Admin approves the preview, THE System SHALL create a timeline entry with entry_type 'video' and save the video metadata
5. WHEN an Admin rejects the preview, THE System SHALL discard the preview data without creating a timeline entry
6. IF a YouTube URL is submitted with an invalid or unrecognizable format, THEN THE System SHALL return a validation error without calling the YouTube API
7. IF the YouTube API returns no results for the extracted video_id, THEN THE System SHALL display an error message indicating the video was not found

### Requirement 7: Media Upload (Screenshots)

**User Story:** As an Admin, I want to upload project screenshots to Supabase Storage, so that I can showcase visual evidence of the project in the media gallery.

#### Acceptance Criteria

1. WHEN an Admin uploads an image file, THE System SHALL store the file in Supabase Storage and associate it with the project_id
2. THE System SHALL accept image files in formats: JPEG, PNG, and WebP
3. WHEN an uploaded image exceeds 5MB, THE System SHALL reject the upload and display a file size error
4. WHEN an image is successfully uploaded, THE System SHALL display it in the project's media gallery
5. WHEN an Admin deletes a screenshot, THE System SHALL remove the file from Supabase Storage and remove it from the media gallery

### Requirement 8: Admin Dashboard Authentication

**User Story:** As an Admin, I want to access the admin dashboard via a secret URL parameter, so that I can manage portfolio content without a complex login system.

#### Acceptance Criteria

1. WHEN a request is made to `/admin` with a valid `secret` query parameter matching `ADMIN_SECRET_KEY`, THE System SHALL render the admin dashboard
2. WHEN a request is made to `/admin` with an invalid or missing `secret` query parameter, THE System SHALL render an unauthorized access page without revealing the expected secret
3. WHEN an Admin API endpoint receives a request without a valid secret parameter, THE System SHALL return HTTP 401 and not execute the requested operation
4. THE System SHALL never expose the `ADMIN_SECRET_KEY` value in client-side JavaScript bundles or API responses

### Requirement 9: Project Stats Display

**User Story:** As a Visitor, I want to see GitHub-based project statistics, so that I can quickly gauge the project's activity and community interest.

#### Acceptance Criteria

1. WHEN a project detail page loads and the project has a GitHub repo, THE System SHALL display: stars count, forks count, contributors count, and last commit date
2. THE System SHALL cache GitHub stats responses for 12 hours to avoid exceeding API rate limits
3. WHEN cached GitHub stats are displayed, THE System SHALL show the timestamp of when the stats were last fetched
4. WHEN a project has no linked GitHub repo, THE System SHALL hide the GitHub stats section entirely

### Requirement 10: Sprint-Based Timeline Visualization

**User Story:** As a Visitor, I want to see the development timeline organized by sprints, so that I can understand the progression and scope of work over time.

#### Acceptance Criteria

1. THE System SHALL group all timeline_entries for a project by sprint_number and display each sprint as a distinct visual section
2. WHEN a sprint section is rendered, THE System SHALL display the sprint number and the count of entries in that sprint
3. THE System SHALL display each timeline entry card with: entry type icon, title, date, sprint number, and external link (if present)
4. WHEN a timeline entry has entry_type 'pr', THE System SHALL display the PR status badge (merged, open, or closed)
5. WHEN a timeline entry has entry_type 'video', THE System SHALL display a YouTube embed or thumbnail with a link to the video
6. WHEN a project has no timeline entries, THE System SHALL display an empty state message in the timeline section
