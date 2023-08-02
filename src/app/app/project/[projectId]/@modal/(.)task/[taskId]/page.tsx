import 'server-only';
import TaskModal from '@/app/app/shared/task/TaskModal';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import { findTaskById } from '@/app/app/shared/task/task-model';

interface ProjectTaskInterceptingPageProps {
  readonly params: { readonly projectId: string; readonly taskId: string };
}

export default async function ProjectTaskInterceptingPage({
  params: { projectId, taskId },
}: ProjectTaskInterceptingPageProps) {
  const [projects, project, task] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId, includeTasks: true }),
    findTaskById(taskId),
  ]);

  if (!project) return;
  return <TaskModal project={project} projects={projects} task={task} />;
}
