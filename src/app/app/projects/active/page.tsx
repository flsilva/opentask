import 'server-only';
import ProjectListApplication from '@/modules/app/project/ProjectListApplication';
import ProjectsHeader from '@/modules/app/project/ProjectsHeader';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';

export default async function ActiveProjectsPage() {
  const projects = await getAllProjects();
  return (
    <>
      <ProjectsHeader archived={false} />
      <ProjectListApplication projects={projects} />
    </>
  );
}
