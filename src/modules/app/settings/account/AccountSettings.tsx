'use client';

import 'client-only';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { buttonRedClassName } from '@/modules/shared/controls/button/buttonClassName';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { AlertDialog, AlertDialogProps } from '@/modules/shared/dialog/AlertDialog';
import { deleteUserAccount } from '@/modules/app/users/UsersRepository';

export const AccountSettings = () => {
  const [alertDialogProps, setAlertDialogProps] = useState<AlertDialogProps | null>(null);
  const [serverResponse, formAction] = useFormState(deleteUserAccount, undefined);

  const onDeleteAccount = () => {
    setAlertDialogProps({
      defaultOpen: true,
      confirmButtonLabel: 'Delete',
      dialogCopy: (
        <span>Are you sure you want to delete you account and all data associated to it?</span>
      ),
      dialogTitle: 'Delete User Account',
      onOpenChange: (open: boolean) => {
        if (!open) setAlertDialogProps(null);
      },
      onConfirmHandler: 'submit',
      renderBodyWrapper: (children: React.ReactNode) => (
        <form action={formAction}>
          {children}
          {serverResponse && serverResponse.errors && <ErrorList errors={serverResponse.errors} />}
        </form>
      ),
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={onDeleteAccount}
          className={twMerge(buttonRedClassName, 'mt-12 self-start')}
        >
          Delete account
        </button>
        <p className="mt-4 text-xs font-medium text-gray-600">
          You will immediately delete all your data, including your projects and tasks, by clicking
          the button above. You can&apos;t undo it.
        </p>
      </div>
      {alertDialogProps && <AlertDialog {...alertDialogProps} />}
    </>
  );
};
