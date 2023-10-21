import 'server-only';
import { ProjectListController } from '@/modules/app/projects/ProjectListController';
import { ProjectsPageHeaderController } from '@/modules/app/projects/ProjectsPageHeaderController';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function ActiveProjectsPage() {
  const projects = await getAllProjects();
  return (
    <>
      <ProjectsPageHeaderController archived={false} />
      <ProjectListController projects={projects} />
    </>
  );
}
