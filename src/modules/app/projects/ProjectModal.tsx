'use client';

import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { Modal } from '@/modules/shared/modals/Modal';
import { XIcon } from '@/modules/shared/icons/XIcon';

interface ProjectModalProps extends ChildrenProps {
  readonly appear?: boolean;
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly title: string;
}

export const ProjectModal = ({
  appear,
  children,
  onCloseHandler,
  open,
  title,
}: ProjectModalProps) => {
  return (
    <Modal appear={appear} onCloseHandler={onCloseHandler} open={open}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        <button
          type="button"
          className="-m-2.5 rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
          onClick={onCloseHandler}
        >
          <span className="sr-only">Close modal</span>
          <XIcon aria-hidden="true" />
        </button>
      </div>
      {children}
    </Modal>
  );
};
