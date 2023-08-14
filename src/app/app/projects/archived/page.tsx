import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import ProjectList from '@/app/app/shared/project/ProjectList';
import ProjectsHeader from '@/app/app/shared/project/ProjectsHeader';
import { ProjectData } from '@/app/app/shared/project/ProjectData';
import { findManyProjects } from '@/app/app/shared/project/project-model';

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
