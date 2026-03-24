import { ProjectsNavbar } from '../../features/projects/components/navbar/ProjectsNavbar';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectsNavbar />
      {children}
    </>
  );
}
