import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { SkillsSection } from '@/features/skills';
import { ProjectsSection } from '@/features/projects';
import { ExperienceSection } from '@/features/experience';
import { ContactSection } from '@/features/contact';
import { PortfolioLayout } from '@/components/layout';
import { AccessibilityDemo } from '@/components/demo/AccessibilityDemo';
import { ContactSectionData } from '@/lib/types/portfolio';
import contactDataRaw from '@/docs/data/contact-section.json';

export default function Home() {
  const contactData = contactDataRaw as ContactSectionData;
  
  return (
    <PortfolioLayout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AccessibilityDemo />
      <ContactSection data={contactData} />
    </PortfolioLayout>
  );
}
