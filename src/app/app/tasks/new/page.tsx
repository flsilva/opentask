import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { TaskForm } from '@/modules/app/tasks/TaskForm';

interface NewTaskPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default async function NewTaskPage({ searchParams: { projectId } }: NewTaskPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: project, errors: projectErrors }] =
    await Promise.all([getProjects({ isArchived: false }), getProjectById({ id: projectId })]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (projectErrors) return <ErrorList errors={projectErrors} />;

  if (!project) return;
  if (!projects || projects.length < 1) return null;

  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl text-gray-800">Create task</h1>
      <TaskForm
        className="mt-6"
        projectId={projectId}
        projects={projects}
        shouldStartOnEditingMode={false}
        taskNameClassName="text-2xl"
      />
    </div>
  );
}
