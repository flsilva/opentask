'use client';

import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import ModalUI from '@/modules/shared/modal/ModalUI';
import { XIcon } from '@/modules/shared/icon/XIcon';
import { ProjectDto } from './ProjectDomain';

interface ProjectModalUIProps extends ChildrenProps {
  readonly inputNameRef: React.MutableRefObject<HTMLInputElement | null>;
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly project?: ProjectDto | null;
}

export default function ProjectModalUI({
  children,
  inputNameRef,
  onCloseHandler,
  open,
  project,
}: ProjectModalUIProps) {
  return (
    <ModalUI initialFocusRef={inputNameRef} onCloseHandler={onCloseHandler} open={open}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">
          {project !== undefined && project !== null ? 'Edit project' : 'Create project'}
        </h1>
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
}
