import 'server-only';
import { notFound } from 'next/navigation';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskList } from '@/modules/app/tasks/TaskList';
import { ProjectPageHeader } from '@/modules/app/projects/ProjectPageHeader';
import { getAllProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: project, errors: projectErrors }] =
    await Promise.all([getAllProjects(), getProjectById({ id: projectId })]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (projectErrors) return <ErrorList errors={projectErrors} />;

  if (!project || !projects) notFound();

  return (
    <>
      <ProjectPageHeader project={project} />
      {project.tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <TaskList addTask={<AddTask project={project} projects={projects} />} tasks={project.tasks} />
    </>
  );
}
