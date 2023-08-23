import 'server-only';
import { findManyProjects } from '@/app/app/modules/project/project-model';
import { findTaskById } from '@/app/app/modules/task/task-model';
import TaskModal from '@/app/app/modules/task/TaskModal';

interface TodayTaskInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TodayTaskInterceptingPage({
  params: { taskId },
}: TodayTaskInterceptingPageProps) {
  const [projects, task] = await Promise.all([findManyProjects(), findTaskById(taskId)]);

  if (!projects || projects.length < 1 || !task) return null;
  return <TaskModal isOpen={true} project={task.project} projects={projects} task={task} />;
}
