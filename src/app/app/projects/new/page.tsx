import 'server-only';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Create project</h1>
      <ProjectForm renderOnModal />;
    </div>
  );
}
