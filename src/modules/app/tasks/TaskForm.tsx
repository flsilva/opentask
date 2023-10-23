'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Menu } from '@headlessui/react';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/controls/button/buttonClassName';
import { ExpandMoreIcon } from '@/modules/shared/icons/ExpandMoreIcon';
import { DropdownMenu } from '@/modules/shared/controls/dropdown/DropdownMenu';
import { useAutoFocus } from '@/modules/shared/utils/useAutoFocus';
import { useKeyboardEvent } from '@/modules/shared/utils/useKeyboardEvent';
import { ProjectDto } from '@/modules/app/projects/ProjectsRepository';
import { createTaskSchema, updateTaskSchema } from './TasksDomain';
import { TaskDueDatePicker } from './TaskDueDatePicker';
import { createTask, updateTask, CreateTaskDto, TaskDto, UpdateTaskDto } from './TasksRepository';
import { TaskCheck, TaskCheckSize } from './TaskCheck';

interface TaskFormProps extends ClassNamePropsOptional {
  readonly defaultDueDate?: Date | undefined;
  readonly onCancelClick?: () => void;
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
  project,
  projects,
  shouldStartOnEditingMode = false,
  task,
  taskNameClassName,
}: TaskFormProps) => {
  const NAME_PLACEHOLDER = 'Task name';
  const DESCRIPTION_PLACEHOLDER = 'Task description';

  const router = useRouter();
  const [name, setName] = useState(task ? task.name : NAME_PLACEHOLDER);
  const [description, setDescription] = useState(
    task && task.description ? task.description : DESCRIPTION_PLACEHOLDER,
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task && task.dueDate ? task.dueDate : defaultDueDate,
  );
  const [taskProject, setTaskProject] = useState(project ?? projects[0]);
  const [isCompleted, setIsCompleted] = useState(task && task.isCompleted);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isOnEditingMode, setIsOnEditingMode] = useState(shouldStartOnEditingMode);

  const generateTaskDto = useCallback(
    (): CreateTaskDto => ({
      name: (name !== NAME_PLACEHOLDER && name) || '',
      description: (description !== DESCRIPTION_PLACEHOLDER && description) || '',
      dueDate,
      projectId: taskProject.id,
    }),
    [description, dueDate, name, taskProject.id],
  );

  const isValidData = createTaskSchema.safeParse(generateTaskDto()).success;
  const inputNameRef = useAutoFocus<HTMLInputElement>(shouldStartOnEditingMode);

  const resetForm = useCallback(() => {
    setName('');
    setDescription(DESCRIPTION_PLACEHOLDER);
    /*
     * We want to reset dueDate when creating tasks from the Project page (defaultDueDate === undefined).
     * But we want to keep dueDate when creating tasks from the Today page (defaultDueDate === today).
     */
    if (!defaultDueDate) setDueDate(undefined);
    /**/
  }, [defaultDueDate]);

  const onSaveClick = useCallback(async () => {
    let data: CreateTaskDto | UpdateTaskDto = generateTaskDto();

    if (task) {
      data = { ...data, id: task.id };
      updateTaskSchema.parse(data);
      setIsOnEditingMode(false);
      await updateTask(data);
      inputNameRef.current?.blur();
      return;
    }

    createTaskSchema.parse(data);

    /*
     * Set focus must come here, before await, otherwise the virtual keyboard
     * is not shown on the iPhone, even though focus is set (default focus outlined is drawn).
     */
    inputNameRef.current?.focus();
    /**/

    await createTask(data);
    resetForm();

    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  }, [generateTaskDto, inputNameRef, resetForm, router, task]);

  /*
   * Flavio Silva on Aug. 14th, 2023:
   * It seems ContentEditable's shouldComponentUpdate() logic ignores event listeners
   * (like onKeydown), preventing it from being used in this case, where the listener
   * depends on reactive values and needs to be updated on rerender.
   *
   * So for now I'll use my custom useKeyboardEvent() hook below.
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || !isEditingName) return;
      event.preventDefault();
      if (!createTaskSchema.safeParse(generateTaskDto()).success) return;
      onSaveClick();
    },
    [generateTaskDto, isEditingName, onSaveClick],
  );

  useKeyboardEvent('keydown', [{ key: 'Enter', listener: onKeyDown }]);
  /**/

  const onDueDateChange = async (date: Date | undefined) => {
    setDueDate(date);
    if (!task) return;
    updateTask({ id: task.id, dueDate: date || null });
  };

  const onTaskProjectChange = (selectedProject: ProjectDto) => {
    setTaskProject(selectedProject);
    if (!task) return;
    updateTask({ id: task.id, projectId: selectedProject.id });
  };

  const onTaskCheckClick = async () => {
    if (!task) return;
    setIsCompleted(!isCompleted);
    await updateTask({ id: task.id, isCompleted: !isCompleted });
  };

  const onNameFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    /*
     * Flavio Silva on Jul. 17, 2023:
     * Context: This TaskForm component is used by the TaskModal component, which in turn uses
     * the HeadlessUI Dialog component.
     * Fact: This focus event is being automatically trigged right after render.
     * I believe it's being trigged by the HeadlessUI's Dialog component, even though it shouldn't
     * as there's a <button> component on the modal that is first rendered and ends up with the
     * focus in the end.
     * From their docs on https://headlessui.com/react/dialog:
     * "By default, the Dialog component will focus the first focusable element (by DOM order) once
     * it is rendered"
     * I should try to created a minimum reproducible repo to confirm this issue, and in that case
     * open an issue in their repo.
     * Fix: a temporary fix is verifying this relatedTarget object and its
     * 'data-headlessui-focus-guard' attribute, that existis in this first auto focus trigger.
     * Using initialFocus on Dialog to manually point to the <button> using a ref
     * works to keep the focus on the <button> but doesn't prevent triggering this focus event.
     */
    const relatedTarget = event.relatedTarget;

    if (
      relatedTarget !== undefined &&
      relatedTarget !== null &&
      relatedTarget.attributes.getNamedItem('data-headlessui-focus-guard') !== undefined &&
      relatedTarget.attributes.getNamedItem('data-headlessui-focus-guard') !== null
    ) {
      return;
    }

    /**/
    setIsEditingName(true);
    setIsOnEditingMode(true);
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '' && event.target.innerHTML !== NAME_PLACEHOLDER) return;
    setName('');
  };

  const onNameBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsEditingName(false);
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '') return;
    setName(NAME_PLACEHOLDER);
  };

  const onNameChangeHandler = (event: { target: { value: string } }) => {
    if (event.target === null || event.target === undefined) return;
    setName(event.target.value);
  };

  const onDescriptionFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsOnEditingMode(true);
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '' && event.target.innerHTML !== DESCRIPTION_PLACEHOLDER) return;
    setDescription('');
  };

  const onDescriptionBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '') return;
    setDescription(DESCRIPTION_PLACEHOLDER);
  };

  const onDescriptionChangeHandler = (event: { target: { value: string } }) => {
    if (event.target === null || event.target === undefined) return;
    setDescription(event.target.value);
  };

  const getItemsForProjectsDropdown = () =>
    projects.map((project) => (
      <Menu.Item key={project.id} as={Fragment}>
        {({ active }: { active: boolean }) => (
          <button
            type="button"
            onClick={() => onTaskProjectChange(project)}
            className={`${
              active || (taskProject && taskProject.name === project.name)
                ? 'bg-green-500 text-white'
                : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {project.name}
          </button>
        )}
      </Menu.Item>
    ));

  const defaultNameAndDescriptionClassName =
    'mb-3 block w-full rounded-md bg-white px-3 py-1.5 ring-0 focus:border-gray-900 focus:outline-0 focus:ring-0';

  const isEditingNameAndDescriptionClassName = `${defaultNameAndDescriptionClassName} border border-gray-400 bg-white`;

  const nameClassName = `${
    isOnEditingMode ? isEditingNameAndDescriptionClassName : defaultNameAndDescriptionClassName
  } ${name === NAME_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'} ${taskNameClassName} ${
    isCompleted ? 'line-through' : ''
  }`;

  const descriptionClassName = `${
    isOnEditingMode ? isEditingNameAndDescriptionClassName : defaultNameAndDescriptionClassName
  } ${description === DESCRIPTION_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'}`;

  if (!project)
    throw new Error(
      `TaskForm() - Object "project" must not be null nor undefined. Received: ${project}`,
    );

  return (
    <form className={`flex w-full flex-col ${className}`}>
      <div className="flex">
        {task && (
          <TaskCheck
            className="mt-2"
            isCompleted={isCompleted}
            onTaskCheckClick={onTaskCheckClick}
            size={TaskCheckSize.Large}
          />
        )}
        <div className={`flex flex-col grow ${task ? 'ml-2' : ''}`}>
          <ContentEditable
            className={nameClassName}
            html={name}
            innerRef={inputNameRef}
            onBlur={onNameBlurHandler}
            onFocus={onNameFocusHandler}
            onChange={onNameChangeHandler}
          />
          <ContentEditable
            className={descriptionClassName}
            html={description ?? ''}
            onBlur={onDescriptionBlurHandler}
            onFocus={onDescriptionFocusHandler}
            onChange={onDescriptionChangeHandler}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row">
        <TaskDueDatePicker defaultDate={dueDate} onChange={onDueDateChange} />
        <div className="relative h-12 sm:ml-4 md:ml-16 mt-6 sm:mt-0">
          <DropdownMenu
            className="absolute w-56"
            items={getItemsForProjectsDropdown()}
            itemsClassName="absolute bottom-14 left-0 max-h-80 w-56"
            menuButton={
              <Menu.Button className="flex items-center justify-center rounded-md bg-green-600 px-2 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-500">
                {taskProject.name}
                <ExpandMoreIcon className="ml-2 fill-white" />
              </Menu.Button>
            }
          />
        </div>
      </div>
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
          <button
            type="button"
            disabled={!isValidData}
            className={buttonClassNameGreen}
            onClick={onSaveClick}
          >
            {task ? 'Save' : 'Add task'}
          </button>
        </div>
      )}
    </form>
  );
};
