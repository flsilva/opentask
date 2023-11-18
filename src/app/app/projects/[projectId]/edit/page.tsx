import 'server-only';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';

interface EditProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default function EditProjectPage({ params: { projectId } }: EditProjectPageProps) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl text-gray-800">Edit project</h1>
      <ProjectForm className="mt-6" projectId={projectId} />
    </div>
  );
}
