import 'server-only';
import { ProjectFormController } from '@/modules/app/projects/ProjectFormController';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';

interface EditProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectPage({ params: { projectId } }: EditProjectPageProps) {
  const project = await getProjectById({ id: projectId });

  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Edit project</h1>
      <ProjectFormController project={project} />
    </div>
  );
}
