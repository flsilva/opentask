import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { Modal } from '@/modules/shared/modals/Modal';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

interface NewTaskInterceptingPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default async function NewTaskInterceptingPage({
  searchParams: { projectId },
}: NewTaskInterceptingPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: project, errors: projectErrors }] =
    await Promise.all([getAllProjects(), getProjectById({ id: projectId })]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (projectErrors) return <ErrorList errors={projectErrors} />;

  if (!project) return;
  if (!projects || projects.length < 1) return null;

  return (
    <Modal
      defaultOpen
      routerActionsOnClose={[{ type: RouterActionType.Back }, { type: RouterActionType.Refresh }]}
    >
      <TaskForm
        project={project}
        projects={projects}
        shouldStartOnEditingMode
        taskNameClassName="text-2xl"
      />
    </Modal>
  );
}
