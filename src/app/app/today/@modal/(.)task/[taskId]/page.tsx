import 'server-only';
import { findManyProjects } from '@/modules/app/project/project-model-db';
import { findTaskById } from '@/modules/app/task/task-model-db';
import TaskModal from '@/modules/app/task/TaskModal';

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
