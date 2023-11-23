'use client';

import 'client-only';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import {
  buttonGreenClassName,
  buttonWhiteClassName,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { ServerResponse } from '@/modules/shared/data-access/ServerResponse';
import { InputContentEditable } from '@/modules/shared/form/InputContentEditable';
import { TaskCheck } from './TaskCheck';
import { TaskCheckSize } from './TaskCheckSize';
import { TaskDueDatePicker } from './TaskDueDatePicker';
import { TaskDto } from './TasksRepository';
import { FormContext } from '@/modules/shared/form/Form';

export interface TaskFormFieldsProps extends ClassNamePropsOptional {
  readonly defaultDueDate?: Date | undefined;
  readonly projectsSelect: React.ReactNode;
  readonly startOnEditingMode?: boolean;
  readonly task?: TaskDto | null;
  readonly taskNameClassName?: string;
}

/*
 * Flavio Silva on Nov. 22:
 *
 * <TaskFormFields> was supposed to be much simpler, maybe it wouldn't be necessary at all,
 * but due to Next.js bug that prevent using revalidateTag, revalidatePath, and router.refresh()
 * from Intercepting Routes, we need to workaround it with a Client Component and added complexity.
 *
 * GitHub issues:
 *
 * https://github.com/vercel/next.js/issues/58772
 *
 * https://github.com/vercel/next.js/issues/54723
 *
 */
export const TaskFormFields = ({
  defaultDueDate,
  className,
  projectsSelect,
  startOnEditingMode = false,
  task,
  taskNameClassName,
}: TaskFormFieldsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [keyToRerenderFields, setKeyToRerenderFields] = useState(cuid2());
  const [isOnEditingMode, setIsOnEditingMode] = useState(startOnEditingMode);
  const { subscribeToOnSubmitted, unsubscribeToOnSubmitted } = useContext(FormContext);

  /*
   * This _task and _setTask(), alongside the useEffect() below, is only necessary because
   * neither revalidateTag(), revalidatePath(), nor router.refresh() don'work on Intercepting Routes.
   * So we need to workaround it by maintaining a local task object and updating it manually.
   */
  const [_task, _setTask] = useState(task);

  const onTaskCheckClick = (response: ServerResponse<TaskDto | undefined>) => {
    if (response.errors || !response.data) return;
    _setTask(response.data);
  };

  const onDueDateChange = (response: ServerResponse<TaskDto | undefined>) => {
    if (response.errors || !response.data) return;
    _setTask(response.data);
  };

  const resetForm = useCallback(() => {
    /*
     * We want to get out of the editing mode only if we're editing a task.
     */
    if (_task) setIsOnEditingMode(false);
    /**/

    /*
     * We want to reset dueDate when creating tasks from the Project page
     * (when defaultDueDate === undefined).
     * But we want to keep the dueDate when creating tasks from the Today page
     * (when defaultDueDate === today).
     */
    if (!defaultDueDate) setDueDate(undefined);
    /**/

    setKeyToRerenderFields(cuid2());
  }, [defaultDueDate, _task]);

  useEffect(() => {
    if (!subscribeToOnSubmitted || !unsubscribeToOnSubmitted) return;

    const onFormSubmitted = (response: ServerResponse<any> | undefined) => {
      if (!response || !response.data || response.errors) return;
      /*
       * setTimeout() is necessary to avoid the bad setState() React error
       * when we use revalidatePath() or revalidateTag() on Server Actions.
       */
      setTimeout(() => {
        /*
         * We want to call _setTask() to update the current task object only if
         * we're editing a task.
         */
        if (_task) _setTask(response.data);
        /**/
        resetForm();
      }, 100);
      /**/
    };

    subscribeToOnSubmitted('TaskFormTextFields}', onFormSubmitted);
    return () => unsubscribeToOnSubmitted('TaskFormTextFields}');
  }, [subscribeToOnSubmitted, unsubscribeToOnSubmitted, resetForm, _task]);
  /**/

  const [dueDate, setDueDate] = useState<Date | undefined>(_task?.dueDate ?? defaultDueDate);

  const onNameDescriptionFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsOnEditingMode(true);
  };

  const inputNameAndDescriptionClassName = twJoin(
    'mb-3 block w-full rounded-md bg-white px-3 py-1.5 ring-0 focus:border-gray-900 focus:outline-0 focus:ring-0',
    isOnEditingMode && 'border border-gray-400 bg-white',
  );

  const inputNameBaseClassName = twMerge(
    inputNameAndDescriptionClassName,
    _task && _task.isCompleted && 'line-through',
    taskNameClassName,
  );

  const inputNameClassName = `${inputNameBaseClassName} text-gray-900`;

  const inputNamePlaceholderClassName = `${inputNameBaseClassName} text-gray-400`;

  const inputDescriptionClassName = `${inputNameAndDescriptionClassName} text-gray-900`;

  const inputDescriptionPlaceholderClassName = `${inputNameAndDescriptionClassName} text-gray-400`;

  return (
    <div className="flex flex-col" key={keyToRerenderFields}>
      <div className="flex">
        {_task && (
          <TaskCheck
            className="mt-2"
            taskId={_task.id}
            isCompleted={_task && _task.isCompleted}
            onClick={onTaskCheckClick}
            size={TaskCheckSize.Large}
          />
        )}
        <div className={twMerge('flex flex-col grow', className)}>
          <div className={`${_task ? 'mx-2' : ''}`}>
            <InputContentEditable
              autoFocus={startOnEditingMode}
              className={inputNameClassName}
              defaultValue={_task?.name}
              name="name"
              onFocus={onNameDescriptionFocus}
              placeholder="Task name"
              placeholderClassName={inputNamePlaceholderClassName}
              submitOnEnter
            />
            <InputContentEditable
              className={inputDescriptionClassName}
              defaultValue={_task?.description}
              name="description"
              onFocus={onNameDescriptionFocus}
              placeholder="Task description"
              placeholderClassName={inputDescriptionPlaceholderClassName}
            />
          </div>
          {isOnEditingMode && (
            <div className="mt-6 flex justify-end gap-2 sm:gap-4">
              <button
                type="button"
                className={buttonWhiteClassName}
                onClick={() => {
                  resetForm();
                  router.replace(pathname);
                }}
              >
                Cancel
              </button>
              <SubmitButton className={buttonGreenClassName}>Save</SubmitButton>
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row">
        <TaskDueDatePicker
          defaultDate={dueDate}
          name="dueDate"
          onChange={onDueDateChange}
          taskId={_task?.id}
        />
        <div className="relative h-12 sm:ml-4 md:ml-16 mt-6 sm:mt-0">{projectsSelect}</div>
      </div>
    </div>
  );
};
