import 'server-only';
import { ProjectListApplication } from '@/modules/app/projects/ProjectListApplication';
import { ProjectsHeader } from '@/modules/app/projects/ProjectsHeader';
import { getAllProjects } from '@/modules/app/projects/ProjectRepository';

export default async function ArchivedProjectsPage() {
  const archivedProjects = await getAllProjects({ isArchived: true });

  return (
    <>
      <ProjectsHeader archived={true} />
      <ProjectListApplication projects={archivedProjects} />
    </>
  );
}
