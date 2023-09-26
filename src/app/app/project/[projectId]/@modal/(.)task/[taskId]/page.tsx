import 'server-only';
import { getAllProjects, getProjectById } from '@/modules/app/project/ProjectRepository';
import TaskModal from '@/modules/app/task/TaskModal';
import { getTaskById } from '@/modules/app/task/TaskRepository';

interface ProjectTaskInterceptingPageProps {
  readonly params: { readonly projectId: string; readonly taskId: string };
}

export default async function ProjectTaskInterceptingPage({
  params: { projectId, taskId },
}: ProjectTaskInterceptingPageProps) {
  const [projects, project, task] = await Promise.all([
    getAllProjects(),
    getProjectById({ id: projectId }),
    getTaskById(taskId),
  ]);

  if (!project) return;

  return <TaskModal isOpen={true} project={project} projects={projects} task={task} />;
}
