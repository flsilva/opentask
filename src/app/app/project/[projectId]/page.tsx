import 'server-only';
import ProjectHeader from '@/app/app/shared/project/ProjectHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskData } from '@/app/app/shared/task/TaskData';
import { TaskListController } from '@/app/app/shared/task/TaskListController';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [projects, project] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId }),
  ]);

  if (!project || !projects || projects.length < 1) return;

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      {project.tasks.length > 0 && <TaskListController project={project} tasks={project.tasks} />}
      {project.tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <AddTask project={project} projects={projects} />
    </AppShell>
  );
}
