import { TaskForm } from '@/features/app/tasks/ui/TaskForm';

interface NewTaskPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default function NewTaskPage({ searchParams: { projectId } }: NewTaskPageProps) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="mb-6 text-xl text-gray-800">Create task</h1>
      <TaskForm projectId={projectId} startOnEditingMode taskNameClassName="text-2xl" />
    </div>
  );
}
