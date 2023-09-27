'use client';

import ModalUI from '@/modules/shared/modal/ModalUI';
import { XIcon } from '@/modules/shared/icon/XIcon';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/button/buttonClassName';
import { ProjectDto } from './ProjectDomain';

interface ProjectModalUIProps {
  readonly description: string;
  readonly inputNameRef: React.MutableRefObject<HTMLInputElement | null>;
  readonly isValidData: boolean;
  readonly name: string;
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly onChangeDescriptionHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onChangeNameHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onKeyDown: (event: React.KeyboardEvent) => void;
  readonly onSaveProject: () => void;
  readonly project?: ProjectDto | null;
}

export default function ProjectModalUI({
  inputNameRef,
  isValidData,
  name,
  description,
  onCloseHandler,
  onChangeDescriptionHandler,
  onChangeNameHandler,
  onKeyDown,
  onSaveProject,
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
      <form className="mt-6 flex flex-col">
        <input
          value={name}
          onChange={onChangeNameHandler}
          onKeyDown={onKeyDown}
          name="name"
          type="text"
          placeholder="Project name"
          className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
          required
          autoComplete="off"
          ref={inputNameRef}
        />
        <textarea
          value={description}
          onChange={onChangeDescriptionHandler}
          name="description"
          placeholder="Project description"
          rows={5}
          className="mb-6 block w-full resize-none rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button className={buttonClassNameWhite} onClick={onCloseHandler}>
            Cancel
          </button>
          <button
            type="button"
            disabled={!isValidData}
            className={buttonClassNameGreen}
            onClick={onSaveProject}
          >
            Save
          </button>
        </div>
      </form>
    </ModalUI>
  );
}
