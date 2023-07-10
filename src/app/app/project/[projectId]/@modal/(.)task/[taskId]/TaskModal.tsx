'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { XIconSvg } from '@/shared/ui/XIconSvg';
import { TaskData } from '@/app/app/project/task/TaskData';
import { ProjectData } from '@/app/app/project/ProjectData';
import Task from '../../../task/[taskId]/Task';

interface TaskModalModalProps {
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly task: TaskData;
}

export default function TaskModal({ project, projects, task }: TaskModalModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const closeButtonRef = useRef(null);
  const router = useRouter();

  console.log('TaskModal() - isEditing: ', isEditing);

  const onCloseModal = () => {
    console.log('TaskModal().onCloseModal()');
    // router.push(`/app/project/${project.id}`);
    router.back();
  };

  const getProjectById = (id: string): ProjectData | undefined =>
    projects.find((project) => project.id === id);

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
            <Task project={project} projects={projects} task={task} />
            <button
              type="button"
              className="-mt-1 rounded-md p-2.5 text-gray-700"
              onClick={onCloseModal}
              ref={closeButtonRef}
            >
              <span className="sr-only">Close menu</span>
              <XIconSvg aria-hidden="true" />
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
