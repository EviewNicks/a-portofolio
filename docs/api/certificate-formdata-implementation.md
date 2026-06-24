# Certificate API - FormData Implementation

## Overview

Unified certificate creation and image upload into single endpoint using FormData. Image upload is now **required** for all POST requests and **optional** for PUT requests.

## Key Changes Summary

### ❌ **Old Flow (2-step, URL-based):**
```
Step 1: POST /api/certificates/upload → Upload image → Get URL
Step 2: POST /api/certificates (JSON) → Create with URL
```

### ✅ **New Flow (1-step, FormData):**
```
POST /api/certificates (FormData) → Upload image + Create course in one request
```

## Implementation Details

### 1. **POST /api/certificates** - FormData with File Upload

**Changed from:** JSON body with `certificate_image` URL  
**Changed to:** FormData with file upload

**Request Body (FormData):**
```
name: string (required)
organisation: string (required)
issue_date: string (required)
description: string (optional)
progress: number (optional, 0-100)
platform: string (optional)
url: string (optional)
file: File (REQUIRED - image file)
secret: string (required)
```

**Response (201):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Course Name",
    "slug": "course-name",
    "certificate_image": "https://supabase.../image.jpg",
    "progress": 100,
    "status": "COMPLETED",
    ...
  }
}
```

**Flow:**
1. Parse FormData fields
2. Validate course input
3. Validate file (type, size)
4. Upload to Supabase Storage (`certificates/{temp-id}/{timestamp}-{filename}`)
5. Create course with uploaded image URL
6. Return complete course data

### 2. **PUT /api/certificates/[id]** - FormData with Optional File Upload

**Changed from:** JSON body with `certificate_image` URL  
**Changed to:** FormData with optional file upload

**Request Body (FormData):**
```
name: string (optional)
organisation: string (optional)
issue_date: string (optional)
description: string (optional)
progress: number (optional)
platform: string (optional)
url: string (optional)
file: File (OPTIONAL - new image file)
secret: string (required)
```

**Flow:**
1. Parse FormData fields
2. Check if `file` field exists
3. If file exists → upload to storage → add URL to update
4. If no file → use existing image
5. Update course
6. Return updated course data

### 3. **Deleted Endpoint**

- ❌ **Removed:** `POST /api/certificates/upload`
- **Reason:** No longer needed - upload integrated into create/update

## Files Modified

### API Routes

1. **`app/api/certificates/route.ts`**
   - Changed POST from JSON to FormData
   - Added file upload logic
   - Added file validation
   - Integrated storage service

2. **`app/api/certificates/[id]/route.ts`**
   - Changed PUT from JSON to FormData
   - Added optional file upload logic
   - File upload only happens if file field present

3. **`app/api/certificates/upload/route.ts`**
   - ❌ **DELETED** - No longer needed

### Documentation

1. **`docs/api/certificate.postman.json`**
   - Removed "Upload Certificate Image" request
   - Changed "Create Certificate" to FormData
   - Changed "Update Certificate" to FormData
   - Updated all request numbering
   - Removed `CERTIFICATE_IMAGE_URL` variable

2. **`docs/api/certifcate-api-testing.md`**
   - Complete rewrite for FormData approach
   - Added file upload instructions for Postman
   - Updated test scenarios
   - Added FormData troubleshooting

3. **`docs/api/certificate-formdata-implementation.md`**
   - This document (implementation guide)

## Testing with Postman

### Create Certificate (POST)

1. Request → Body → **form-data**
2. Add text fields:
   - `name` = "Advanced TypeScript"
   - `organisation` = "Frontend Masters"
   - `issue_date` = "2024-01-15"
   - `progress` = "100"
   - `secret` = {{ADMIN_SECRET}}
3. Add file field:
   - Key: `file`
   - Type: **File**
   - Value: Click "Select Files" → Choose image
4. Send request

### Update Certificate (PUT)

1. Request → Body → **form-data**
2. Add fields to update:
   - `progress` = "100"
   - `secret` = {{ADMIN_SECRET}}
3. **Optional:** Add new image:
   - Key: `file`
   - Type: **File**
   - Value: Click "Select Files" → Choose new image
4. Send request

## Image Upload Requirements

### File Validation

- **Allowed types:** JPEG, PNG, WebP
- **Max size:** 5MB
- **Required for:** POST (create)
- **Optional for:** PUT (update)

### Storage Structure

```
Supabase Storage
└── certificates/
    ├── temp-{timestamp}/       (for new courses)
    │   └── {timestamp}-cert.jpg
    └── {course-uuid}/          (for updates)
        └── {timestamp}-cert-new.jpg
```

### Auto-Cleanup Consideration

Current implementation uploads to `temp-{timestamp}` folder for new courses. Consider future enhancement to move/reorganize after course creation.

## API Response Changes

### Before (URL-based):
```json
{
  "data": {
    "certificate_image": "https://example.com/cert.jpg"  // External URL
  }
}
```

### After (FormData):
```json
{
  "data": {
    "certificate_image": "https://project.supabase.co/storage/v1/object/public/certificates/..."  // Supabase URL
  }
}
```

## Benefits

✅ **Simpler API** - One request instead of two  
✅ **Better UX** - Upload and create in one step  
✅ **Consistent Storage** - All images in Supabase  
✅ **Required Upload** - Ensures all courses have images  
✅ **Atomic Operation** - Upload + Create together  

## Breaking Changes

⚠️ **BREAKING:** API no longer accepts JSON body  
⚠️ **BREAKING:** `certificate_image` field no longer accepts URL strings  
⚠️ **BREAKING:** `/api/certificates/upload` endpoint removed  
⚠️ **BREAKING:** File upload required for POST  

## Migration Guide

### For Existing API Clients:

**Old Code (JSON):**
```javascript
const response = await fetch('/api/certificates?secret=xxx', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Course Name',
    certificate_image: 'https://...'
  })
})
```

**New Code (FormData):**
```javascript
const formData = new FormData()
formData.append('name', 'Course Name')
formData.append('organisation', 'Org Name')
formData.append('issue_date', '2024-01-15')
formData.append('file', imageFile)  // File object
formData.append('secret', 'xxx')

const response = await fetch('/api/certificates', {
  method: 'POST',
  body: formData  // No Content-Type header needed
})
```

### For Frontend Forms:

```tsx
// React example with file input
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  
  const formData = new FormData(e.target as HTMLFormElement)
  formData.append('secret', adminSecret)
  
  const response = await fetch('/api/certificates', {
    method: 'POST',
    body: formData
  })
  
  const result = await response.json()
  // result.data.certificate_image = Supabase URL
}

return (
  <form onSubmit={handleSubmit}>
    <input name="name" required />
    <input name="organisation" required />
    <input name="issue_date" type="date" required />
    <input name="progress" type="number" min="0" max="100" />
    <input name="file" type="file" accept="image/*" required />
    <button type="submit">Create</button>
  </form>
)
```

## Error Handling

### New Error Cases:

**Missing File (400):**
```json
{
  "error": "Image file is required"
}
```

**Invalid Form Data (400):**
```json
{
  "error": "Invalid form data"
}
```

**Invalid File Type (400):**
```json
{
  "error": "Invalid file type. Allowed: image/jpeg, image/png, image/webp"
}
```

**File Too Large (400):**
```json
{
  "error": "File size exceeds 5MB limit"
}
```

## Security Considerations

✅ **Secret validation** - Required for all mutations  
✅ **File type validation** - Only images allowed  
✅ **File size validation** - Max 5MB  
✅ **Filename sanitization** - Prevents path traversal  
✅ **Public bucket** - Read-only for public, write requires auth  

## Performance Considerations

- **Upload size:** Max 5MB enforced
- **Concurrent uploads:** Limited by Supabase rate limits
- **Storage costs:** Consider cleanup of old images
- **CDN:** Supabase provides CDN for public bucket

## Future Enhancements

1. **Image optimization:** Compress images on upload
2. **Thumbnail generation:** Auto-generate thumbnails
3. **Cleanup old images:** Delete when course deleted or image replaced
4. **Progress tracking:** Show upload progress in frontend
5. **Drag-drop UI:** Better file upload UX
6. **Multiple images:** Support for additional images (gallery)

## Rollback Plan

If issues arise, temporary rollback options:

1. **Quick fix:** Make file optional for POST (remove required check)
2. **Full rollback:** Revert to JSON + separate upload endpoint
3. **Hybrid approach:** Support both FormData and JSON (detect Content-Type)

## Testing Checklist

- [x] POST with valid image → Creates course with uploaded image
- [x] POST without image → Returns 400 error
- [x] POST with invalid file type → Returns 400 error
- [x] POST with oversized file → Returns 400 error
- [x] PUT with new image → Updates with new uploaded image
- [x] PUT without image → Updates without changing image
- [x] DELETE → Soft deletes course (image remains in storage)
- [x] GET → Returns courses with Supabase image URLs

## Support

For issues or questions:
1. Check Postman collection for working examples
2. Review testing guide for setup instructions
3. Check server console logs for detailed errors
4. Verify Supabase bucket configuration
