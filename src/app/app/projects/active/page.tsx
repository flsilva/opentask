import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import ProjectListApplication from '@/modules/app/project/ProjectListApplication';
import ProjectsHeader from '@/modules/app/project/ProjectsHeader';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';

export default async function ActiveProjectsPage() {
  const projects = await getAllProjects();
  return (
    <AppShell projects={projects}>
      <ProjectsHeader archived={false} />
      <ProjectListApplication projects={projects} />
    </AppShell>
  );
}
