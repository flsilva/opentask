import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { getProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { TaskForm } from '@/modules/app/tasks/TaskForm';

interface NewTaskDialogInterceptingPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default async function NewTaskDialogInterceptingPage({
  searchParams: { projectId },
}: NewTaskDialogInterceptingPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: project, errors: projectErrors }] =
    await Promise.all([getProjects({ isArchived: false }), getProjectById({ id: projectId })]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (projectErrors) return <ErrorList errors={projectErrors} />;

  if (!project) return;
  if (!projects || projects.length < 1) return null;

  return (
    <Dialog defaultOpen routerActionOnClose={RouterActions.BackAndRefresh}>
      <TaskForm
        projectId={projectId}
        projects={projects}
        shouldStartOnEditingMode
        taskNameClassName="text-2xl"
      />
    </Dialog>
  );
}
