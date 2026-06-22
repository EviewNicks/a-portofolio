## Error Type
Console Error

## Error Message
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <SegmentViewNode type="page" pagePath="page.tsx">
      <SegmentTrieNode>
      <Home>
        <HeroSection>
        <AboutSection>
          <section id="about" className="relative p...">
            <div>
            <AboutContent aboutData={{personal:{...}, ...}}>
              <div className="container ...">
                <motion.div variants={{initial:{...}, ...}} initial="initial" animate="animate" className="space-y-12...">
                  <div className="space-y-12..." style={{opacity:0}} ref={function useMotionRef.useCallback}>
                    <motion.div variants={{initial:{...}, ...}} className="text-cente...">
                      <div className="text-cente..." style={{opacity:0, ...}} ref={function useMotionRef.useCallback}>
                        <AnimatedText text="About Me" as="h2" variant="slideUp" className="text-3xl m...">
                          <h2
                            ref={null}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold"
-                           style={{opacity:"0",transform:"translateY..."}}
                          >
                        <AnimatedText text="Get to kno..." as="p" variant="fadeIn" delay={0.2} className="text-lg te...">
                          <p
                            ref={null}
                            className="text-lg text-muted-foreground max-w-2xl mx-auto"
-                           style={{opacity:"0"}}
                          >
                    ...
            ...
        ...
    ...



    at h2 (<anonymous>:null:null)
    at AnimatedText (components/common/AnimatedText.tsx:128:9)
    at AboutContent (features/about/components/AboutContent.tsx:80:11)
    at AboutSection (features/about/components/AboutSection.tsx:72:7)
    at Home (app\page.tsx:17:7)

## Code Frame
  126 |       const StaticComponent = Component as React.ElementType
  127 |       return (
> 128 |         <StaticComponent
      |         ^
  129 |           ref={ref}
  130 |           className={className}
  131 |           {...props}

Next.js version: 16.2.9 (Turbopack)
