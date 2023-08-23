import 'server-only';
import AppShell from '@/app/app/modules/common/AppShell';
import ProjectList from '@/app/app/modules/project/ProjectList';
import ProjectsHeader from '@/app/app/modules/project/ProjectsHeader';
import { findManyProjects } from '@/app/app/modules/project/project-model';

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
