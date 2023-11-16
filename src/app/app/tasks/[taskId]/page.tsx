import 'server-only';
import { notFound } from 'next/navigation';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getTaskById } from '@/modules/app/tasks/TasksRepository';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { TaskProjectsSelect } from '@/modules/app/tasks/TaskProjectsSelect';

interface TaskPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskPage({ params: { taskId } }: TaskPageProps) {
  const { data: task, errors: taskErrors } = await getTaskById(taskId);

  if (taskErrors) return <ErrorList errors={taskErrors} />;
  if (!task) notFound();

  return (
    <TaskForm
      className="mt-10"
      projectsSelect={<TaskProjectsSelect defaultValue={task.projectId} taskId={task.id} />}
      shouldStartOnEditingMode={false}
      task={task}
      taskNameClassName="text-2xl"
    />
  );
}
