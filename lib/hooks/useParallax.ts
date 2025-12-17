'use client'

import { useEffect, useState, useCallback } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export interface ParallaxOptions {
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: [number, number]
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up', offset = [0, 1] } = options
  const { scrollYProgress } = useScroll()

  // Transform scroll progress to parallax values
  const getTransformRange = useCallback(() => {
    const range = 100 * speed
    switch (direction) {
      case 'up':
        return [0, -range]
      case 'down':
        return [0, range]
      case 'left':
        return [0, -range]
      case 'right':
        return [0, range]
      default:
        return [0, -range]
    }
  }, [speed, direction])

  const transformRange = getTransformRange()
  
  const y = useTransform(scrollYProgress, offset, direction === 'up' || direction === 'down' ? transformRange : [0, 0])
  const x = useTransform(scrollYProgress, offset, direction === 'left' || direction === 'right' ? transformRange : [0, 0])

  return {
    y: direction === 'up' || direction === 'down' ? y : undefined,
    x: direction === 'left' || direction === 'right' ? x : undefined,
    scrollYProgress
  }
}

export function useScrollParallax(speed: number = 0.5) {
  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = useCallback(() => {
    setOffsetY(window.pageYOffset * speed)
  }, [speed])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return offsetY
}

export function useMouseParallax(intensity: number = 0.1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Normalize mouse position to -1 to 1 range
      const normalizedX = (clientX / innerWidth) * 2 - 1
      const normalizedY = (clientY / innerHeight) * 2 - 1
      
      setMousePosition({ x: normalizedX, y: normalizedY })
      setParallaxOffset({
        x: normalizedX * intensity * 50,
        y: normalizedY * intensity * 50
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return {
    mousePosition,
    parallaxOffset,
    transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`
  }
}