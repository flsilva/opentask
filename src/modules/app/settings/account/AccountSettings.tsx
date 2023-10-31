'use client';

import 'client-only';
import { useState } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { buttonClassNameRed } from '@/modules/shared/controls/button/buttonClassName';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import {
  ConfirmationModal,
  ConfirmationModalProps,
} from '@/modules/shared/modals/ConfirmationModal';
import { deleteUserAccount } from '@/modules/app/users/UsersRepository';
import { SettingsModal } from '@/modules/app/settings/SettingsModal';

export interface AccountSettingsProps {
  readonly renderOnModal?: boolean;
}

export const AccountSettings = ({ renderOnModal }: AccountSettingsProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);
  const [serverResponse, formAction] = useFormState(deleteUserAccount, undefined);

  const onCloseSettingsModal = () => {
    if (confirmationModalProps) return;
    setIsModalOpen(false);

    /*
     * setTimout() used to wait for the leave transition.
     */
    setTimeout(() => {
      router.back();
    }, 300);
    /**/
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(null);
  };

  const onDeleteAccount = () => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Delete',
      confirmButtonLabelSubmitting: 'Deleting...',
      modalCopy: (
        <span>Are you sure you want to delete you account and all data associated to it?</span>
      ),
      modalTitle: 'Delete User Account',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: 'submit',
      renderBodyWrapper: (children: React.ReactNode) => (
        <form action={formAction}>
          {children}
          {serverResponse && serverResponse.errors && <ErrorList errors={serverResponse.errors} />}
        </form>
      ),
      show: true,
    });
  };

  const settings = (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onDeleteAccount}
        className={`${buttonClassNameRed} mt-12 self-start`}
      >
        Delete account
      </button>
      <p className="mt-4 text-xs font-medium text-gray-600">
        You will immediately delete all your data, including your projects and tasks, by clicking
        the button above. You can&apos;t undo it.
      </p>
    </div>
  );

  return (
    <>
      {renderOnModal && (
        <SettingsModal appear={isModalOpen} onClose={onCloseSettingsModal} show={isModalOpen}>
          {settings}
        </SettingsModal>
      )}
      {!renderOnModal && settings}
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
};
