import 'server-only';
import { getAllProjects } from '@/modules/app/projects/ProjectRepository';
import { getTaskById } from '@/modules/app/tasks/TaskRepository';
import { TaskForm } from '@/modules/app/tasks/TaskForm';

interface TaskPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskPage({ params: { taskId } }: TaskPageProps) {
  const [projects, task] = await Promise.all([getAllProjects(), getTaskById(taskId)]);

  if (!task) return;

  return (
    <div className="flex flex-col mt-10">
      <TaskForm
        project={task.project}
        projects={projects}
        shouldStartOnEditingMode={false}
        task={task}
        taskNameClassName="text-2xl"
      />
    </div>
  );
}
