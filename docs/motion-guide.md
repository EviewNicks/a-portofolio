# Framer Motion Enhancement Guide

## Current Implementation

HeroSection uses **staggered entrance animations** with:
- Initial state: `opacity: 0, y: -20px`
- Animated state: `opacity: 1, y: 0px`
- Duration: `0.8s` per element
- Stagger: `200ms` between elements

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.8 }}
>
  Content
</motion.div>
```

---

## Quick Enhancement Examples

### 1. Hover Button Animation
```tsx
<motion.a
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  {action.text}
</motion.a>
```

### 2. Stat Card Hover
```tsx
<motion.div
  whileHover={{ y: -8 }}
  transition={{ duration: 0.3 }}
  className="stat"
>
  {/* stat content */}
</motion.div>
```

### 3. Animated Ring Value
```tsx
<motion.span
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: index * 0.15, type: 'spring' }}
  className="ring"
>
  {stat.value}
</motion.span>
```

### 4. Scroll-Triggered Animation (Advanced)
```tsx
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {/* content */}
    </motion.section>
  )
}
```

### 5. Counter Animation (Stat Values)
```tsx
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setCount(value), 500)
    return () => clearTimeout(timer)
  }, [value])
  
  return <motion.span>{count}</motion.span>
}
```

### 6. Parallax Scroll Effect
```tsx
import { useScroll, useTransform, motion } from 'framer-motion'

export function ParallaxBg() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])
  
  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 -z-10"
    >
      {/* background */}
    </motion.div>
  )
}
```

---

## Animation Timing Guide

| Effect | Duration | Easing | Use Case |
|--------|----------|--------|----------|
| Fade In | 400-600ms | `ease` | Entry animations |
| Hover Scale | 200ms | `spring` | Interactive feedback |
| Page Transition | 300-500ms | `ease-in-out` | Route changes |
| Scroll Parallax | Variable | Linear | Background effects |
| Counter | 2000ms | `ease-out` | Value animations |
| Bounce | 500ms | `spring` | Attention grabbers |

---

## Next Phase: Wire Section

The wire section below hero uses **marquee animations**:

```tsx
// Horizontal infinite scroll
<motion.div
  initial={{ x: 0 }}
  animate={{ x: -1000 }}
  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
  className="marquee-track"
>
  {/* items repeat */}
</motion.div>
```

---

## Performance Tips

✅ **Good Practices**:
- Use `transform: translateY()` instead of `top:`
- Use `opacity` instead of visibility changes
- Enable GPU acceleration with `will-change: transform`
- Limit simultaneous animations

❌ **Avoid**:
- Animating `width` or `height`
- Animating `left`, `top`, `right`, `bottom`
- Too many simultaneous animations
- High-frequency re-renders during animation

---

## Component-Level Implementation

### Current File
- Location: `/features/hero/components/HeroSection.tsx`
- Lines: ~175 lines
- Animation pattern: Sequential stagger (200ms delay)

### To Add Enhancements:
1. Import `useInView` from framer-motion
2. Wrap interactive elements in `whileHover` props
3. Test on mobile - reduce motion with `prefers-reduced-motion`
4. Profile performance with Chrome DevTools

---

## Accessibility

Always respect user preferences:

```tsx
import { useReducedMotion } from 'framer-motion'

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : 0.2
      }}
    >
      Content
    </motion.div>
  )
}
```

