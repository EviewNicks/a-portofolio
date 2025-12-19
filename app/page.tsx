import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { SkillsSection } from '@/features/skills';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
    </main>
  );
}
