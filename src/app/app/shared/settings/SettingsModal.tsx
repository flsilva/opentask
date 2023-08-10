'use client';

import 'client-only';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import { buttonClassNameRed } from '@/app/shared/ui/button/buttonClassName';

interface SettingsModalProps {
  readonly onCloseModal: () => void;
  readonly onDeleteAccount: () => void;
  readonly open: boolean;
}

export default function SettingsModal({ onCloseModal, onDeleteAccount, open }: SettingsModalProps) {
  console.log('SettingsModal()');

  return (
    <Dialog as="div" open={open} className="relative z-50" onClose={onCloseModal}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center">
        <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={onCloseModal}
            >
              <span className="sr-only">Close modal</span>
              <XIcon aria-hidden="true" />
            </button>
          </div>
          <button type="button" onClick={onDeleteAccount} className={`${buttonClassNameRed} mt-12`}>
            Delete account
          </button>
          <p className="mt-4 text-xs font-medium text-gray-600">
            You will immediately delete all your data, including your projects and tasks, by
            clicking the button above. You can&apos;t undo it.
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
