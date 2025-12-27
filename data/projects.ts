import { Project } from '@/lib/types/portfolio'

// Sample Projects Data
export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'AI-Powered Image Recognition System',
    description: 'Advanced computer vision system for real-time object detection and classification',
    longDescription: 'A comprehensive AI system that leverages deep learning models for accurate image recognition. Built with TensorFlow and deployed on AWS for scalable performance.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'AWS', 'Docker'],
    category: 'ai-ml',
    status: 'completed',
    featured: true,
    images: [
      {
        id: 'img-1',
        url: '/images/projects/ai-recognition-1.jpg',
        alt: 'AI Recognition System Dashboard',
        isPrimary: true
      }
    ],
    links: [
      {
        id: 'link-1',
        type: 'github',
        url: 'https://github.com/yourusername/ai-recognition',
        label: 'View Source Code'
      },
      {
        id: 'link-2',
        type: 'demo',
        url: 'https://ai-recognition-demo.com',
        label: 'Live Demo'
      }
    ],
    highlights: [
      'Real-time object detection with 95% accuracy',
      'Deployed on AWS with auto-scaling capabilities',
      'Processes 1000+ images per minute'
    ],
    createdAt: '2023-06-15',
    updatedAt: '2023-08-20'
  },
  {
    id: 'project-2',
    title: 'Modern Portfolio Website',
    description: 'Responsive portfolio website with glassmorphism design and smooth animations',
    longDescription: 'A modern, responsive portfolio website built with Next.js 14, featuring glassmorphism effects, parallax scrolling, and optimized performance.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'web-development',
    status: 'completed',
    featured: true,
    images: [
      {
        id: 'img-2',
        url: '/images/projects/portfolio-1.jpg',
        alt: 'Portfolio Website Homepage',
        isPrimary: true
      }
    ],
    links: [
      {
        id: 'link-3',
        type: 'github',
        url: 'https://github.com/yourusername/portfolio',
        label: 'View Source Code'
      },
      {
        id: 'link-4',
        type: 'demo',
        url: 'https://yourportfolio.com',
        label: 'Visit Website'
      }
    ],
    highlights: [
      'Modern glassmorphism design system',
      'Optimized for 90+ Lighthouse score',
      'Fully responsive across all devices'
    ],
    createdAt: '2023-09-01',
    updatedAt: '2023-12-15'
  },
  {
    id: 'project-3',
    title: 'Data Analytics Dashboard',
    description: 'Interactive dashboard for real-time data visualization and analytics',
    longDescription: 'A comprehensive analytics platform that processes large datasets and provides interactive visualizations for business intelligence.',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    category: 'data-science',
    status: 'in-progress',
    featured: false,
    images: [
      {
        id: 'img-3',
        url: '/images/projects/dashboard-1.jpg',
        alt: 'Analytics Dashboard Interface',
        isPrimary: true
      }
    ],
    links: [
      {
        id: 'link-5',
        type: 'github',
        url: 'https://github.com/yourusername/analytics-dashboard',
        label: 'View Source Code'
      }
    ],
    highlights: [
      'Interactive D3.js visualizations',
      'Real-time data processing',
      'Handles 10M+ data points'
    ],
    createdAt: '2023-10-01',
    updatedAt: '2023-12-10'
  }
]

// Project Categories
export const projectCategories = [
  { id: 'all', label: 'All Projects', count: projectsData.length },
  { id: 'ai-ml', label: 'AI & ML', count: projectsData.filter(p => p.category === 'ai-ml').length },
  { id: 'web-development', label: 'Web Development', count: projectsData.filter(p => p.category === 'web-development').length },
  { id: 'data-science', label: 'Data Science', count: projectsData.filter(p => p.category === 'data-science').length },
  { id: 'mobile', label: 'Mobile', count: projectsData.filter(p => p.category === 'mobile').length }
]

// Featured Projects
export const featuredProjects = projectsData.filter(project => project.featured)