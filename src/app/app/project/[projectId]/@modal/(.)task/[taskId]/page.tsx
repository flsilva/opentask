import 'server-only';
import { findManyProjects, findProjectById } from '@/modules/app/project/project-model-db';
import TaskModal from '@/modules/app/task/TaskModal';
import { findTaskById } from '@/modules/app/task/task-model-db';

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
