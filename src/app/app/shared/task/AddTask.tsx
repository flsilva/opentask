'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { buttonClassNameLink } from '@/app/shared/ui//button/buttonClassName';
import { ProjectData } from '../project/ProjectData';
import TaskForm from './TaskForm';
import { PlusSignalIcon } from '@/app/shared/ui/icon/PlusSignalIcon';
import { Transition } from '@headlessui/react';

interface AddTaskProps {
  readonly defaultDueDate?: Date | null;
  readonly project: ProjectData | null;
  readonly projects: Array<ProjectData>;
}

export default function AddTask({ defaultDueDate, project, projects }: AddTaskProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  if (!project)
    throw new Error(
      `AddTask() - Object "project" must not be null nor undefined. Received: ${project}`,
    );

  return (
    <>
      <Transition
        show={!isAddingTask}
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0 -translate-y-[50px]"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-[50px]"
      >
        <button
          onClick={addTaskHandler}
          className={`${buttonClassNameLink} group flex-row self-start`}
        >
          <PlusSignalIcon
            width="1.25rem"
            height="1.25rem"
            className="fill-gray-600 mr-1 group-hover:fill-green-600"
          />
          Add task
        </button>
      </Transition>
      <Transition
        show={isAddingTask}
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-[50px]"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[50px]"
      >
        <TaskForm
          className="rounded-md bg-gray-100 px-2 py-6 sm:px-6 mt-4"
          defaultDueDate={defaultDueDate}
          onCancelClick={cancelNewTaskHandler}
          project={project}
          projects={projects}
          shouldStartOnEditingMode
        />
      </Transition>
    </>
  );
}
