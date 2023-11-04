'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { cuid2 } from '@/modules/app/shared/data-access/cuid2';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { InputContentEditable } from '@/modules/shared/form/InputContentEditable';
import { useFormAction } from '@/modules/shared/form/useFormAction';
import { ProjectsDropdown } from '@/modules/app/projects/ProjectsDropdown';
import { ProjectDto } from '@/modules/app/projects/ProjectsRepository';
import { TaskCheck } from './TaskCheck';
import { TaskCheckSize } from './TaskCheckSize';
import { TaskDueDatePicker } from './TaskDueDatePicker';
import { createTask, updateTask, TaskDto } from './TasksRepository';

export interface TaskFormProps extends ClassNamePropsOptional {
  readonly defaultDueDate?: Date | undefined;
  readonly onCancelClick?: () => void;
  readonly openDropdownDirection?: 'top' | 'bottom';
  readonly project: ProjectDto | null;
  readonly projects: Array<ProjectDto>;
  readonly shouldStartOnEditingMode?: boolean;
  readonly task?: TaskDto | null;
  readonly taskNameClassName?: string;
}

export const TaskForm = ({
  className,
  defaultDueDate,
  onCancelClick,
  openDropdownDirection,
  project,
  projects,
  shouldStartOnEditingMode = false,
  task,
  taskNameClassName,
}: TaskFormProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [keyToForceRerenderContentEditable, setKeyToForceRerenderContentEditable] = useState(
    cuid2(),
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task && task.dueDate ? task.dueDate : defaultDueDate,
  );
  const [isCompleted, setIsCompleted] = useState(task && task.isCompleted);
  const [isOnEditingMode, setIsOnEditingMode] = useState(shouldStartOnEditingMode);

  useEffect(() => {
    if (shouldStartOnEditingMode) inputNameRef.current?.focus();
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

    if (task && task.id === newTask.id) {
      // task was edited

      setIsOnEditingMode(false);
      inputNameRef.current?.blur();
      return;
    }

    // task was created

    resetForm();

    // router.refresh() is necessary to refetch and rerender mutated data.
    router.refresh();
  };

  const [serverResponse, formAction] = useFormAction({
    action: task ? updateTask : createTask,
    onFormSubmitted,
  });

  const requestSubmit = async () => {
    formRef.current?.requestSubmit();
  };

  const onTaskProjectChange = async (selectedProject: ProjectDto) => {
    // setTaskProject(selectedProject);
    if (!task) return;

    const formData = new FormData();
    formData.append('id', task.id);
    formData.append('projectId', selectedProject.id);

    await updateTask(undefined, formData);
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

  const inputNameAndDescriptionClassName = `mb-3 block w-full rounded-md bg-white px-3 py-1.5 ring-0 focus:border-gray-900 focus:outline-0 focus:ring-0 ${
    isOnEditingMode ? 'border border-gray-400 bg-white' : ''
  }`;

  const inputNameBaseClassName = `${inputNameAndDescriptionClassName} ${taskNameClassName} ${
    isCompleted ? 'line-through' : ''
  }`;

  const inputNameClassName = `${inputNameBaseClassName} text-gray-900`;

  const inputNamePlaceholderClassName = `${inputNameBaseClassName} text-gray-400`;

  const inputDescriptionClassName = `${inputNameAndDescriptionClassName} text-gray-900`;

  const inputDescriptionPlaceholderClassName = `${inputNameAndDescriptionClassName} text-gray-400`;

  if (!project)
    throw new Error(
      `TaskForm() - Object "project" must not be null nor undefined. Received: ${project}`,
    );

  return (
    <form action={formAction} className={`flex w-full flex-col ${className}`} ref={formRef}>
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
        <div className="relative h-12 sm:ml-4 md:ml-16 mt-6 sm:mt-0">
          <ProjectsDropdown
            className="absolute w-56"
            defaultItem={project ?? projects[0]}
            itemsClassName={`absolute left-0 max-h-48 w-56 ${
              openDropdownDirection === 'top' ? 'bottom-14' : 'top-14'
            }`}
            name="projectId"
            onItemClick={onTaskProjectChange}
            projects={projects}
          />
        </div>
      </div>
      {serverResponse && serverResponse.errors && <ErrorList errors={serverResponse.errors} />}
      {isOnEditingMode && (
        <div className="mt-12 flex justify-end gap-2 sm:gap-4">
          <button
            type="button"
            className={buttonClassNameWhite}
            onClick={() => {
              setIsOnEditingMode(false);
              if (onCancelClick) onCancelClick();
            }}
          >
            Cancel
          </button>
          <SubmitButton className={buttonClassNameGreen} label="Save" submittingLabel="Saving..." />
        </div>
      )}
    </form>
  );
};
