import 'server-only';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';
import { getTaskById } from '@/modules/app/task/TaskRepository';
import { TaskModal } from '@/modules/app/task/TaskModal';

interface TaskInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskInterceptingPage({
  params: { taskId },
}: TaskInterceptingPageProps) {
  const [projects, task] = await Promise.all([getAllProjects(), getTaskById(taskId)]);

  if (!projects || projects.length < 1 || !task) return null;
  return <TaskModal isOpen={true} project={task.project} projects={projects} task={task} />;
}
