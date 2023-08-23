import 'server-only';
import { findManyProjects, findProjectById } from '@/app/app/modules/project/project-model';
import TaskModal from '@/app/app/modules/task/TaskModal';
import { findTaskById } from '@/app/app/modules/task/task-model';

interface ProjectTaskInterceptingPageProps {
  readonly params: { readonly projectId: string; readonly taskId: string };
}

export default async function ProjectTaskInterceptingPage({
  params: { projectId, taskId },
}: ProjectTaskInterceptingPageProps) {
  const [projects, project, task] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId }),
    findTaskById(taskId),
  ]);

  if (!project) return;

  return <TaskModal isOpen={true} project={project} projects={projects} task={task} />;
}
