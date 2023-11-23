import 'server-only';
import { DeleteIconButton } from '@/modules/shared/controls/button/DeleteIconButton';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { DeleteTaskAlertDialog } from '@/modules/app/tasks/DeleteTaskAlertDialog';
import { TaskForm } from '@/modules/app/tasks/TaskForm';

interface TaskDialogPageProps {
  readonly params: { readonly taskId: string };
}

export default function TaskDialogPage({ params: { taskId } }: TaskDialogPageProps) {
  const deleteTaskDialog = (
    <DeleteTaskAlertDialog
      id={taskId}
      routerActionOnSubmitSuccess={RouterActions.BackAndRefresh}
      trigger={<DeleteIconButton className="mr-2" />}
    />
  );

  /*
   * Flavio Silva on Nov. 22:
   * We must use RouterActions.BackAndRefresh to force a call to router.refresh() from the
   * "app/today"  or "app/projects/[projectId]" page due to a bug described in the
   * <TaskFormTextFields> and <TaskCheck> components.
   */
  return (
    <Dialog
      defaultOpen
      headerButtons={deleteTaskDialog}
      routerActionOnClose={RouterActions.BackAndRefresh}
    >
      <TaskForm taskId={taskId} taskNameClassName="text-2xl" />
    </Dialog>
  );
  /**/
}
