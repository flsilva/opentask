import 'server-only';
import { notFound } from 'next/navigation';
import { DeleteIconButton } from '@/modules/shared/controls/button/DeleteIconButton';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { getTaskById } from '@/modules/app/tasks/TasksRepository';
import { DeleteTaskAlertDialog } from '@/modules/app/tasks/DeleteTaskAlertDialog';

interface TaskDialogInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskDialogInterceptingPage({
  params: { taskId },
}: TaskDialogInterceptingPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: task, errors: taskErrors }] =
    await Promise.all([getAllProjects(), getTaskById(taskId)]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (taskErrors) return <ErrorList errors={taskErrors} />;

  if (!task || !projects || projects.length < 1 || !task) notFound();

  const deleteTaskDialog = (
    <DeleteTaskAlertDialog
      id={task.id}
      name={task.name}
      routerActionOnSuccess={RouterActions.BackAndRefresh}
      trigger={<DeleteIconButton className="mr-2" />}
    />
  );

  return (
    <>
      <Dialog
        defaultOpen
        headerButtons={deleteTaskDialog}
        routerActionOnClose={RouterActions.BackAndRefresh}
      >
        <TaskForm
          project={task.project}
          projects={projects}
          task={task}
          taskNameClassName="text-2xl"
        />
      </Dialog>
    </>
  );
}
