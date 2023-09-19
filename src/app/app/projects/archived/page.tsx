import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import ProjectList from '@/modules/app/project/ProjectList';
import ProjectsHeader from '@/modules/app/project/ProjectsHeader';
import { findManyProjects } from '@/modules/app/project/project-model-db';

export default async function ArchivedProjectsPage() {
  const [activeProjects, archivedProjects] = await Promise.all([
    findManyProjects(),
    findManyProjects({ isArchived: true }),
  ]);

  return (
    <AppShell projects={activeProjects}>
      <ProjectsHeader archived={true} />
      <ProjectList projects={archivedProjects} />
    </AppShell>
  );
}
