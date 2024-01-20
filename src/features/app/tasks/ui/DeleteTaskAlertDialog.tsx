import 'server-only';
import { notFound } from 'next/navigation';
import { AlertDialog, AlertDialogBody } from '@/features/shared/ui/dialog/AlertDialog';
import { ErrorList } from '@/features/shared/ui/error/ErrorList';
import { Form } from '@/features/shared/ui/form/Form';
import { FormErrorList } from '@/features/shared/ui/form/FormErrorList';
import { RouterAction } from '@/features/shared/routing/RouterActions';
import { deleteTask, getTaskById } from '../data-access/TasksDataAccess';

export interface DeleteTaskAlertDialogProps {
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly id: string;
  readonly routerActionOnSubmitSuccess: RouterAction;
  readonly trigger?: React.ReactNode;
}

export const DeleteTaskAlertDialog = async ({
  id,
  open,
  onOpenChange,
  routerActionOnSubmitSuccess,
  trigger,
}: DeleteTaskAlertDialogProps) => {
  const { data: task, errors: taskErrors } = await getTaskById(id);

  if (taskErrors) return <ErrorList errors={taskErrors} />;
  if (!task) notFound();

  return (
    <AlertDialog
      body={
        <Form action={deleteTask} routerActionOnSubmitSuccess={routerActionOnSubmitSuccess}>
          <input type="hidden" name="id" value={id} />
          <AlertDialogBody
            confirmButtonLabel="Delete"
            message={
              <span>
                Are you sure you want to delete <span className="font-semibold">{task.name}</span>?
              </span>
            }
            onConfirm="submit"
          />
          <FormErrorList />
        </Form>
      }
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Task"
      trigger={trigger}
    />
  );
};
