import 'server-only';
import { notFound } from 'next/navigation';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectPageHeader } from '@/modules/app/projects/ProjectPageHeader';
import { getProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskList } from '@/modules/app/tasks/TaskList';
import { getTasksByProject } from '@/modules/app/tasks/TasksRepository';
import { getServerSideUser } from '@/modules/app/users/UsersRepository';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [
    { data: projects, errors: projectsErrors },
    { data: project, errors: projectErrors },
    { data: tasks, errors: tasksErrors },
    { timeZone },
  ] = await Promise.all([
    getProjects(),
    getProjectById({ id: projectId }),
    getTasksByProject({ projectId }),
    getServerSideUser(),
  ]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (projectErrors) return <ErrorList errors={projectErrors} />;
  if (tasksErrors) return <ErrorList errors={tasksErrors} />;

  if (!project || !projects || !tasks) notFound();

  return (
    <>
      <ProjectPageHeader project={project} />
      {tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <TaskList
        addTask={<AddTask projectId={project.id} projects={projects} />}
        tasks={tasks}
        timeZone={timeZone}
      />
    </>
  );
}
