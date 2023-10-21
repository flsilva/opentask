import 'server-only';
import { ProjectPageHeaderController } from '@/modules/app/projects/ProjectPageHeaderController';
import { getAllProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskListController } from '@/modules/app/tasks/TaskListController';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [projects, project] = await Promise.all([
    getAllProjects(),
    getProjectById({ id: projectId }),
  ]);

  if (!project) {
    return (
      <p className="text-sm my-20">We couldn&apos;t find that Project. Maybe it got deleted?</p>
    );
  }

  return (
    <>
      <ProjectPageHeaderController project={project} />
      {project.tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <TaskListController
        addTask={<AddTask project={project} projects={projects} />}
        tasks={project.tasks}
      />
    </>
  );
}
