# Feature API Testing Plan

## Overview
Dokumentasi testing plan untuk Project Features Showcase API menggunakan Postman/Thunder Client.

**Base URL:** `http://localhost:3000`  
**Admin Secret:** `{{ADMIN_SECRET}}` (dari environment variable)

---

## Prerequisites

### Setup Environment Variables (Postman)
```json
{
  "base_url": "http://localhost:3000",
  "admin_secret": "your-admin-secret-key",
  "test_project_id": "uuid-of-test-project",
  "test_feature_id": "uuid-of-test-feature",
  "test_media_id": "uuid-of-test-media"
}
```

### Test Data Requirements
- 1 existing project (untuk testing)
- Image files untuk upload testing (JPEG, PNG, GIF, WebP)
- Invalid file untuk negative testing (PDF, MP4, etc.)

---

## API Endpoints Testing

### 1. **GET /api/projects/[id]/features**
**Purpose:** Get all features untuk suatu project

#### Test Cases:

**TC-1.1: Get Features - Success (Empty)**
- **Method:** GET
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features`
- **Expected:** 200, `{ data: [] }`

**TC-1.2: Get Features - Success (With Data)**
- **Method:** GET
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features`
- **Expected:** 200, array of features ordered by `display_order`
- **Validation:**
  - Each feature has `id`, `title`, `project_id`
  - Features ordered by `display_order` ASC
  - Media included if exists

**TC-1.3: Get Features - Non-existent Project**
- **Method:** GET
- **URL:** `{{base_url}}/api/projects/invalid-uuid/features`
- **Expected:** 200, `{ data: [] }`

---

### 2. **GET /api/projects/[id]/features/[featureId]**
**Purpose:** Get single feature dengan media

#### Test Cases:

**TC-2.1: Get Feature - Success**
- **Method:** GET
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}`
- **Expected:** 200
- **Validation:**
  - Feature object complete
  - Media array ordered by `display_order`
  - `project_id` matches URL param

**TC-2.2: Get Feature - Not Found**
- **Method:** GET
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/invalid-uuid`
- **Expected:** 404, `{ error: "Feature not found" }`

**TC-2.3: Get Feature - Wrong Project**
- **Method:** GET
- **URL:** `{{base_url}}/api/projects/different-project-id/features/{{test_feature_id}}`
- **Expected:** 404 (feature exists but belongs to different project)

---

### 3. **POST /api/projects/[id]/features**
**Purpose:** Create new feature (Admin Only)

#### Test Cases:

**TC-3.1: Create Feature - Success (Minimal Data)**
- **Method:** POST
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features?secret={{admin_secret}}`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Test Feature"
}
```
- **Expected:** 201
- **Validation:**
  - Returns created feature with `id`
  - `display_order` defaults to 0
  - `is_featured` defaults to false
  - `created_at` and `updated_at` populated

**TC-3.2: Create Feature - Success (Full Data)**
- **Method:** POST
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features?secret={{admin_secret}}`
- **Body:**
```json
{
  "title": "Complete Feature",
  "description": "# Test Feature\n\nThis is a **markdown** description.\n\n```js\nconsole.log('code block');\n```",
  "youtube_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "tech_stack": ["React", "TypeScript", "Next.js"],
  "demo_url": "https://example.com/demo",
  "is_featured": true,
  "display_order": 5
}
```
- **Expected:** 201
- **Validation:** All fields saved correctly

**TC-3.3: Create Feature - Unauthorized (No Secret)**
- **Method:** POST
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features`
- **Body:** `{ "title": "Test" }`
- **Expected:** 401, `{ error: "Unauthorized" }`

**TC-3.4: Create Feature - Invalid Secret**
- **Method:** POST
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features?secret=wrong-secret`
- **Body:** `{ "title": "Test" }`
- **Expected:** 401

**TC-3.5: Create Feature - Validation Errors**
- **Method:** POST
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features?secret={{admin_secret}}`
- **Body:**
```json
{
  "title": "",
  "description": "a".repeat(50001),
  "youtube_url": "https://vimeo.com/123",
  "demo_url": "ftp://example.com"
}
```
- **Expected:** 400
- **Validation:**
```json
{
  "error": "Validation failed",
  "details": {
    "title": "Title is required",
    "description": "Description must not exceed 50000 characters",
    "youtube_url": "Invalid YouTube URL format",
    "demo_url": "Demo URL must start with http:// or https://"
  }
}
```

**TC-3.6: Create Feature - Title Too Long**
- **Body:** `{ "title": "a".repeat(201) }`
- **Expected:** 400, title error

**TC-3.7: Create Feature - Tech Stack Limit**
- **Body:** `{ "title": "Test", "tech_stack": Array(51).fill("React") }`
- **Expected:** 400, tech_stack error

---

### 4. **PUT /api/projects/[id]/features/[featureId]**
**Purpose:** Update existing feature (Admin Only)

#### Test Cases:

**TC-4.1: Update Feature - Success (Partial)**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}?secret={{admin_secret}}`
- **Body:**
```json
{
  "title": "Updated Title"
}
```
- **Expected:** 200
- **Validation:**
  - Title updated
  - Other fields unchanged
  - `updated_at` timestamp updated

**TC-4.2: Update Feature - Success (Full)**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}?secret={{admin_secret}}`
- **Body:** Full feature data
- **Expected:** 200

**TC-4.3: Update Feature - Not Found**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/invalid-uuid?secret={{admin_secret}}`
- **Body:** `{ "title": "Test" }`
- **Expected:** 404

**TC-4.4: Update Feature - Wrong Project**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/different-project-id/features/{{test_feature_id}}?secret={{admin_secret}}`
- **Body:** `{ "title": "Test" }`
- **Expected:** 404

**TC-4.5: Update Feature - Unauthorized**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}`
- **Body:** `{ "title": "Test" }`
- **Expected:** 401

**TC-4.6: Update Feature - Validation Errors**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}?secret={{admin_secret}}`
- **Body:** Invalid data (same as TC-3.5)
- **Expected:** 400 with field errors

---

### 5. **DELETE /api/projects/[id]/features/[featureId]**
**Purpose:** Delete feature (Admin Only)

#### Test Cases:

**TC-5.1: Delete Feature - Success**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}?secret={{admin_secret}}`
- **Expected:** 200, `{ success: true }`
- **Validation:**
  - GET returns 404 after delete
  - Associated media deleted (CASCADE)
  - Storage files cleaned up

**TC-5.2: Delete Feature - Not Found**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/invalid-uuid?secret={{admin_secret}}`
- **Expected:** 404

**TC-5.3: Delete Feature - Wrong Project**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/projects/different-project-id/features/{{test_feature_id}}?secret={{admin_secret}}`
- **Expected:** 404

**TC-5.4: Delete Feature - Unauthorized**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/{{test_feature_id}}`
- **Expected:** 401

---

### 6. **PUT /api/projects/[id]/features/reorder**
**Purpose:** Bulk update display order (Admin Only)

#### Test Cases:

**TC-6.1: Reorder Features - Success**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/reorder?secret={{admin_secret}}`
- **Body:**
```json
[
  { "id": "feature-id-1", "display_order": 1 },
  { "id": "feature-id-2", "display_order": 2 },
  { "id": "feature-id-3", "display_order": 3 }
]
```
- **Expected:** 200, `{ success: true }`
- **Validation:**
  - GET features shows new order
  - All features renumbered

**TC-6.2: Reorder Features - Invalid Format (Not Array)**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/reorder?secret={{admin_secret}}`
- **Body:** `{ "id": "test", "display_order": 1 }`
- **Expected:** 400, `{ error: "Expected an array of updates" }`

**TC-6.3: Reorder Features - Missing Fields**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/reorder?secret={{admin_secret}}`
- **Body:**
```json
[
  { "id": "feature-id-1" }
]
```
- **Expected:** 400, error about missing `display_order`

**TC-6.4: Reorder Features - Unauthorized**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/reorder`
- **Body:** Valid array
- **Expected:** 401

**TC-6.5: Reorder Features - Empty Array**
- **Method:** PUT
- **URL:** `{{base_url}}/api/projects/{{test_project_id}}/features/reorder?secret={{admin_secret}}`
- **Body:** `[]`
- **Expected:** 200 (no-op)

---

### 7. **POST /api/features/media/upload**
**Purpose:** Upload image untuk feature (Admin Only)

#### Test Cases:

**TC-7.1: Upload Media - Success (JPEG)**
- **Method:** POST
- **URL:** `{{base_url}}/api/features/media/upload?secret={{admin_secret}}`
- **Headers:** `Content-Type: multipart/form-data`
- **Body (FormData):**
  - `file`: image.jpg (< 10MB)
  - `feature_id`: {{test_feature_id}}
- **Expected:** 201
- **Validation:**
```json
{
  "data": {
    "id": "uuid",
    "feature_id": "uuid",
    "storage_path": "feature-media/{featureId}/image.jpg",
    "public_url": "https://...",
    "file_name": "image.jpg",
    "display_order": 0,
    "created_at": "timestamp"
  }
}
```

**TC-7.2: Upload Media - Success (PNG, GIF, WebP)**
- Test dengan setiap format yang didukung
- **Expected:** 201 untuk semua

**TC-7.3: Upload Media - File Too Large**
- **Body:** File > 10MB
- **Expected:** 400, `{ error: "File size exceeds 10 MB limit" }`

**TC-7.4: Upload Media - Invalid File Type (PDF)**
- **Body:** document.pdf
- **Expected:** 400, `{ error: "Unsupported file format. Please upload JPEG, PNG, GIF, or WebP" }`

**TC-7.5: Upload Media - Invalid File Type (MP4)**
- **Body:** video.mp4
- **Expected:** 400, unsupported format error

**TC-7.6: Upload Media - Missing File**
- **Body:** Only `feature_id` field
- **Expected:** 400, `{ error: "file is required" }`

**TC-7.7: Upload Media - Missing feature_id**
- **Body:** Only `file` field
- **Expected:** 400, `{ error: "feature_id is required" }`

**TC-7.8: Upload Media - Feature Not Found**
- **Body:** `feature_id` = invalid UUID
- **Expected:** 404, `{ error: "Feature not found" }`

**TC-7.9: Upload Media - Unauthorized**
- **URL:** Without `?secret=...`
- **Expected:** 401

**TC-7.10: Upload Media - Secret in FormData**
- **Body (FormData):**
  - `file`: image.jpg
  - `feature_id`: uuid
  - `secret`: {{admin_secret}}
- **Expected:** 201 (secret dari FormData field)

**TC-7.11: Upload Media - Secret in Header**
- **Headers:** `x-admin-secret: {{admin_secret}}`
- **Body:** file + feature_id
- **Expected:** 201

---

### 8. **DELETE /api/features/media/[id]**
**Purpose:** Delete media file (Admin Only)

#### Test Cases:

**TC-8.1: Delete Media - Success**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/features/media/{{test_media_id}}?secret={{admin_secret}}`
- **Expected:** 200, `{ success: true }`
- **Validation:**
  - Media record deleted from DB
  - File deleted from storage
  - GET media returns 404

**TC-8.2: Delete Media - Not Found**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/features/media/invalid-uuid?secret={{admin_secret}}`
- **Expected:** 404, `{ error: "Media not found" }`

**TC-8.3: Delete Media - Unauthorized**
- **Method:** DELETE
- **URL:** `{{base_url}}/api/features/media/{{test_media_id}}`
- **Expected:** 401

**TC-8.4: Delete Media - Storage Cleanup Graceful Degradation**
- Setup: Manually delete file from storage first
- **Method:** DELETE
- **URL:** `{{base_url}}/api/features/media/{{test_media_id}}?secret={{admin_secret}}`
- **Expected:** 200 (DB deletion succeeds even if storage fails)

---

## Integration Test Scenarios

### Scenario 1: Complete Feature Lifecycle
```
1. POST /api/projects/{id}/features - Create feature
2. POST /api/features/media/upload - Upload 3 images
3. GET /api/projects/{id}/features/{featureId} - Verify data
4. PUT /api/projects/{id}/features/{featureId} - Update title
5. DELETE /api/features/media/{id} - Delete 1 image
6. DELETE /api/projects/{id}/features/{featureId} - Delete feature
7. GET /api/projects/{id}/features/{featureId} - Verify 404
```

### Scenario 2: Multiple Features with Ordering
```
1. Create 3 features (display_order: 0, 0, 0)
2. PUT /api/projects/{id}/features/reorder - Set order 3, 1, 2
3. GET /api/projects/{id}/features - Verify ordering
4. Create 1 more feature (display_order: 0)
5. PUT /api/projects/{id}/features/reorder - Reorder all 4
6. GET - Verify final order
```

### Scenario 3: Validation Edge Cases
```
1. Create feature with title exactly 200 chars - SUCCESS
2. Create feature with title 201 chars - FAIL
3. Create with description exactly 50000 chars - SUCCESS
4. Create with description 50001 chars - FAIL
5. Upload file exactly 10MB - SUCCESS
6. Upload file 10MB + 1 byte - FAIL
```

### Scenario 4: CASCADE Delete Verification
```
1. Create feature
2. Upload 5 media files
3. GET feature - Verify 5 media
4. DELETE feature
5. Verify:
   - Feature deleted (404)
   - All 5 media deleted from DB
   - All 5 files deleted from storage
```

---

## Test Execution Order

### Phase 1: Setup & Public Endpoints
1. Get existing project ID
2. TC-1.1 to TC-1.3 (GET features - empty state)
3. TC-2.2 (GET feature - not found)

### Phase 2: Feature CRUD (Admin)
4. TC-3.1, TC-3.2 (Create features - save IDs)
5. TC-2.1 (GET feature - success)
6. TC-4.1, TC-4.2 (Update features)
7. TC-6.1, TC-6.5 (Reorder features)

### Phase 3: Media Upload
8. TC-7.1, TC-7.2 (Upload valid files)
9. TC-7.3 to TC-7.9 (Validation errors)
10. TC-8.1 (Delete media)

### Phase 4: Negative Tests
11. All unauthorized tests (TC-x.x - Unauthorized)
12. All validation error tests
13. All not-found tests

### Phase 5: Cleanup & Integration
14. Integration Scenario 1
15. Integration Scenario 4 (CASCADE)
16. Delete all test data

---

## Success Criteria

✅ All 50+ test cases pass  
✅ All validation errors return proper error messages  
✅ All unauthorized requests return 401  
✅ CASCADE deletes work correctly  
✅ File uploads work for all supported formats  
✅ Display order updates persist correctly  
✅ No data leakage in error responses

---

## Tools & Setup

### Recommended: Postman Collection
- Import collection JSON (create separate file)
- Set environment variables
- Run collection with Newman for CI/CD

### Alternative: Thunder Client (VS Code)
- Lightweight, integrated in VS Code
- Manual testing during development

### Alternative: REST Client (VS Code Extension)
- Test requests in `.http` files
- Good for documentation

---

## Notes

- **Admin Secret:** Never commit actual secrets to version control
- **Test Data:** Use dedicated test project, clean up after tests
- **File Uploads:** Prepare test images in `tests/fixtures/` folder
- **CI/CD:** Integrate with GitHub Actions for automated API testing
- **Performance:** Monitor response times (should be < 1s for most endpoints)
