import { ProjectForm } from '@/features/app/projects/ui/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl text-gray-800">Create project</h1>
      <ProjectForm className="mt-6" />
    </div>
  );
}
