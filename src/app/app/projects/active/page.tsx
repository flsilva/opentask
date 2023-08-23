import 'server-only';
import AppShell from '@/app/app/modules/common/AppShell';
import ProjectList from '@/app/app/modules/project/ProjectList';
import ProjectsHeader from '@/app/app/modules/project/ProjectsHeader';
import { findManyProjects } from '@/app/app/modules/project/project-model-db';

export default async function ActiveProjectsPage() {
  const projects = await findManyProjects();
  return (
    <AppShell projects={projects}>
      <ProjectsHeader archived={false} />
      <ProjectList projects={projects} />
    </AppShell>
  );
}
