'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@/modules/shared/icon/XIcon';
import { DeleteIcon } from '@/modules/shared/icon/DeleteIcon';
import { ConfirmationModal, ConfirmationModalProps } from '@/modules/app/shared/ConfirmationModal';
import { ProjectDTO } from '@/modules/app/project/project-model-dto';
import TaskForm from './TaskForm';
import { TaskDTO } from './task-model-dto';
import { deleteTask } from './task-model-db';

interface TaskModalModalProps {
  readonly isOpen: boolean;
  readonly onCloseModal?: () => void;
  readonly project: ProjectDTO;
  readonly projects: Array<ProjectDTO>;
  readonly shouldGoBackOnClose?: boolean;
  readonly shouldStartOnEditingMode?: boolean;
  readonly task?: TaskDTO | null;
}

export default function TaskModal({
  isOpen,
  onCloseModal,
  project,
  projects,
  shouldGoBackOnClose = true,
  shouldStartOnEditingMode = false,
  task,
}: TaskModalModalProps) {
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);
  const closeButtonRef = useRef(null);
  const router = useRouter();
  const [_isOpen, _setIsOpen] = useState(false);

  /*
   * Flavio Silva on Aug. 16th, 2023:
   * This is necessary to have the on enter <Transition> animation.
   * When I tried to set "show={true}" and "appear={true}" it didn't work.
   */
  useEffect(() => _setIsOpen(isOpen), [isOpen]);
  /**/

  const onInternalCloseModal = () => {
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

    /*
     * setTimout() used to wait for the leave transition.
     */
    setTimeout(() => {
      if (onCloseModal) onCloseModal();
      if (shouldGoBackOnClose) router.back();
      router.refresh();
    }, 200);
    /**/

    _setIsOpen(false);
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
        onInternalCloseModal();
      },
      open: true,
    });
  };

  return (
    <Transition show={_isOpen} as="div">
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onInternalCloseModal}
        initialFocus={closeButtonRef}
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
              <div className="flex items-start justify-between">
                <TaskForm
                  project={project}
                  projects={projects}
                  shouldStartOnEditingMode={shouldStartOnEditingMode}
                  task={task}
                  taskNameClassName="text-2xl"
                />
                <div className="flex">
                  {task && (
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-gray-700 hover:bg-gray-200"
                      onClick={onDeleteTask}
                    >
                      <span className="sr-only">Delete task</span>
                      <DeleteIcon aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="rounded-md ml-2 p-1.5 text-gray-700 hover:bg-gray-200"
                    onClick={onInternalCloseModal}
                    ref={closeButtonRef}
                  >
                    <span className="sr-only">Close modal</span>
                    <XIcon aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </Transition>
  );
}
