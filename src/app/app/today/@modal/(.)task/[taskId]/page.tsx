import 'server-only';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import { findTaskById, findTasksDueUntilToday } from '@/app/app/shared/task/task-model';
import TaskModal from '@/app/app/shared/task/TaskModal';

interface TodayTaskInterceptingPageProps {
  readonly params: { readonly projectId: string; readonly taskId: string };
}

export default async function TodayTaskInterceptingPage({
  params: { projectId, taskId },
}: TodayTaskInterceptingPageProps) {
  const [projects, project, task] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId }),
    findTaskById(taskId),
  ]);

  if (!project) return null;
  return <TaskModal project={project} projects={projects} task={task} />;
}
