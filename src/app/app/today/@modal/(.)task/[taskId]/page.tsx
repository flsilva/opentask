import 'server-only';
import { findManyProjects } from '@/app/app/shared/project/project-model';
import { findTaskById } from '@/app/app/shared/task/task-model';
import TaskModal from '@/app/app/shared/task/TaskModal';

interface TodayTaskInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TodayTaskInterceptingPage({
  params: { taskId },
}: TodayTaskInterceptingPageProps) {
  const [projects, task] = await Promise.all([findManyProjects(), findTaskById(taskId)]);

  if (!projects || projects.length < 1 || !task) return null;
  return <TaskModal project={task.project} projects={projects} task={task} />;
}
