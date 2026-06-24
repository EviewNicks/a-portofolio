import { HeroSection, WireSection } from '@/features/hero'
import { AboutSection } from '@/features/about'
import { SkillsSection } from '@/features/skills'
import { HomepageProjectsSection } from '@/features/projects/components/HomepageProjectsSection'
import { ExperienceSection } from '@/features/experience'
import { ContactSection } from '@/features/contact'
import { ProjectDetailFooter } from '@/features/projects/components/dynamic/ProjectDetailFooter'

import { ContactSectionData } from '@/lib/types/portfolio'
import contactDataRaw from '@/docs/data/contact-section.json'

export default function Home() {
  const contactData = contactDataRaw as ContactSectionData

  return (
    <>
      <HeroSection />
      <WireSection />
      <AboutSection />
      <SkillsSection />
      <HomepageProjectsSection />
      <ExperienceSection />
      <ContactSection data={contactData} />
      <ProjectDetailFooter />
    </>
  )
}
