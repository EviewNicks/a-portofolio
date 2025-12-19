# Portfolio Data Structure Documentation

## 📋 Overview

This directory contains all the JSON data files for the AI Engineer Portfolio website. Each section of the portfolio has its own dedicated JSON file for easy maintenance and updates.

## 📁 File Structure

```
docs/data/
├── index.json              # Main index with metadata
├── personal-info.json      # Basic personal information
├── hero-section.json       # Hero/landing section data
├── about-section.json      # About section content
├── skills-section.json     # Technical skills and categories
├── projects-section.json   # Portfolio projects showcase
├── experience-section.json # Timeline of experiences
├── contact-section.json    # Contact info and form config
└── README.md              # This documentation
```

## 🎯 Section Details

### 1. Personal Info (`personal-info.json`)

**Purpose**: Core personal information used across multiple sections

- Basic information (name, title, location)
- Education details
- Career status and goals
- Personal statistics and achievements

### 2. Hero Section (`hero-section.json`)

**Purpose**: Landing page hero section content

- Main title and subtitle
- Call-to-action buttons
- Background configuration
- Parallax settings

### 3. About Section (`about-section.json`)

**Purpose**: Detailed personal and professional information

- Extended biography
- Education details
- Career objectives and values
- Personal statistics

### 4. Skills Section (`skills-section.json`)

**Purpose**: Technical skills organized by categories

- Skill categories (AI/ML, Programming, Web Dev, DevOps, Databases)
- Individual skill levels and experience
- Learning progress and certifications
- Visual representation data

### 5. Projects Section (`projects-section.json`)

**Purpose**: Portfolio project showcase

- Featured projects (main highlights)
- Academic projects (university work)
- Personal projects (side projects)
- Project filtering and statistics

### 6. Experience Section (`experience-section.json`)

**Purpose**: Professional and educational timeline

- Education history
- Work experience
- Project leadership roles
- Skills progression over time

### 7. Contact Section (`contact-section.json`)

**Purpose**: Contact information and form configuration

- Contact details and availability
- Social media links
- Contact form fields and validation
- Call-to-action content

## 🔧 Usage Instructions

### Importing Data in Components

```typescript
// Import specific section data
import heroData from '@/docs/data/hero-section.json'
import skillsData from '@/docs/data/skills-section.json'

// Use in React components
const HeroSection = () => {
  const { hero } = heroData
  return (
    <section>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
    </section>
  )
}
```

### Updating Content

1. **Individual Updates**: Edit specific JSON files for targeted changes
2. **Bulk Updates**: Use the index.json to track all sections
3. **Validation**: Ensure data matches TypeScript interfaces in `features/*/types.ts`

## 📝 Data Maintenance Guidelines

### Adding New Projects

```json
// In projects-section.json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "Brief description",
  "technologies": ["Tech1", "Tech2"],
  "category": "ai-ml", // Must match ProjectCategory type
  "status": "completed", // Must match ProjectStatus type
  "featured": true
  // ... other required fields
}
```

### Adding New Skills

```json
// In skills-section.json
{
  "id": "skill-id",
  "name": "Skill Name",
  "level": 85, // 1-100
  "experience": "2 years",
  "category": "ai", // Must match category types
  "description": "Skill description"
}
```

### Updating Social Links

```json
// In contact-section.json
{
  "id": "platform-id",
  "platform": "github", // Must match SocialPlatform type
  "url": "https://github.com/username",
  "username": "username",
  "isPublic": true
}
```

## 🎨 Image Assets

### Required Images

- Profile photos: `/public/images/profile/`
- Project screenshots: `/public/images/projects/[project-id]/`
- Skill icons: `/public/images/icons/skills/`
- Background images: `/public/images/backgrounds/`

### Image Naming Convention

```
/public/images/
├── profile/
│   ├── ardiansyah-avatar.jpg
│   └── ardiansyah-professional.jpg
├── projects/
│   ├── [project-id]/
│   │   ├── main-interface.jpg
│   │   └── dashboard.jpg
└── icons/
    └── skills/
        ├── python.svg
        ├── react.svg
        └── tensorflow.svg
```

## 🔍 Data Validation

### TypeScript Integration

All JSON data should conform to TypeScript interfaces:

- `features/hero/types.ts` - Hero section types
- `features/about/types.ts` - About section types
- `features/projects/types.ts` - Projects section types
- `features/contact/types.ts` - Contact section types

### Required Fields Checklist

- [ ] All `id` fields are unique
- [ ] All `url` fields are valid URLs
- [ ] All `date` fields follow ISO format
- [ ] All `category` values match defined types
- [ ] All image paths exist in public directory

## 🚀 Performance Considerations

### Data Loading

- JSON files are statically imported at build time
- No runtime API calls required
- Optimal for static site generation

### File Size Optimization

- Keep individual JSON files under 50KB
- Optimize image references
- Remove unused data fields

## 🔄 Version Control

### Update Process

1. Edit JSON files with new content
2. Update `last_updated` in index.json
3. Test data integration in components
4. Commit changes with descriptive messages

### Backup Strategy

- All data is version controlled with Git
- Regular backups of image assets
- Export functionality for data portability

## 📊 Analytics Integration

### Trackable Elements

- Project view counts
- Contact form submissions
- Social link clicks
- Skill section interactions

### Data Points

```json
{
  "analytics": {
    "project_views": 0,
    "contact_submissions": 0,
    "social_clicks": 0,
    "page_views": 0
  }
}
```

---

## 🎯 Next Steps

1. **Component Integration**: Import data into React components
2. **Image Assets**: Add all required images to public directory
3. **Form Backend**: Implement contact form submission handling
4. **SEO Optimization**: Use data for meta tags and structured data
5. **Analytics Setup**: Implement tracking for user interactions

---

_Last Updated: December 17, 2024_
_Version: 1.0.0_
_Maintainer: Ardiansyah_
