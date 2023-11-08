import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectsPageHeader } from '@/modules/app/projects/ProjectsPageHeader';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function ActiveProjectsPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return (
    <>
      <ProjectsPageHeader archived={false} />
      <ProjectList itemClassName="pl-2" projects={projects || []} />
    </>
  );
}
