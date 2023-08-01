'use client';

import { Dialog } from '@headlessui/react';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/app/shared/ui//button/buttonClassName';
import { useEffect, useState } from 'react';

export interface ConfirmationModalProps {
  readonly cancelButtonLabel?: string;
  readonly confirmButtonLabel: string;
  readonly modalCopy: string | React.ReactNode;
  readonly modalTitle: string | React.ReactNode;
  readonly onCancelHandler: () => void;
  readonly onConfirmHandler: () => void;
  readonly open: boolean;
}

export const ConfirmationModal = ({
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel,
  modalCopy,
  modalTitle,
  onCancelHandler,
  onConfirmHandler,
  open,
}: ConfirmationModalProps) => {
  return (
    <Dialog as="div" open={open} className="relative z-50" onClose={onCancelHandler}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center">
        <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">{modalTitle}</h1>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={onCancelHandler}
            >
              <span className="sr-only">Close modal</span>
              <XIcon aria-hidden="true" />
            </button>
          </div>
          <p className="mt-6">{modalCopy}</p>
          <div className="mt-12 flex justify-end gap-4">
            <button type="button" className={buttonClassNameWhite} onClick={onCancelHandler}>
              {cancelButtonLabel}
            </button>
            <button type="button" className={buttonClassNameGreen} onClick={onConfirmHandler}>
              {confirmButtonLabel}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
