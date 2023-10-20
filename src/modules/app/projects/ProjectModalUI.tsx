'use client';

import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ModalUI } from '@/modules/shared/modals/ModalUI';
import { XIcon } from '@/modules/shared/icons/XIcon';

interface ProjectModalUIProps extends ChildrenProps {
  readonly appear?: boolean;
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly title: string;
}

export const ProjectModalUI = ({
  appear,
  children,
  onCloseHandler,
  open,
  title,
}: ProjectModalUIProps) => {
  return (
    <ModalUI appear={appear} onCloseHandler={onCloseHandler} open={open}>
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
    </ModalUI>
  );
};
