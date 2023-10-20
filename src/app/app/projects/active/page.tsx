import 'server-only';
import { ProjectListApplication } from '@/modules/app/projects/ProjectListApplication';
import { ProjectsHeader } from '@/modules/app/projects/ProjectsHeader';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function ActiveProjectsPage() {
  const projects = await getAllProjects();
  return (
    <>
      <ProjectsHeader archived={false} />
      <ProjectListApplication projects={projects} />
    </>
  );
}
