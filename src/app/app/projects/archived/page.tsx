import 'server-only';
import { ProjectListApplication } from '@/modules/app/project/ProjectListApplication';
import { ProjectsHeader } from '@/modules/app/project/ProjectsHeader';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';

export default async function ArchivedProjectsPage() {
  const archivedProjects = await getAllProjects({ isArchived: true });

  return (
    <>
      <ProjectsHeader archived={true} />
      <ProjectListApplication projects={archivedProjects} />
    </>
  );
}
