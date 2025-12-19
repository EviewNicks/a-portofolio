import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { SkillsSection } from '@/features/skills';
import { ProjectsSection } from '@/features/projects';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}
