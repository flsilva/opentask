'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import {
  buttonGreenClassName,
  buttonWhiteClassName,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { cuid2 } from '@/modules/shared/data-access/cuid2';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '@/modules/shared/data-access/ServerResponse';
import { InputContentEditable } from '@/modules/shared/form/InputContentEditable';
import { useForm } from '@/modules/shared/form/useForm';
import { TaskCheck } from './TaskCheck';
import { TaskCheckSize } from './TaskCheckSize';
import { TaskDueDatePicker } from './TaskDueDatePicker';
import { createTask, updateTask, TaskDto } from './TasksRepository';

export interface TaskFormProps extends ClassNamePropsOptional {
  readonly defaultDueDate?: Date | undefined;
  readonly onCancel?: () => void;
  readonly projectsSelect: React.ReactNode;
  readonly startOnEditingMode?: boolean;
  readonly task?: TaskDto | null;
  readonly taskNameClassName?: string;
}

export const TaskForm = ({
  className,
  defaultDueDate,
  onCancel,
  projectsSelect,
  startOnEditingMode = false,
  task,
  taskNameClassName,
}: TaskFormProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [keyToForceRerenderContentEditable, setKeyToForceRerenderContentEditable] =
    useState(cuid2());
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task && task.dueDate ? task.dueDate : defaultDueDate,
  );
  const [isCompleted, setIsCompleted] = useState(task && task.isCompleted);
  const [isOnEditingMode, setIsOnEditingMode] = useState(startOnEditingMode);

  useEffect(() => {
    if (startOnEditingMode) inputNameRef.current?.focus();
  });

  const resetForm = () => {
    setKeyToForceRerenderContentEditable(cuid2());

    /*
     * We want to reset dueDate when creating tasks from the Project page (defaultDueDate === undefined).
     * But we want to keep dueDate when creating tasks from the Today page (defaultDueDate === today).
     */
    if (!defaultDueDate) setDueDate(undefined);
    /**/
  };

  const onFormSubmitted = (response: ServerResponse<TaskDto | undefined> | undefined) => {
    if (!response || !response.data || response.errors) return;

    const { data: newTask } = response;

    /*
     * Task was edited.
     */
    if (task && task.id === newTask.id) {
      setIsOnEditingMode(false);
      inputNameRef.current?.blur();
      return;
    }
    /**/

    /*
     * Task was created
     */
    resetForm();

    /*
     * Flavio Silva on Nov. 18th:
     *
     * Using router.refresh() below is a workaraound necessary due to the bug described in
     * TasksRepository's createTask() function, i.e., revalidateTag('tasks') doesn't work
     * on Intercepting Routes. Pleae check that file for more details.
     *
     * But it triggers its own client side runtime error, even though the app works as expected,
     * and so I'm keeping it for now. The following is the error message:
     *
     * Warning: Cannot update a component (`Router`) while rendering a different component (`TaskForm`).
     * To locate the bad setState() call inside `TaskForm`, follow the stack trace as described in
     * https://reactjs.org/link/setstate-in-render
     */
    router.refresh();
    /**/
  };

  const [serverResponse, formAction] = useForm({
    action: task ? updateTask : createTask,
    onFormSubmitted,
  });

  const requestSubmit = async () => {
    formRef.current?.requestSubmit();
  };

  const onDueDateChange = async (date: Date | undefined) => {
    setDueDate(date);
    if (!task) return;

    const formData = new FormData();
    formData.append('id', task.id);
    formData.append('dueDate', date === undefined ? 'null' : String(date));

    await updateTask(undefined, formData);
  };

  /*
   * Flavio Silva on Oct 27:
   * This is necessary due to the bug described in the TaskCheck.ts component, i.e.,
   * calling router.refresh() after updating task.isCompleted doesn't work as expected.
   */
  const onTaskCheckClick = (response: ServerResponse<TaskDto | undefined>) => {
    if (response.errors) return;
    setIsCompleted(response.data?.isCompleted);
  };
  /**/

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    requestSubmit();
  };

  const onNameDescriptionFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsOnEditingMode(true);
  };

  const inputNameAndDescriptionClassName = twJoin(
    'mb-3 block w-full rounded-md bg-white px-3 py-1.5 ring-0 focus:border-gray-900 focus:outline-0 focus:ring-0',
    isOnEditingMode && 'border border-gray-400 bg-white',
  );

  const inputNameBaseClassName = twMerge(
    inputNameAndDescriptionClassName,
    isCompleted && 'line-through',
    taskNameClassName,
  );

  const inputNameClassName = `${inputNameBaseClassName} text-gray-900`;

  const inputNamePlaceholderClassName = `${inputNameBaseClassName} text-gray-400`;

  const inputDescriptionClassName = `${inputNameAndDescriptionClassName} text-gray-900`;

  const inputDescriptionPlaceholderClassName = `${inputNameAndDescriptionClassName} text-gray-400`;

  return (
    <form action={formAction} className={twMerge('flex flex-col w-full', className)} ref={formRef}>
      {task && <input type="hidden" name="id" value={task.id} />}
      <div className="flex">
        {task && (
          <TaskCheck
            className="mt-2"
            {...(task && { taskId: task.id })}
            isCompleted={isCompleted}
            onClick={onTaskCheckClick}
            size={TaskCheckSize.Large}
          />
        )}
        <div
          className={`flex flex-col grow ${task ? 'mx-2' : ''}`}
          key={keyToForceRerenderContentEditable}
        >
          <InputContentEditable
            className={inputNameClassName}
            {...(task && { defaultValue: task.name })}
            name="name"
            onFocus={onNameDescriptionFocus}
            onKeyDown={onKeyDown}
            placeholder="Task name"
            placeholderClassName={inputNamePlaceholderClassName}
            ref={inputNameRef}
          />
          <InputContentEditable
            className={inputDescriptionClassName}
            {...(task && task.description && { defaultValue: task.description })}
            name="description"
            onFocus={onNameDescriptionFocus}
            placeholder="Task description"
            placeholderClassName={inputDescriptionPlaceholderClassName}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row">
        <TaskDueDatePicker defaultDate={dueDate} name="dueDate" onChange={onDueDateChange} />
        <div className="relative h-12 sm:ml-4 md:ml-16 mt-6 sm:mt-0">{projectsSelect}</div>
      </div>
      {serverResponse && serverResponse.errors && <ErrorList errors={serverResponse.errors} />}
      {isOnEditingMode && (
        <div className="mt-12 flex justify-end gap-2 sm:gap-4">
          <button
            type="button"
            className={buttonWhiteClassName}
            onClick={() => {
              setIsOnEditingMode(false);
              if (onCancel) onCancel();
            }}
          >
            Cancel
          </button>
          <SubmitButton className={buttonGreenClassName}>Save</SubmitButton>
        </div>
      )}
    </form>
  );
};
