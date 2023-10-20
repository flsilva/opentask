'use client';

import 'client-only';
import { XIcon } from '@/modules/shared/icons/XIcon';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ModalUI } from '@/modules/shared/modals/ModalUI';

interface SettingsModalUIProps extends ChildrenProps {
  readonly appear?: boolean;
  readonly onCloseModal: () => void;
  readonly open: boolean;
}

export const SettingsModalUI = ({ appear, children, onCloseModal, open }: SettingsModalUIProps) => {
  return (
    <ModalUI appear={appear} onCloseHandler={onCloseModal} open={open}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
        <button
          type="button"
          className="-m-2.5 rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
          onClick={onCloseModal}
        >
          <span className="sr-only">Close modal</span>
          <XIcon aria-hidden="true" />
        </button>
      </div>
      {children}
    </ModalUI>
  );
};
