import 'server-only';
import { ProjectHeader } from '@/modules/app/projects/ProjectHeader';
import { getAllProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskListApplication } from '@/modules/app/tasks/TaskListApplication';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [projects, project] = await Promise.all([
    getAllProjects(),
    getProjectById({ id: projectId }),
  ]);

  if (!project) return;

  return (
    <>
      <ProjectHeader project={project} />
      {project.tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <TaskListApplication
        addTask={<AddTask project={project} projects={projects} />}
        tasks={project.tasks}
      />
    </>
  );
}
