import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';

interface EditProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectPage({ params: { projectId } }: EditProjectPageProps) {
  const { data: project, errors } = await getProjectById({ id: projectId });

  if (errors) return <ErrorList errors={errors} />;

  if (!project) {
    return (
      <p className="text-sm my-20">We couldn&apos;t find that Project. Maybe it got deleted?</p>
    );
  }

  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Edit project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
