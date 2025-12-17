'use client'

import { useEffect, useState, useRef, RefObject } from 'react'

export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [RefObject<HTMLElement | null>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        if (isElementIntersecting && !hasTriggered) {
          setIsIntersecting(true)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isElementIntersecting)
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered])

  return [elementRef, isIntersecting]
}

export function useMultipleIntersectionObserver(
  elementsCount: number,
  options: UseIntersectionObserverOptions = {}
) {
  const [visibleElements, setVisibleElements] = useState<boolean[]>(
    new Array(elementsCount).fill(false)
  )
  const elementRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = true } = options
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elementRefs.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) {
            setVisibleElements(prev => {
              const newState = [...prev]
              if (entry.isIntersecting) {
                newState[index] = true
              } else if (!triggerOnce) {
                newState[index] = false
              }
              return newState
            })
          }
        })
      },
      { threshold, root, rootMargin }
    )

    const currentElements = elementRefs.current
    currentElements.forEach(element => {
      if (element) observer.observe(element)
    })

    return () => {
      currentElements.forEach(element => {
        if (element) observer.unobserve(element)
      })
    }
  }, [elementsCount, options])

  const setElementRef = (index: number) => (element: HTMLElement | null) => {
    elementRefs.current[index] = element
  }

  return { visibleElements, setElementRef }
}