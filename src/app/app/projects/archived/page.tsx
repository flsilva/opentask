import 'server-only';
import { ProjectListController } from '@/modules/app/projects/ProjectListController';
import { ProjectsPageHeaderController } from '@/modules/app/projects/ProjectsPageHeaderController';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function ArchivedProjectsPage() {
  const archivedProjects = await getAllProjects({ isArchived: true });

  return (
    <>
      <ProjectsPageHeaderController archived={true} />
      <ProjectListController projects={archivedProjects} />
    </>
  );
}
