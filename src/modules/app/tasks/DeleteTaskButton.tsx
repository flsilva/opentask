'use client';

import { useState } from 'react';
import { DeleteIcon } from '@/modules/shared/icons/DeleteIcon';
import { AlertDialog } from '@/modules/shared/dialog/AlertDialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { useFormAction } from '@/modules/app/shared/form/useFormAction';
import { deleteTask } from './TasksRepository';
import { RouterActions } from '@/modules/shared/controls/button/RouterActions';
import { useRouterActions } from '@/modules/shared/controls/button/useRouterActions';

export interface DeleteTaskButtonProps {
  readonly id: string;
  readonly name: string;
  readonly routerActionsOnSuccess: RouterActions;
}

export const DeleteTaskButton = ({ id, name, routerActionsOnSuccess }: DeleteTaskButtonProps) => {
  const [alertDialog, setAlertDialog] = useState<React.ReactNode | null>(null);
  const routerActions = useRouterActions(routerActionsOnSuccess);

  const onDeleteTaskFormSubmitted = () => {
    setAlertDialog(null);
    routerActions();
  };

  const [serverResponse, formAction] = useFormAction({
    action: deleteTask,
    onFormSubmitted: onDeleteTaskFormSubmitted,
  });

  const onDeleteTask = () => {
    if (!id) throw new Error('Unexpected error trying to delete task.');

    setAlertDialog(
      <AlertDialog
        defaultOpen
        confirmButtonLabel="Delete"
        confirmButtonLabelSubmitting="Deleting..."
        dialogCopy={
          <span>
            Are you sure you want to delete <span className="font-semibold">{name}</span>?
          </span>
        }
        dialogTitle="Delete Task"
        onOpenChange={(open: boolean) => {
          if (!open) setAlertDialog(null);
        }}
        onConfirmHandler="submit"
        renderBodyWrapper={(children: React.ReactNode) => (
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            {children}
            {serverResponse && serverResponse.errors && (
              <ErrorList errors={serverResponse.errors} />
            )}
          </form>
        )}
      />,
    );
  };

  return (
    <>
      <button
        type="button"
        className="rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
        onClick={onDeleteTask}
      >
        <span className="sr-only">Delete task</span>
        <DeleteIcon aria-hidden="true" />
      </button>
      {alertDialog && alertDialog}
    </>
  );
};
