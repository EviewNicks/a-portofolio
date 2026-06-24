import { HeroSection, WireSection } from '@/features/hero'
import { AboutSection } from '@/features/about'
import { SkillsSection } from '@/features/skills'
import { HomepageProjectsSection } from '@/features/projects/components/HomepageProjectsSection'
import { ExperienceSection } from '@/features/experience'
import { ContactSection } from '@/features/contact'
import { ProjectDetailFooter } from '@/features/projects/components/dynamic/ProjectDetailFooter'
import { getAllCourses } from '@/features/certificates/services/course.service'
import type { Course } from '@/features/certificates/types'

import { ContactSectionData } from '@/lib/types/portfolio'
import contactDataRaw from '@/docs/data/contact-section.json'

// Revalidate every 60s so new certificates appear without a full redeploy
export const revalidate = 60

export default async function Home() {
  const contactData = contactDataRaw as ContactSectionData

  // Fetch courses from DB for LearningProgress section
  let courses: Course[] = []
  try {
    courses = await getAllCourses()
  } catch {
    // Silently fallback to empty — LearningProgress handles empty state gracefully
  }

  return (
    <>
      <HeroSection />
      <WireSection />
      <AboutSection />
      <SkillsSection courses={courses} />
      <HomepageProjectsSection />
      <ExperienceSection />
      <ContactSection data={contactData} />
      <ProjectDetailFooter />
    </>
  )
}
