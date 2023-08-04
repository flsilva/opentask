'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Menu } from '@headlessui/react';
import { ClassNamePropsOptional } from '@/app/shared/ui/ClassNameProps';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/app/shared/ui//button/buttonClassName';
import { ExpandMoreIcon } from '@/app/shared/ui/icon/ExpandMoreIcon';
import DropdownMenu from '@/app/shared/ui/dropdown/DropdownMenu';
import { ProjectData } from '../project/ProjectData';
import {
  CreateTaskData,
  CreateTaskSchema,
  TaskData,
  UpdateTaskData,
  UpdateTaskSchema,
} from './TaskData';
import TaskDueDatePicker from './TaskDueDatePicker';
import { createTask, updateTask, updateTaskDueDate } from './task-model';

interface TaskFormProps extends ClassNamePropsOptional {
  readonly onCancelClick?: () => void;
  readonly project: ProjectData | null;
  readonly projects: Array<ProjectData>;
  readonly shouldStartEditingNameOrDescription?: boolean;
  readonly task?: TaskData | null;
  readonly taskNameClassName?: string;
}

export default function TaskForm({
  className,
  onCancelClick,
  project,
  projects,
  shouldStartEditingNameOrDescription = false,
  task,
  taskNameClassName,
}: TaskFormProps) {
  console.log('TaskForm() - task: ', task);
  const NAME_PLACEHOLDER = 'Task name';
  const DESCRIPTION_PLACEHOLDER = 'Task description';

  const router = useRouter();
  const [name, setName] = useState(task ? task.name : NAME_PLACEHOLDER);
  const [description, setDescription] = useState(task ? task.description : DESCRIPTION_PLACEHOLDER);
  const [dueDate, setDueDate] = useState<Date | null>(task && task.dueDate ? task.dueDate : null);
  const [taskProject, setTaskProject] = useState(project ?? projects[0]);
  const [isEditingNameOrDescription, setIsEditingNameOrDescription] = useState(
    shouldStartEditingNameOrDescription,
  );

  const generateTaskData = (): CreateTaskData => ({
    name: (name !== NAME_PLACEHOLDER && name) || '',
    description: (description !== DESCRIPTION_PLACEHOLDER && description) || '',
    dueDate,
    projectId: taskProject.id,
  });

  const isDataValid = CreateTaskSchema.safeParse(generateTaskData()).success;

  const resetForm = () => {
    setName(NAME_PLACEHOLDER);
    setDescription(DESCRIPTION_PLACEHOLDER);
    setDueDate(null);
  };

  const onSaveClick = async () => {
    let data: CreateTaskData | UpdateTaskData = generateTaskData();
    console.log('TaskForm().onSaveClick() - data: ', data);

    if (task) {
      data = { ...data, id: task.id };
      UpdateTaskSchema.parse(data);
      setIsEditingNameOrDescription(false);
      await updateTask(data);
    }

    CreateTaskSchema.parse(data);
    await createTask(data);
    resetForm();
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onDueDateChange = async (date: Date | null) => {
    setDueDate(date);
    if (!task) return;
    updateTaskDueDate(task.id, date);
  };

  const onNameFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('TaskForm().onNameFocusHandler() - event: ', event);

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
    )
      return;
    /**/
    setIsEditingNameOrDescription(true);
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '' && event.target.innerHTML !== NAME_PLACEHOLDER) return;
    setName('');
  };

  const onNameBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target === null || event.target === undefined) return;
    if (event.target.innerHTML !== '') return;
    setName(NAME_PLACEHOLDER);
  };

  const onNameChangeHandler = (event: { target: { value: string } }) => {
    if (event.target === null || event.target === undefined) return;
    setName(event.target.value);
  };

  const onDescriptionFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('TaskForm().onDescriptionFocusHandler()');
    setIsEditingNameOrDescription(true);
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

  const dropdownMenuItemClickHandler = (selectedProject: ProjectData) => {
    console.log('TaskForm().dropdownMenuItemClickHandler() - selectedProject: ', selectedProject);
    const project = getProjectById(selectedProject.id);
    if (project) setTaskProject(project);
  };

  const getProjectById = (id: string): ProjectData | undefined =>
    projects.find((project) => project.id === id);

  const getItemsForProjectsDropdown = () =>
    projects.map((project) => (
      <Menu.Item key={project.id} as={Fragment}>
        {({ active }: { active: boolean }) => (
          <button
            type="button"
            onClick={() => dropdownMenuItemClickHandler(project)}
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
    isEditingNameOrDescription
      ? isEditingNameAndDescriptionClassName
      : defaultNameAndDescriptionClassName
  } ${name === NAME_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'} ${taskNameClassName}`;

  const descriptionClassName = `${
    isEditingNameOrDescription
      ? isEditingNameAndDescriptionClassName
      : defaultNameAndDescriptionClassName
  } ${description === DESCRIPTION_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'}`;

  if (!project)
    throw new Error(
      `TaskForm() - Object "project" must not be null nor undefined. Received: ${project}`,
    );

  return (
    <form className={`flex w-full flex-col ${className}`}>
      <ContentEditable
        className={nameClassName}
        html={name}
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
      <div className="mt-8 flex flex-col md:flex-row md:items-start">
        <TaskDueDatePicker className="z-50" defaultDate={dueDate} onChange={onDueDateChange} />
        <div className="relative ml-0 mt-4 h-12 md:ml-16 md:mt-0">
          <DropdownMenu
            className="absolute w-56"
            items={getItemsForProjectsDropdown()}
            itemsClassName="absolute bottom-14 left-0 max-h-80 w-56"
            menuButton={
              <Menu.Button className="flex items-center justify-center rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                {taskProject.name}
                <ExpandMoreIcon className="ml-2 fill-white" />
              </Menu.Button>
            }
          />
        </div>
      </div>
      {isEditingNameOrDescription && (
        <div className="mt-12 flex justify-end gap-2 sm:gap-4">
          <button
            type="button"
            className={buttonClassNameWhite}
            onClick={() => {
              setIsEditingNameOrDescription(false);
              if (onCancelClick) onCancelClick();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isDataValid}
            className={buttonClassNameGreen}
            onClick={onSaveClick}
          >
            {task ? 'Save' : 'Add task'}
          </button>
        </div>
      )}
    </form>
  );
}
