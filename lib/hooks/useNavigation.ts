'use client';

import { useState, useEffect, useCallback } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface UseNavigationOptions {
  offset?: number;
  threshold?: number;
}

export function useNavigation(
  items: NavigationItem[],
  options: UseNavigationOptions = {}
) {
  const { offset = 80, threshold = 0.3 } = options;
  const [activeSection, setActiveSection] = useState(items[0]?.id || '');
  const [isScrolling, setIsScrolling] = useState(false);

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      setIsScrolling(true);
      const sectionTop = section.offsetTop - offset;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [offset]);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return; // Don't update during programmatic scroll

      const scrollPosition = window.scrollY + window.innerHeight * threshold;
      const sections = items.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      // Find the active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, threshold, isScrolling]);

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToSection(hash);
      }
    };

    // Check initial hash
    const initialHash = window.location.hash;
    if (initialHash) {
      setTimeout(() => {
        scrollToSection(initialHash);
      }, 100);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToSection]);

  return {
    activeSection,
    scrollToSection,
    isScrolling,
  };
}