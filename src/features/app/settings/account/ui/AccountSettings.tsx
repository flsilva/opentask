import 'server-only';
import { twMerge } from 'tailwind-merge';
import { buttonRedClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { AlertDialog, AlertDialogBody } from '@/features/shared/ui/dialog/AlertDialog';
import { Form } from '@/features/shared/ui/form/Form';
import { FormErrorList } from '@/features/shared/ui/form/FormErrorList';
import { deleteUserAccount } from '@/features/app/users/data-access/UsersDataAccess';

export const AccountSettings = () => {
  const deleteButton = (
    <button type="button" className={twMerge(buttonRedClassName, 'mt-12 self-start')}>
      Delete account
    </button>
  );

  return (
    <div className="flex flex-col">
      <AlertDialog
        body={
          <Form action={deleteUserAccount}>
            <AlertDialogBody
              confirmButtonLabel="Delete"
              message={
                <span>
                  Are you sure you want to delete you account and all data associated to it?
                </span>
              }
              onConfirm="submit"
            />
            <FormErrorList />
          </Form>
        }
        title="Delete User Account"
        trigger={deleteButton}
      />
      <p className="mt-4 text-xs font-medium text-gray-600">
        You will immediately delete all your data, including your projects and tasks, by clicking
        the button above. You can&apos;t undo it.
      </p>
    </div>
  );
};
