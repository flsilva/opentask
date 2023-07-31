'use client';

import { Dialog } from '@headlessui/react';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/app/shared/ui//button/buttonClassName';
import { ProjectData } from './ProjectData';
import { useEffect, useState } from 'react';
import { CreateProjectData, UpdateProjectData } from './ProjectData';

interface ProjectModalProps {
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly onCreateProject: (data: CreateProjectData) => void;
  readonly onUpdateProject: (data: UpdateProjectData) => void;
  readonly project?: ProjectData;
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

  const setNameAccordingToProject = (project?: ProjectData) => {
    if (
      project !== undefined &&
      project !== null &&
      project.name !== undefined &&
      project.name !== null
    ) {
      console.log(project.name);
      setName(project.name);
      return;
    }
    setName('');
  };

  const setDescriptionAccordingToProject = (project: ProjectData | undefined) => {
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
    onCloseHandler();
  };

  const onChangeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onSaveProject = async (formData: FormData) => {
    const data = {
      name: String(formData.get('name')),
      description: String(formData.get('description')),
    };

    console.log('ProjectModal().onSaveProject() - data: ', data);

    project !== undefined &&
    project !== null &&
    project.id !== undefined &&
    project.id !== null &&
    project.id !== ''
      ? onUpdateProject({ ...data, id: project.id })
      : onCreateProject(data);
  };

  return (
    <Dialog as="div" open={open} className="relative z-50" onClose={onCloseHandlerInternal}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center">
        <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">
              {project !== undefined && project !== null ? 'Edit project' : 'Create project'}
            </h1>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={onCloseHandlerInternal}
            >
              <span className="sr-only">Close menu</span>
              <XIcon aria-hidden="true" />
            </button>
          </div>
          <form action={onSaveProject} className="mt-6 flex flex-col">
            <input
              value={name}
              onChange={onChangeNameHandler}
              name="name"
              type="text"
              placeholder="Project name"
              className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
              required
              autoComplete="off"
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
              <button type="submit" className={buttonClassNameGreen}>
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
