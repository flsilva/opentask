'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@/app/modules/common/icon/XIcon';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/app/modules/common/button/buttonClassName';
import {
  CreateProjectDTO,
  CreateProjectDTOSchema,
  ProjectDTO,
  UpdateProjectDTO,
  UpdateProjectDTOSchema,
} from './project-model-dto';

interface ProjectModalProps {
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly onCreateProject: (data: CreateProjectDTO) => void;
  readonly onUpdateProject: (data: UpdateProjectDTO) => void;
  readonly project?: ProjectDTO | null;
}

export default function ProjectModal({
  onCloseHandler,
  onCreateProject,
  onUpdateProject,
  open,
  project,
}: ProjectModalProps) {
  /*
   * We can't set these initial states as this Modal is first rendered hidden with no project.
   * And we can only initiate a state in the first render, after that it's ignored.
   * So we set this state in the useEffect() below.
   */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setNameAccordingToProject(project);
    setDescriptionAccordingToProject(project);
  }, [project]);
  /**/

  const generateProjectDTO = (): CreateProjectDTO => ({
    name,
    description,
  });

  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const isValidData = CreateProjectDTOSchema.safeParse(generateProjectDTO()).success;

  const setNameAccordingToProject = (project?: ProjectDTO | null) => {
    if (
      project !== undefined &&
      project !== null &&
      project.name !== undefined &&
      project.name !== null
    ) {
      setName(project.name);
      return;
    }
    setName('');
  };

  const setDescriptionAccordingToProject = (project?: ProjectDTO | null) => {
    if (
      project !== undefined &&
      project !== null &&
      project.description !== undefined &&
      project.description !== null
    ) {
      setDescription(project.description);
      return;
    }
    setDescription('');
  };

  const onCloseHandlerInternal = () => {
    /*
     * Reset form changes before closing.
     */
    setNameAccordingToProject(project);
    setDescriptionAccordingToProject(project);
    /**/
    inputNameRef.current?.blur();
    onCloseHandler();
  };

  const onChangeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onSaveProject = async () => {
    let data: CreateProjectDTO | UpdateProjectDTO = generateProjectDTO();

    if (project) {
      data = { ...data, id: project.id };
      UpdateProjectDTOSchema.parse(data);
      onUpdateProject(data);
      return;
    }

    CreateProjectDTOSchema.parse(data);
    onCreateProject(data);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (!CreateProjectDTOSchema.safeParse(generateProjectDTO()).success) return;
    onSaveProject();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={inputNameRef}
        onClose={onCloseHandlerInternal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex md:items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
          >
            <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">
                  {project !== undefined && project !== null ? 'Edit project' : 'Create project'}
                </h1>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
                  onClick={onCloseHandlerInternal}
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
                  <button className={buttonClassNameWhite} onClick={onCloseHandlerInternal}>
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
