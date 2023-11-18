'use client';

import { AlertDialog } from '@/modules/shared/dialog/AlertDialog';
import { Form } from '@/modules/shared/form/Form';
import { FormErrorList } from '@/modules/shared/form/FormErrorList';
import { RouterAction } from '@/modules/shared/router/RouterActions';
import { useRouterAction } from '@/modules/shared/router/useRouterAction';
import { deleteTask } from './TasksRepository';

export interface DeleteTaskAlertDialogProps {
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly id: string;
  readonly name: string;
  readonly routerActionOnSuccess: RouterAction;
  readonly trigger?: React.ReactNode;
}

export const DeleteTaskAlertDialog = ({
  id,
  name,
  open,
  onOpenChange,
  routerActionOnSuccess,
  trigger,
}: DeleteTaskAlertDialogProps) => {
  const routerAction = useRouterAction(routerActionOnSuccess);

  const onFormSubmitted = () => {
    routerAction();
  };

  return (
    <AlertDialog
      open={open}
      confirmButtonLabel="Delete"
      dialogCopy={
        <span>
          Are you sure you want to delete <span className="font-semibold">{name}</span>?
        </span>
      }
      dialogTitle="Delete Task"
      onOpenChange={onOpenChange}
      onConfirmHandler="submit"
      renderBodyWrapper={(children: React.ReactNode) => (
        <Form action={deleteTask} onFormSubmitted={onFormSubmitted}>
          <input type="hidden" name="id" value={id} />
          {children}
          <FormErrorList />
        </Form>
      )}
      trigger={trigger}
    />
  );
};
