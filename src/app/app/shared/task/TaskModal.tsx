'use client';

import { useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import { ProjectData } from '../project/ProjectData';
import TaskForm from './/TaskForm';
import { TaskData } from './TaskData';

interface TaskModalModalProps {
  readonly project?: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly task: TaskData;
}

export default function TaskModal({ project, projects, task }: TaskModalModalProps) {
  const closeButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const onCloseModal = () => {
    /*
     * Flavio Silva on Jul 17, 2023:
     * There seems to be a bug with router.back() when we hit "cancel" in TaskForm, which
     * calls this function. Only when called by that button there's a hard refresh in the browser
     * and a redirect back to the URL we were in before hitting the "cancel" button.
     * So we can't use router.back() here.
     * But when we try to manually navigate back, we have another bug: the modal is not closed.
     * So if we're in /app/today/task/1, for example, and manually navigate to /app/today, the modal
     * is not closed. Not sure if that's really a bug the router.push() or an edge case.
     * Fix: In either case, I'm manually closing the modal here too to fix the latter issue.
     */

    // router.back();

    let navToPath;

    if (project) {
      navToPath = `/app/project/${project.id}`;
    } else {
      navToPath = '/app/today';
    }

    router.push(navToPath);
    setIsOpen(false);
    /**/
  };

  const saveNewTaskHandler = () => {
    console.log('TaskListAndNewTask().saveNewTaskHandler()');
  };

  return (
    <Dialog
      as="div"
      open={isOpen}
      className="relative z-50"
      onClose={onCloseModal}
      initialFocus={closeButtonRef}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center">
        <Dialog.Panel className="mx-auto flex w-full flex-col rounded-lg bg-white p-4 md:w-[40rem]">
          <div className="flex justify-end">
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
          <TaskForm
            onCancelClick={onCloseModal}
            onSaveClick={saveNewTaskHandler}
            project={project}
            projects={projects}
            task={task}
            taskNameClassName="text-2xl"
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
