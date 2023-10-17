'use client';

import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/controls/button/buttonClassName';

interface ProjectFormUIProps {
  readonly description: string;
  readonly inputNameRef: React.MutableRefObject<HTMLInputElement | null>;
  readonly isValidData: boolean;
  readonly name: string;
  readonly onCloseHandler: () => void;
  readonly onChangeDescriptionHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onChangeNameHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onKeyDown: (event: React.KeyboardEvent) => void;
  readonly onSaveProject: () => void;
}

export const ProjectFormUI = ({
  description,
  inputNameRef,
  isValidData,
  name,
  onCloseHandler,
  onChangeDescriptionHandler,
  onChangeNameHandler,
  onKeyDown,
  onSaveProject,
}: ProjectFormUIProps) => {
  return (
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
  );
};
