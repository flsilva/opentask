import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import ProjectList from '@/modules/app/project/ProjectList';
import ProjectsHeader from '@/modules/app/project/ProjectsHeader';
import { findManyProjects } from '@/modules/app/project/project-model-db';

export default async function ActiveProjectsPage() {
  const projects = await findManyProjects();
  return (
    <AppShell projects={projects}>
      <ProjectsHeader archived={false} />
      <ProjectList projects={projects} />
    </AppShell>
  );
}
