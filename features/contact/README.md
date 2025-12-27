# Contact Feature

This feature implements the contact section of the AI Engineer Portfolio, providing comprehensive contact information, social links, availability status, and a functional contact form.

## Components

### ContactSection
Main container component that orchestrates the entire contact section with animations and layout.

### ContactContent
Content wrapper that organizes contact information, social links, and contact form in a responsive grid layout.

### ContactInfo
Displays contact details including email, phone, location, timezone, availability status, response time, and languages.

### SocialLinks
Shows social media platforms and professional profiles with proper icons, descriptions, and external links.

### ContactForm
Interactive form with validation for name, email, subject selection, and message. Includes proper error handling and success states.

### AvailabilityStatus
Displays current availability status and different types of opportunities (internship, freelance, collaboration, mentorship) with detailed information.

## Features

- **Responsive Design**: Adapts to desktop, tablet, and mobile layouts
- **Form Validation**: Client-side validation with proper error messages
- **Glassmorphism Effects**: Consistent glass-like visual effects
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML
- **Social Integration**: Links to various professional and social platforms
- **Status Indicators**: Real-time availability status and opportunity types

## Data Integration

The contact section integrates with `docs/data/contact-section.json` to display:
- Contact information (email, phone, location, timezone)
- Social media links and descriptions
- Form configuration and validation rules
- Availability status and opportunity types
- Call-to-action buttons and messaging

## Usage

```tsx
import { ContactSection } from '@/features/contact';
import contactData from '@/docs/data/contact-section.json';

<ContactSection data={contactData} />
```

## Form Integration

The contact form is designed to work with EmailJS or similar services. To integrate:

1. Configure your email service in the form submission handler
2. Update the `emailService` setting in the JSON data
3. Add proper environment variables for API keys
4. Implement actual form submission logic in `ContactForm.tsx`

## Styling

The contact section uses:
- Tailwind CSS for responsive design
- Custom glassmorphism utilities
- Framer Motion for animations
- shadcn/ui components for form elements
- Lucide React icons for visual elements