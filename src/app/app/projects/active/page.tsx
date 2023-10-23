import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectListController } from '@/modules/app/projects/ProjectListController';
import { ProjectsPageHeaderController } from '@/modules/app/projects/ProjectsPageHeaderController';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function ActiveProjectsPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return (
    <>
      <ProjectsPageHeaderController archived={false} />
      <ProjectListController projects={projects || []} />
    </>
  );
}
