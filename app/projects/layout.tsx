import { ProjectsNavbar } from './_components/ProjectsNavbar';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectsNavbar />
      {children}
    </>
  );
}
