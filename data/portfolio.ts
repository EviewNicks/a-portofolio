// Portfolio Data Configuration
export const portfolioConfig = {
  name: 'Ardiansyah',
  title: 'AI Engineer',
  description: 'Professional portfolio showcasing AI engineering capabilities with modern design elements',
  email: 'your-email@example.com',
  location: 'Indonesia',
  timezone: 'Asia/Jakarta',
  
  // Social Links
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    medium: 'https://medium.com/@yourusername'
  },

  // Navigation
  navigation: [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ],

  // SEO Configuration
  seo: {
    title: 'Ardiansyah - AI Engineer Portfolio',
    description: 'Professional AI Engineer specializing in machine learning, deep learning, and modern web development. Explore my projects and expertise.',
    keywords: ['AI Engineer', 'Machine Learning', 'Deep Learning', 'Web Development', 'Portfolio', 'Indonesia'],
    ogImage: '/images/og-image.jpg',
    canonical: 'https://yourportfolio.com'
  }
}

// Skills Data
export const skillsData = [
  {
    id: 'ai-ml',
    category: 'AI & Machine Learning',
    skills: [
      { name: 'Python', level: 95, icon: 'python' },
      { name: 'TensorFlow', level: 90, icon: 'tensorflow' },
      { name: 'PyTorch', level: 85, icon: 'pytorch' },
      { name: 'Scikit-learn', level: 88, icon: 'scikit' },
      { name: 'OpenCV', level: 82, icon: 'opencv' }
    ]
  },
  {
    id: 'web-dev',
    category: 'Web Development',
    skills: [
      { name: 'TypeScript', level: 92, icon: 'typescript' },
      { name: 'React', level: 90, icon: 'react' },
      { name: 'Next.js', level: 88, icon: 'nextjs' },
      { name: 'Node.js', level: 85, icon: 'nodejs' },
      { name: 'Tailwind CSS', level: 90, icon: 'tailwind' }
    ]
  },
  {
    id: 'tools',
    category: 'Tools & Technologies',
    skills: [
      { name: 'Git', level: 90, icon: 'git' },
      { name: 'Docker', level: 80, icon: 'docker' },
      { name: 'AWS', level: 75, icon: 'aws' },
      { name: 'PostgreSQL', level: 82, icon: 'postgresql' },
      { name: 'MongoDB', level: 78, icon: 'mongodb' }
    ]
  }
]

// Experience Data
export const experienceData = [
  {
    id: 'exp-1',
    company: 'Tech Company',
    position: 'Senior AI Engineer',
    duration: '2022 - Present',
    description: 'Leading AI initiatives and developing machine learning solutions for enterprise clients.',
    technologies: ['Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes']
  },
  {
    id: 'exp-2',
    company: 'Startup Inc.',
    position: 'Full Stack Developer',
    duration: '2020 - 2022',
    description: 'Developed web applications and implemented AI features for various client projects.',
    technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Redis']
  }
]