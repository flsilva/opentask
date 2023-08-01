import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import ProjectList from '@/app/app/shared/project/ProjectList';
import ProjectsHeader from '@/app/app/shared/project/ProjectsHeader';
import { findManyProjects } from '@/app/app/shared/project/project-model';

export default async function ActiveProjectsPage() {
  const projects = await findManyProjects();
  return (
    <AppShell projects={projects}>
      <ProjectsHeader archived={false} />
      <ProjectList projects={projects} />
    </AppShell>
  );
}
