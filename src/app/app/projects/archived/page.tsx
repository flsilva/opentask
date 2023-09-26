import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import ProjectList from '@/modules/app/project/ProjectList';
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
      <ProjectList projects={archivedProjects} />
    </AppShell>
  );
}
