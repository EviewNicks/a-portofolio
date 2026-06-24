# Certificate Image Upload Implementation

## Overview

Implemented proper file upload functionality for certificate images using Supabase Storage, following the same pattern as existing project media uploads.

## Changes Made

### 1. **Storage Service** (`features/certificates/services/storage.service.ts`)

New service for handling certificate image uploads to Supabase Storage:

**Functions:**
- `validateCertificateFile(mimeType, sizeBytes)` - Validates file type and size
- `uploadCertificateToStorage(courseId, fileName, mimeType, buffer)` - Uploads to Supabase
- `deleteCertificateFromStorage(storagePath)` - Deletes from Supabase
- `ensureBucketExists()` - Auto-creates 'certificates' bucket if not exists

**Constraints:**
- Allowed types: JPEG, PNG, WebP
- Max file size: 5MB
- Bucket: `certificates` (public)
- Path format: `{courseId}/{timestamp}-{sanitized-filename}`

### 2. **Upload API Endpoint** (`app/api/certificates/upload/route.ts`)

New POST endpoint for uploading certificate images:

**Endpoint:** `POST /api/certificates/upload`

**Request:**
- Content-Type: `multipart/form-data`
- Fields:
  - `file`: Image file (required)
  - `secret`: Admin secret (required)
  - `course_id`: Course UUID (optional, defaults to `temp-{timestamp}`)

**Response (201):**
```json
{
  "data": {
    "storage_path": "certificates/course-id/1234567890-certificate.jpg",
    "public_url": "https://your-project.supabase.co/storage/v1/object/public/certificates/...",
    "file_name": "certificate.jpg"
  }
}
```

**Error Responses:**
- 400: Invalid form data, missing file, invalid file type, file too large
- 401: Unauthorized (invalid/missing secret)
- 500: Upload failed

### 3. **Updated Types** (`features/certificates/types.ts`)

Added optional field to Course interface:
```typescript
certificate_storage_path?: string // Internal storage path for deletion
```

### 4. **Updated Postman Collection** (`docs/api/certificate.postman.json`)

**New Request:**
- **"2. Upload Certificate Image (Admin)"** - FormData request with file upload
- Auto-saves `public_url` to `{{CERTIFICATE_IMAGE_URL}}` variable

**Updated Requests:**
- All requests renumbered (2→3, 3→4, etc.)
- Create Certificate request now uses `{{CERTIFICATE_IMAGE_URL}}` instead of hardcoded URL

**New Variables:**
- `CERTIFICATE_IMAGE_URL` - Stores uploaded image URL

### 5. **Updated Testing Guide** (`docs/api/certifcate-api-testing.md`)

**Added Sections:**
- Upload endpoint documentation
- File upload test scenarios
- File validation error cases
- Updated expected flow with upload step

**New Test Cases:**
- Invalid file type (415)
- File too large (400)
- Successful upload with auto-save variable

## Usage Flow

### Old Flow (URL-only):
```
1. Manually upload image to external hosting (Imgur, etc.)
2. Copy-paste URL
3. Create certificate with URL
```

### New Flow (File Upload):
```
1. POST /api/certificates/upload (with file)
   → Returns public_url, auto-saved to {{CERTIFICATE_IMAGE_URL}}
   
2. POST /api/certificates (with {{CERTIFICATE_IMAGE_URL}})
   → Creates certificate with uploaded image
```

## Postman Testing Steps

1. **Import Updated Collection**
   - Import `docs/api/certificate.postman.json`

2. **Set Variables**
   - `BASE_URL`: `http://localhost:3000`
   - `ADMIN_SECRET`: Your secret from `.env.local`

3. **Run Tests in Order:**
   1. GET All Certificates (baseline check)
   2. **Upload Certificate Image** ← Select file in Postman
   3. Create Certificate (uses `{{CERTIFICATE_IMAGE_URL}}`)
   4. Create Learning Progress
   5. GET by Slug
   6. Update Certificate
   7. Delete Certificate

4. **File Upload Setup in Postman:**
   - Request → Body → form-data
   - Key: `file`, Type: File
   - Click "Select Files" and choose your certificate image
   - Key: `secret`, Type: Text, Value: `{{ADMIN_SECRET}}`

## Storage Structure

```
Supabase Storage
└── certificates (bucket)
    ├── course-uuid-1/
    │   └── 1234567890-certificate.jpg
    ├── course-uuid-2/
    │   └── 1234567891-react-cert.png
    └── temp-xxx/  (for uploads before course creation)
        └── 1234567892-temp-cert.webp
```

## Security

- ✅ Secret validation required for upload
- ✅ File type validation (only images)
- ✅ File size validation (max 5MB)
- ✅ Filename sanitization (prevent path traversal)
- ✅ Public bucket (read-only for public, write requires auth)

## Database Schema

No schema changes needed - certificate_image field already exists as VARCHAR(2048) to store public URLs.

Optional enhancement (future):
```prisma
model Course {
  // ... existing fields
  certificate_storage_path String? @db.VarChar(512) // For deletion reference
}
```

## Benefits

✅ **Better UX**: Upload directly in form, no external hosting needed  
✅ **Consistent Pattern**: Matches existing project media upload  
✅ **Centralized Storage**: All certificates in one Supabase bucket  
✅ **Automatic Cleanup**: Can implement auto-delete when course deleted  
✅ **Type Safety**: File validation at API level  

## Next Steps (Optional Enhancements)

1. **Store storage_path in database** - Enable automatic cleanup when deleting courses
2. **Add thumbnail generation** - Auto-create smaller versions for listing page
3. **Implement CDN caching** - Improve image load performance
4. **Add image optimization** - Compress images on upload
5. **Frontend upload component** - Add drag-drop UI in admin forms

## Compatibility

- ✅ Backward compatible - API still accepts URL strings
- ✅ Existing certificates work without changes
- ✅ Can mix uploaded files and external URLs
