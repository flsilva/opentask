import 'server-only';
import { notFound } from 'next/navigation';
import { DeleteIconButton } from '@/modules/shared/controls/button/DeleteIconButton';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { getTaskById } from '@/modules/app/tasks/TasksRepository';
import { DeleteTaskAlertDialog } from '@/modules/app/tasks/DeleteTaskAlertDialog';
import { TaskProjectsSelect } from '@/modules/app/tasks/TaskProjectsSelect';

interface TaskDialogPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskDialogPage({ params: { taskId } }: TaskDialogPageProps) {
  const { data: task, errors: taskErrors } = await getTaskById(taskId);

  if (taskErrors) return <ErrorList errors={taskErrors} />;
  if (!task) notFound();

  const deleteTaskDialog = (
    <DeleteTaskAlertDialog
      id={task.id}
      name={task.name}
      routerActionOnSuccess={RouterActions.BackAndRefresh}
      trigger={<DeleteIconButton className="mr-2" />}
    />
  );

  return (
    <Dialog
      defaultOpen
      headerButtons={deleteTaskDialog}
      routerActionOnClose={RouterActions.BackAndRefresh}
    >
      <TaskForm
        projectsSelect={<TaskProjectsSelect defaultValue={task.projectId} taskId={task.id} />}
        task={task}
        taskNameClassName="text-2xl"
      />
    </Dialog>
  );
}
