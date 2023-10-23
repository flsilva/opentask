import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectListController } from '@/modules/app/projects/ProjectListController';
import { ProjectsPageHeaderController } from '@/modules/app/projects/ProjectsPageHeaderController';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function ArchivedProjectsPage() {
  const { data: archivedProjects, errors } = await getAllProjects({ isArchived: true });

  if (errors) return <ErrorList errors={errors} />;

  return (
    <>
      <ProjectsPageHeaderController archived={true} />
      <ProjectListController projects={archivedProjects || []} />
    </>
  );
}
