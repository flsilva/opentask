import 'server-only';
import ProjectHeader from '@/app/app/shared/project/ProjectHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { ProjectPageTaskList } from '@/app/app/shared/project/ProjectPageTaskList';
import TaskModal from '@/app/app/shared/task/TaskModal';
import { findTaskById } from '@/app/app/shared/task/task-model';

interface ProjectTaskPageProps {
  readonly params: { readonly projectId: string; taskId: string };
}

export default async function ProjectTaskPage({
  params: { projectId, taskId },
}: ProjectTaskPageProps) {
  console.log('ProjectTaskPage() - RENDER - projectId: ', projectId);

  const [projects, project, task] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId, includeTasks: true }),
    findTaskById(taskId),
  ]);

  console.log('ProjectTaskPage() - RENDER - project: ', project);

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      <ProjectPageTaskList project={project} tasks={(project && project.tasks) || []} />
      {projects && projects.length > 0 && <AddTask project={projects[0]} projects={projects} />}
      {project && <TaskModal project={project} projects={projects} task={task} />}
    </AppShell>
  );
}
