import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import ProjectHeader from '@/modules/app/project/ProjectHeader';
import { findManyProjects, findProjectById } from '@/modules/app/project/project-model-db';
import AddTask from '@/modules/app/task/AddTask';
import { TaskListController } from '@/modules/app/task/TaskListController';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [projects, project] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId }),
  ]);

  if (!project) return;

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      {project.tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <TaskListController
        addTask={<AddTask project={project} projects={projects} />}
        project={project}
        tasks={project.tasks}
      />
    </AppShell>
  );
}
