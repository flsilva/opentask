'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { twJoin, twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { CheckIcon } from '@/features/shared/ui/icon/CheckIcon';
import { ServerResponse } from '@/features/shared/data-access/ServerResponse';
import { TaskDto, updateTask } from '../data-access/TasksDataAccess';
import { TaskCheckSize } from './TaskCheckSize';

export interface TaskCheckProps extends ClassNamePropsOptional {
  readonly completedAt: Date | null | undefined;
  readonly onClick?: (response: ServerResponse<TaskDto | undefined>) => void;
  readonly size: TaskCheckSize;
  readonly taskId?: string;
}

/*
 * Flavio Silva on Nov. 22:
 *
 * revalidatePath() and revalidateTag() break the app when used in Intercepting Routes:
 *
 * GitHub issue:
 * https://github.com/vercel/next.js/issues/58772
 *
 * So I made TaskCheck a Client Component to be able to use router.refresh() after updating the task,
 * but it turns out router.refresh() doesn't work either on Intercepting Routes, as described below.
 *
 */
export const TaskCheck = ({ className, completedAt, onClick, size, taskId }: TaskCheckProps) => {
  const router = useRouter();

  const onCheckClick = async () => {
    if (!taskId) return;

    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('completedAt', completedAt ? 'null' : new Date().toString());

    const response = await updateTask(undefined, formData);

    /*
     * Flavio Silva on Nov. 22:
     * The following router.refresh() works when we're completing / undoing tasks in a task list,
     * but it doesn't work as expected when we're completing a task in a Dialog in the
     * Intercepting Route "app/tasks/[taskId]".
     * The Server Component of the page segment does rerender (TaskDialogPage) and
     * refetches the updated task, the <TaskForm> Server Component does rerender, but
     * Client Components don't rerender.
     *
     * GitHub issue:
     * https://github.com/vercel/next.js/issues/51310
     */
    // router.refresh() is necessary to refetch and rerender mutated data.
    router.refresh();

    /*
     * This is a workaround for this issue, so <TaskFormTextFields> can update itself
     * according to the updated completedAt data.
     */
    if (onClick) onClick(response);
    /**/
  };

  return (
    <button type="button" className="group cursor flex self-start text-left" onClick={onCheckClick}>
      <div
        className={twMerge(
          'shrink-0 rounded-full border border-gray-400 relative',
          size === TaskCheckSize.Medium ? 'h-5 w-5' : 'h-7 w-7',
          className,
        )}
      >
        <CheckIcon
          className={twJoin(
            'absolute fill-gray-500',
            size === TaskCheckSize.Medium ? 'w-5 h-5' : 'w-7 h-7',
            !completedAt && 'hidden group-hover:block',
          )}
        />
      </div>
    </button>
  );
};
