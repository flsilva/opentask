'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import { ProjectData } from '../project/ProjectData';
import TaskForm from './/TaskForm';
import { TaskData } from './TaskData';

interface TaskModalModalProps {
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly task: TaskData;
}

export default function TaskModal({ project, projects, task }: TaskModalModalProps) {
  const closeButtonRef = useRef(null);
  const router = useRouter();

  const onCloseModal = () => {
    console.log('TaskModal().onCloseModal()');
    // router.push(`/app/project/${project.id}`);
    router.back();
  };

  const saveNewTaskHandler = () => {
    console.log('TaskListAndNewTask().saveNewTaskHandler()');
  };

  return (
    <Dialog
      as="div"
      open={true}
      className="relative z-50"
      onClose={onCloseModal}
      initialFocus={closeButtonRef}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center">
        <Dialog.Panel className="mx-auto flex w-full flex-col rounded-lg bg-white p-4 md:w-[40rem]">
          <div className="flex items-start justify-between">
            <TaskForm
              onCancelClick={onCloseModal}
              onSaveClick={saveNewTaskHandler}
              project={project}
              projects={projects}
              task={task}
              taskNameClassName="text-2xl"
            />
            <button
              type="button"
              className="-mt-1 rounded-md p-2.5 text-gray-700"
              onClick={onCloseModal}
              ref={closeButtonRef}
            >
              <span className="sr-only">Close menu</span>
              <XIcon aria-hidden="true" />
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
