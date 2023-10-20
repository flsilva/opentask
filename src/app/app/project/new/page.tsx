import 'server-only';
import { ProjectFormApplication } from '@/modules/app/project/ProjectFormApplication';

export default function NewProjectPage() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Create project</h1>
      <ProjectFormApplication />
    </div>
  );
}
