'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { CheckIcon } from '@/modules/shared/icons/CheckIcon';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { TaskDto, updateTask } from './TasksRepository';
import { TaskCheckSize } from './TaskCheckSize';

export interface TaskCheckProps extends ClassNamePropsOptional {
  readonly isCompleted: boolean | null | undefined;
  readonly onClick?: (response: ServerResponse<TaskDto | undefined>) => void;
  readonly size: TaskCheckSize;
  readonly taskId: string;
}

export const TaskCheck = ({ className, isCompleted, onClick, size, taskId }: TaskCheckProps) => {
  const router = useRouter();

  const onCheckClick = async () => {
    if (!taskId) return;

    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('isCompleted', isCompleted ? 'off' : 'on');

    const response = await updateTask(undefined, formData);

    /*
     * Flavio Silva on Oct. 27:
     * The following router.refresh() works when we're completing / undoing tasks in a task list,
     * but it doesn't work as expected whe we're showing a task on a modal,
     * and so in a Intercepting Router, and complete it.
     * The Server Component of the page segment does rerender (TaskInterceptingPage) and
     * refetches the task, but the Client Component that it hands the task object to (<TaskForm>) doesn't rerender.
     * And the same is true for TaskPage, which is a normal page, and <TaskForm>.
     */
    // router.refresh() is necessary to refetch and rerender mutated data.
    router.refresh();

    /*
     * This is a workaround for this issue, so <TaskForm> can update itself
     * according to the updated isCompleted data.
     */
    if (onClick) onClick(response);
    /**/
  };

  return (
    <button type="button" className="group cursor flex self-start text-left" onClick={onCheckClick}>
      <div
        className={`shrink-0 rounded-full border border-gray-400 relative ${
          size === TaskCheckSize.Medium ? 'h-5 w-5' : 'h-7 w-7'
        } ${className}`}
      >
        <CheckIcon
          className={`absolute fill-gray-500 ${isCompleted ? '' : 'hidden group-hover:block'} ${
            size === TaskCheckSize.Medium ? 'w-5 h-5' : 'w-7 h-7'
          }`}
        />
      </div>
    </button>
  );
};
