import { Suspense } from 'react';
import { DeleteIconButton } from '@/features/shared/ui/control/button/DeleteIconButton';
import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { RouterActions } from '@/features/shared/routing/RouterActions';
import { DeleteTaskAlertDialog } from '@/features/app/tasks/ui/DeleteTaskAlertDialog';
import { TaskForm } from '@/features/app/tasks/ui/TaskForm';
import { TaskFormSkeletonSkeleton } from '@/features/app/tasks/ui/TaskFormSkeleton';

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
   * We have to use RouterActions.BackAndRefresh to force a call to router.refresh(),
   * after navigating back to the previous route, which is NOT an Intercepting Route.
   *
   * We need that because we cannot call revalidatePath() or revalidateTag() from
   * Parallel Routes or Intercepting Routes like this one, due to a few well known
   * App Router bugs I describe and link to in <TaskFormTextFields> and <TaskCheck> components.
   *
   * So if we go back without calling router.refresh(), updates we make in tasks
   * using <TaskForm> will not be reflected in the UI.
   */
  return (
    <Dialog
      defaultOpen
      headerButtons={deleteTaskDialog}
      routerActionOnClose={RouterActions.BackAndRefresh}
    >
      <Suspense fallback={<TaskFormSkeletonSkeleton className="mt-6" ssrOnly="Loading task..." />}>
        <TaskForm taskId={taskId} taskNameClassName="text-2xl" />
      </Suspense>
    </Dialog>
  );
  /**/
}
