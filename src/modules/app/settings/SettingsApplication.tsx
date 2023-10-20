'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsModalUI } from '@/modules/app/settings/SettingsModalUI';
import { deleteUserAccount } from '@/modules/app/users/UsersRepository';
import {
  ConfirmationModal,
  ConfirmationModalProps,
} from '@/modules/shared/modals/ConfirmationModal';
import { SettingsUI } from './SettingsUI';

interface SettingsApplicationProps {
  readonly shouldRenderOnModal?: boolean;
}

export const SettingsApplication = ({ shouldRenderOnModal }: SettingsApplicationProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);

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
      modalCopy: (
        <span>Are you sure you want to delete you account and all data associated to it?</span>
      ),
      modalTitle: 'Delete User Account',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: async () => {
        deleteUserAccount();
      },
      open: true,
    });
  };

  const settingsUI = <SettingsUI onDeleteAccount={onDeleteAccount} />;

  return (
    <>
      {shouldRenderOnModal && (
        <SettingsModalUI
          appear={isModalOpen}
          onCloseModal={onCloseSettingsModal}
          open={isModalOpen}
        >
          {settingsUI}
        </SettingsModalUI>
      )}
      {!shouldRenderOnModal && settingsUI}
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
};
