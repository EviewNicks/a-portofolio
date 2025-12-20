# Accessibility & Responsive Design Quick Reference

## Quick Start

### Using Responsive Hooks

```typescript
import { useResponsive } from '@/lib/hooks/useResponsive';

function MyComponent() {
  const { breakpoint, isMobile, isTablet, isDesktop } = useResponsive();
  
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
```

### Using Accessibility Hooks

```typescript
import { useAccessibilityPreferences } from '@/lib/hooks/useAccessibility';

function MyComponent() {
  const { reducedMotion, highContrast } = useAccessibilityPreferences();
  
  return (
    <motion.div
      animate={reducedMotion ? {} : { scale: 1.1 }}
    >
      Content
    </motion.div>
  );
}
```

## Common Patterns

### Responsive Section

```typescript
import { ResponsiveSection } from '@/components/layout/ResponsiveSection';

<ResponsiveSection
  id="my-section"
  ariaLabel="My section description"
  spacing="lg"
  background="muted"
>
  <YourContent />
</ResponsiveSection>
```

### Responsive Grid

```typescript
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';

<ResponsiveGrid
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap="md"
>
  {items.map(item => <Card key={item.id} {...item} />)}
</ResponsiveGrid>
```

### Motion-Safe Animation

```typescript
import { MotionDiv } from '@/components/accessibility/MotionWrapper';

<MotionDiv
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</MotionDiv>
```

### Focus Management

```typescript
import { FocusIndicator } from '@/components/accessibility/FocusIndicator';

<FocusIndicator>
  <button>Click me</button>
</FocusIndicator>
```

## Accessibility Checklist

### For Every Component

- [ ] Add appropriate ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader
- [ ] Verify color contrast (4.5:1 minimum)
- [ ] Support reduced motion preference
- [ ] Add focus indicators
- [ ] Use semantic HTML

### For Interactive Elements

- [ ] Minimum 44px touch target on mobile
- [ ] Visible focus state
- [ ] Keyboard activation (Enter/Space)
- [ ] ARIA role if not semantic HTML
- [ ] Disabled state handling
- [ ] Loading state indication

### For Forms

- [ ] Label all inputs
- [ ] Show validation errors
- [ ] Keyboard navigation between fields
- [ ] Clear error messages
- [ ] Success confirmation
- [ ] Required field indication

## Responsive Breakpoints

```css
/* Mobile: 0-767px */
@media (max-width: 767px) { }

/* Tablet: 768-1023px */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { }

/* Wide: 1440px+ */
@media (min-width: 1440px) { }
```

## CSS Utility Classes

### Accessibility

```css
.sr-only              /* Screen reader only */
.focus-visible        /* Visible focus indicator */
.touch-target         /* Minimum touch target size */
```

### Responsive Typography

```css
.text-responsive-xs   /* Responsive extra small text */
.text-responsive-sm   /* Responsive small text */
.text-responsive-base /* Responsive base text */
.text-responsive-lg   /* Responsive large text */
.text-responsive-xl   /* Responsive extra large text */
```

### Responsive Spacing

```css
.space-responsive-sm  /* Responsive small spacing */
.space-responsive-md  /* Responsive medium spacing */
.space-responsive-lg  /* Responsive large spacing */
.space-responsive-xl  /* Responsive extra large spacing */
```

## Common Issues & Solutions

### Issue: Animation causing motion sickness
**Solution**: Use `MotionWrapper` or check `reducedMotion` preference

```typescript
const { reducedMotion } = useAccessibilityPreferences();
const duration = reducedMotion ? 0.01 : 0.3;
```

### Issue: Focus not visible
**Solution**: Use `FocusIndicator` component or add focus styles

```css
.my-element:focus-visible {
  outline: 2px solid var(--ai-orange);
  outline-offset: 2px;
}
```

### Issue: Touch targets too small
**Solution**: Use `.touch-target` class or ensure minimum 44px

```typescript
<button className="touch-target">
  Click me
</button>
```

### Issue: Layout breaks on mobile
**Solution**: Use responsive components and test at all breakpoints

```typescript
<ResponsiveContainer maxWidth="xl" padding="md">
  <ResponsiveGrid columns={{ mobile: 1, desktop: 3 }}>
    {/* Content */}
  </ResponsiveGrid>
</ResponsiveContainer>
```

## Testing Commands

```bash
# Run accessibility audit
npm run test:a11y

# Test responsive layouts
npm run test:responsive

# Check color contrast
npm run test:contrast

# Full accessibility test suite
npm run test:accessibility
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate forward |
| Shift + Tab | Navigate backward |
| Enter | Activate element |
| Space | Activate button/checkbox |
| Escape | Close modal/dropdown |
| Arrow Keys | Navigate lists/menus |
| Home | Go to first item |
| End | Go to last item |

## ARIA Attributes Reference

```typescript
// Button
<button aria-label="Close dialog">×</button>

// Link
<a href="#" aria-describedby="link-description">Link</a>

// Input
<input aria-label="Search" aria-required="true" />

// Section
<section aria-labelledby="section-heading">
  <h2 id="section-heading">Heading</h2>
</section>

// Live region
<div aria-live="polite" aria-atomic="true">
  Status message
</div>
```

## Resources

- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Responsive Design Patterns](https://responsivedesign.is/patterns/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)