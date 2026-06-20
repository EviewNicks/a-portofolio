import { getProjectById } from '@/lib/supabase/queries/projects'
import { ProjectsNavbar } from '@/features/projects/components/navbar/ProjectsNavbar'

interface ProjectDetailLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function ProjectDetailLayout({
  children,
  params,
}: ProjectDetailLayoutProps) {
  const { id } = await params
  const project = await getProjectById(id)

  return (
    <>
      <ProjectsNavbar
        projectTitle={project?.title}
        showBackToProjects={true}
      />
      {children}
    </>
  )
}
