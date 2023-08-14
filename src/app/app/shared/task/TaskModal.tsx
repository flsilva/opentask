'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@/app/shared/ui/icon/XIcon';
import { ProjectData } from '../project/ProjectData';
import TaskForm from './/TaskForm';
import { TaskData } from './TaskData';
import { DeleteIcon } from '@/app/shared/ui/icon/DeleteIcon';
import { ConfirmationModal, ConfirmationModalProps } from '../ui/ConfirmationModal';
import { deleteTask } from './task-model';

interface TaskModalModalProps {
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly task: TaskData | null;
}

export default function TaskModal({ project, projects, task }: TaskModalModalProps) {
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);
  const closeButtonRef = useRef(null);
  const router = useRouter();

  const onCloseModal = () => {
    if (confirmationModalProps) return;
    /*
     * Flavio Silva on Aug 4, 2023:
     * There's an issue calling router.back() after calling router.refresh().
     * Steps to reproduce:
     * 1) Reload the app at "/app/project/[projectId]".
     * 2) Click on any task.
     * The URL is updated to "/app/project/[projectId]/task/[taskId]" and <TaskModal> is rendered
     * as expected.
     * 3) If you close the modal it works as expected, i.e., the URL changes back to
     * "/app/project/[projectId]" and <TaskModal> is closed.
     * But if you click on the task name, change it, click "Save" (which calls router.refresh()
     * after data is saved), and then close the modal (which calls router.back()), the URL will be updated to
     * "/app/project/[projectId]" as expected, but <TaskModal> is not closed.
     *
     * That probably means that we're still in the "/app/project/[projectId]/task/[taskId]" route.
     * The "/app/today/task/[taskId]" route is implemented as described in Next.js App Router docs, especifically
     * in the Parallel Routes and Intercepting Routes pages:
     *
     * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
     * https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
     *
     * Fix: Call router.refresh() after router.back().
     * That's far from ideal beacuse that causes a full refetch and rerender every time the modal is closed.
     * But it's the only way to fix the issue, at least while keeping everything as simple as possible
     * and following this is server / client paradigm, i.e., implementing data fetching on the server only, etc.
     *
     * But, calling router.refresh() here is also fixing another issue, which I don't think is a Next.js bug,
     * but rather an application issue: data is not refetched and so not rerendered after we make changes
     * to tasks in the <TaskModal>. And calling router.refresh() right after making changes to tasks,
     * from within "/app/project/[projectId]/task/[taskId]" route doesn't rereftch and rerender the routes
     * under it, i.e., it doesn't update data and UI that's outside the modal.
     */
    router.back();
    router.refresh();
    /**/
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(null);
  };

  const onDeleteTask = () => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Delete',
      modalCopy: (
        <span>
          Are you sure you want to delete <span className="font-semibold">{task && task.name}</span>
          ?
        </span>
      ),
      modalTitle: 'Delete Task',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: async () => {
        if (!task) return;
        await deleteTask(task.id);
        setConfirmationModalProps(null);
        onCloseModal();
      },
      open: true,
    });
  };

  return (
    <>
      <Dialog
        as="div"
        open={true}
        className="relative z-50"
        onClose={onCloseModal}
        initialFocus={closeButtonRef}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex md:items-center">
          <Dialog.Panel className="mx-auto flex w-full flex-col rounded-lg bg-white p-4 md:w-[40rem]">
            <div className="flex items-start justify-between">
              <TaskForm
                project={project}
                projects={projects}
                task={task}
                taskNameClassName="text-2xl"
              />
              <div className="flex">
                <button
                  type="button"
                  className="rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
                  onClick={onDeleteTask}
                  ref={closeButtonRef}
                >
                  <span className="sr-only">Delete task</span>
                  <DeleteIcon aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="rounded-md ml-2 p-1.5 text-gray-700 hover:bg-gray-200"
                  onClick={onCloseModal}
                  ref={closeButtonRef}
                >
                  <span className="sr-only">Close modal</span>
                  <XIcon aria-hidden="true" />
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
}
