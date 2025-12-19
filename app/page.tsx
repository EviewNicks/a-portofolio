import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { SkillsSection } from '@/features/skills';
import { ProjectsSection } from '@/features/projects';
import { ExperienceSection } from '@/features/experience';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
    </main>
  );
}
