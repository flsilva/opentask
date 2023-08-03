import 'server-only';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import { findTaskById, findTasksDueUntilToday } from '@/app/app/shared/task/task-model';
import TaskModal from '@/app/app/shared/task/TaskModal';

interface TodayTaskInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TodayTaskInterceptingPage({
  params: { taskId },
}: TodayTaskInterceptingPageProps) {
  const [projects, tasks, task] = await Promise.all([
    findManyProjects(),
    findTasksDueUntilToday(),
    findTaskById(taskId),
  ]);

  if (!projects || projects.length < 1) return null;
  return <TaskModal project={projects[0]} projects={projects} task={task} />;
}
