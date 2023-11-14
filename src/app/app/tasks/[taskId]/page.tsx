import 'server-only';
import { notFound } from 'next/navigation';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getProjects } from '@/modules/app/projects/ProjectsRepository';
import { getTaskById } from '@/modules/app/tasks/TasksRepository';
import { TaskForm } from '@/modules/app/tasks/TaskForm';

interface TaskPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskPage({ params: { taskId } }: TaskPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: task, errors: taskErrors }] =
    await Promise.all([getProjects({ isArchived: false }), getTaskById(taskId)]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (taskErrors) return <ErrorList errors={taskErrors} />;

  if (!task || !projects || projects.length < 1 || !task) notFound();

  return (
    <div className="flex flex-col mt-10">
      <TaskForm
        projectId={task.projectId}
        projects={projects}
        shouldStartOnEditingMode={false}
        task={task}
        taskNameClassName="text-2xl"
      />
    </div>
  );
}
