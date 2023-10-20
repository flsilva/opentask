'use client';

import 'client-only';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { buttonClassNameLink } from '@/modules/shared/controls/button/buttonClassName';
import { PlusSignalIcon } from '@/modules/shared/icons/PlusSignalIcon';
import { ProjectDto } from '@/modules/app/projects/ProjectsRepository';
import { TaskForm } from './TaskForm';
import { TaskModal } from './TaskModal';

interface AddTaskProps {
  readonly defaultDueDate?: Date | null;
  readonly project: ProjectDto;
  readonly projects: Array<ProjectDto>;
}

export const AddTask = ({ defaultDueDate, project, projects }: AddTaskProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  const getNewTaskComponent = () => {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 768) {
      return (
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
            defaultDueDate={defaultDueDate ?? undefined}
            onCancelClick={cancelNewTaskHandler}
            project={project}
            projects={projects}
            shouldStartOnEditingMode={true}
          />
        </Transition>
      );
    } else {
      return (
        <TaskModal
          isOpen={isAddingTask}
          onCloseModal={() => setIsAddingTask(false)}
          project={project}
          projects={projects}
          shouldGoBackOnClose={false}
          shouldStartOnEditingMode={true}
        />
      );
    }
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
      {getNewTaskComponent()}
    </>
  );
};
