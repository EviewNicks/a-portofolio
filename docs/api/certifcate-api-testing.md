# Certificate API Testing Guide

Panduan ringkas untuk testing Certificate Management API menggunakan Postman dengan **FormData only** (file upload wajib).

## Setup

### 1. Import Collection
1. Buka Postman
2. Import file: `docs/api/certificate.postman.json`
3. Collection "Certificate API" akan muncul di sidebar

### 2. Environment Variables
Set variabel berikut di Collection Variables:

| Variable | Value | Deskripsi |
|----------|-------|-----------|
| `BASE_URL` | `http://localhost:3000` | Base URL aplikasi |
| `ADMIN_SECRET` | `your-secret-key-here` | Secret key dari `.env.local` (`ADMIN_SECRET_KEY`) |

**Cara set variables:**
- Klik collection "Certificate API"
- Tab "Variables"
- Update `ADMIN_SECRET` dengan nilai dari `.env.local`

### 3. Jalankan Development Server
```bash
npm run dev
```

## API Endpoints

### Public Endpoints (No Auth)
- `GET /api/certificates` - List semua certificates
- `GET /api/certificates/[id]` - Detail certificate by ID (UUID) atau slug

### Admin Endpoints (Requires Secret + FormData)
- `POST /api/certificates` - Create certificate dengan file upload (FormData)
- `PUT /api/certificates/[id]` - Update certificate dengan optional file upload (FormData)
- `DELETE /api/certificates/[id]?secret=xxx` - Delete certificate

**PENTING:** 
- **FormData only** - tidak support JSON body
- **File upload wajib** untuk POST (create)
- **File upload optional** untuk PUT (update)
- Admin operations (PUT, DELETE) menggunakan **UUID only**

## Test Scenarios (Must Have)

### 1. Get All Certificates
**Request:** `GET /api/certificates`  
**Expected:** Status 200, array of certificates

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Course Name",
      "slug": "course-name",
      "status": "COMPLETED",
      "progress": 100,
      "certificate_image": "https://..."
    }
  ]
}
```

### 2. Create Certificate dengan Image Upload
**Request:** `POST /api/certificates`  
**Body:** FormData
- `name`: "Advanced TypeScript"
- `organisation`: "Frontend Masters"
- `issue_date`: "2024-01-15"
- `description`: "Deep dive into TypeScript"
- `progress`: "100"
- `platform`: "Frontend Masters"
- `url`: "https://..."
- `file`: **Certificate image file (REQUIRED)**
- `secret`: {{ADMIN_SECRET}}

**Expected:** Status 201, status auto-set to `COMPLETED`

```json
{
  "data": {
    "id": "uuid",
    "name": "Advanced TypeScript",
    "slug": "advanced-typescript",
    "progress": 100,
    "certificate_image": "https://supabase.../cert.jpg",
    "status": "COMPLETED"
  }
}
```

**Note:** Image langsung di-upload ke Supabase Storage

### 3. Create Learning Progress dengan Course Image
**Request:** `POST /api/certificates`  
**Body:** FormData
- `name`: "React Performance"
- `organisation`: "Udemy"
- `issue_date`: "2024-02-01"
- `description`: "Optimizing React applications"
- `progress`: "45"
- `platform`: "Udemy"
- `file`: **Course image file (REQUIRED)**
- `secret`: {{ADMIN_SECRET}}

**Expected:** Status 201, status auto-set to `IN_PROGRESS`

**Note:** Untuk learning progress, upload course thumbnail/image (bukan certificate)

### 4. Get Certificate by Slug
**Request:** `GET /api/certificates/advanced-typescript`  
**Expected:** Status 200, single certificate data

**Note:** Endpoint juga accepts UUID: `GET /api/certificates/[uuid]`

### 5. Update Certificate dengan New Image
**Request:** `PUT /api/certificates/[id]`  
**Body:** FormData
- `progress`: "100"
- `file`: **New certificate image (OPTIONAL)**
- `secret`: {{ADMIN_SECRET}}

**Expected:** Status 200, status auto-update to `COMPLETED` if progress=100

**Note:** File optional untuk update - jika tidak ada file, image tidak berubah

### 6. Delete Certificate
**Request:** `DELETE /api/certificates/[id]?secret=xxx`  
**Expected:** Status 204, soft delete (set `deleted_at`)

## Test Scenarios (Should Have)

### Error Handling

#### Missing Image File (400)
**Request:** `POST /api/certificates` (tanpa file)  
**Expected:**
```json
{
  "error": "Image file is required"
}
```

#### Invalid File Type (400)
**Request:** `POST /api/certificates` (upload PDF file)  
**Expected:**
```json
{
  "error": "Invalid file type. Allowed: image/jpeg, image/png, image/webp"
}
```

#### File Too Large (400)
**Request:** `POST /api/certificates` (upload 10MB file)  
**Expected:**
```json
{
  "error": "File size exceeds 5MB limit"
}
```

#### Unauthorized (401)
**Request:** `POST /api/certificates` (no secret)  
**Expected:**
```json
{
  "error": "Unauthorized"
}
```

#### Validation Failed (400)
**Request:** `POST /api/certificates` (empty name)  
**Expected:**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

#### Not Found (404)
**Request:** `GET /api/certificates/non-existent-slug`  
**Expected:**
```json
{
  "error": "Course not found"
}
```

**Note:** Works for both invalid UUID and non-existent slug

#### Duplicate Slug (409)
**Request:** `POST /api/certificates` (duplicate name)  
**Expected:**
```json
{
  "error": "A course with this name already exists"
}
```

## Running Tests

### Option 1: Collection Runner
1. Klik "Certificate API" collection
2. Klik "Run" button
3. **PENTING:** Untuk requests dengan file upload, kamu harus select file manually di setiap request
4. Klik "Run Certificate API"
5. Lihat hasil test di Test Results

### Option 2: Manual Testing (RECOMMENDED)
1. Jalankan requests secara berurutan:
   - Get All (baseline)
   - **Create Certificate** - **SELECT IMAGE FILE** di file field
   - **Create Learning Progress** - **SELECT IMAGE FILE** di file field
   - Get by Slug (gunakan slug dari response create)
   - **Update** - Optional: SELECT NEW IMAGE FILE
   - Delete (gunakan ID dari response create)
   - Error scenarios

2. Verify responses sesuai expected results

### File Upload di Postman
**Cara upload file:**
1. Request → Body → form-data
2. Find `file` key
3. Hover over value field → "Select Files" button muncul
4. Click "Select Files" → Pilih image file
5. Send request

**Tips:**
- Gunakan image files yang kecil (<1MB) untuk testing
- Supported: JPEG, PNG, WebP
- Max size: 5MB

## Expected Flow

```
1. GET /api/certificates → Empty array []
2. POST create certificate → Upload image + data, Status COMPLETED
3. POST create learning → Upload image + data, Status IN_PROGRESS
4. GET /api/certificates → 2 items dengan images
5. GET by slug → Single item dengan image URL
6. PUT update → Optional new image upload
7. DELETE → Soft delete
8. GET /api/certificates → Deleted item not shown
```

## Automated Test Assertions

Setiap request memiliki test scripts yang otomatis verify:
- Status code yang correct
- Response structure (has `data` property)
- Data types dan values
- Certificate image URL exists
- Error messages

**Contoh Test Output:**
```
✓ Status code is 201
✓ Response has course data
✓ Course has certificate_image
✓ Course updated successfully
```

## Tips

1. **File upload wajib**: POST always requires image file
2. **FormData only**: Don't try to use JSON body - will fail
3. **Select files manually**: Postman can't auto-select files in Collection Runner
4. **Check storage**: Verify images uploaded to Supabase Storage bucket `certificates/`
5. **Reset state**: Jalankan DELETE untuk cleanup test data
6. **Certificate vs Course image**: Certificate (progress=100) uses certificate image, Learning Progress (<100) uses course thumbnail

## Validation Rules

- `name` (required): Min 1 char
- `organisation` (required): Min 1 char
- `issue_date` (required): Valid date string
- `progress` (optional): 0-100, default 0
- `file` (required for POST): Image file (JPEG/PNG/WebP, max 5MB)
- `file` (optional for PUT): Image file (JPEG/PNG/WebP, max 5MB)
- `status`: Auto-determined dari progress + certificate_image
  - `COMPLETED`: progress = 100 AND certificate_image exists
  - `IN_PROGRESS`: progress < 100 OR no certificate_image

## Key Differences dari URL-Based Approach

| Aspect | Old (URL-based) | New (FormData) |
|--------|-----------------|----------------|
| Body Type | JSON | FormData |
| Image Field | certificate_image (URL string) | file (File object) |
| Upload Flow | 2 steps (upload → create) | 1 step (create with upload) |
| Required | Optional | **REQUIRED for POST** |
| Manual Upload | External hosting needed | Direct to Supabase |

## Troubleshooting

**400 Invalid form data:**
- Check body type is `form-data`, not `raw JSON`
- Ensure all text fields are type "Text"
- Ensure file field is type "File"

**400 Image file is required:**
- Make sure you selected a file in the `file` field
- File must be selected before sending request

**400 Invalid file type:**
- Only JPEG, PNG, WebP allowed
- Don't upload PDF, GIF, or other formats

**401 Unauthorized:**
- Check `secret` field value = `{{ADMIN_SECRET}}`
- Verify `ADMIN_SECRET` variable is set correctly

**500 Internal Server Error:**
- Check dev server console untuk error details
- Verify Supabase connection
- Check `certificates` bucket exists and is public
