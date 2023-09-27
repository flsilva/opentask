import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import ProjectListApplication from '@/modules/app/project/ProjectListApplication';
import ProjectsHeader from '@/modules/app/project/ProjectsHeader';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';

export default async function ArchivedProjectsPage() {
  const [activeProjects, archivedProjects] = await Promise.all([
    getAllProjects(),
    getAllProjects({ isArchived: true }),
  ]);

  return (
    <AppShell projects={activeProjects}>
      <ProjectsHeader archived={true} />
      <ProjectListApplication projects={archivedProjects} />
    </AppShell>
  );
}
