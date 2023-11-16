import 'server-only';
import { notFound } from 'next/navigation';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';

interface EditProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectPage({ params: { projectId } }: EditProjectPageProps) {
  const { data: project, errors } = await getProjectById({ id: projectId });

  if (errors) return <ErrorList errors={errors} />;
  if (!project) notFound();

  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl text-gray-800">Edit project</h1>
      <ProjectForm className="mt-6" project={project} />
    </div>
  );
}
