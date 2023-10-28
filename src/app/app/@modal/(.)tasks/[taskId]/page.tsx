import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { TaskModal } from '@/modules/app/tasks/TaskModal';
import { getTaskById } from '@/modules/app/tasks/TasksRepository';

interface TaskInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskInterceptingPage({
  params: { taskId },
}: TaskInterceptingPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: task, errors: taskErrors }] =
    await Promise.all([getAllProjects(), getTaskById(taskId)]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (taskErrors) return <ErrorList errors={taskErrors} />;

  if (!task) return;
  if (!projects || projects.length < 1 || !task) return null;

  return <TaskModal isOpen={true} project={task.project} projects={projects} task={task} />;
}
