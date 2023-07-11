'use client';

import 'client-only';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { ClassNamePropsOptional } from '@/app/shared/ui/ClassNameProps';
import Button from '@/app/shared/ui/button/Button';
import DropdownMenu, { DropdownMenuItemData } from '@/app/shared/ui/dropdown/DropdownMenu';
import { ProjectData } from '../project/ProjectData';
import { TaskData } from './TaskData';
import TaskDueDatePicker from './TaskDueDatePicker';

interface TaskFormProps extends ClassNamePropsOptional {
  readonly onCancelClick: () => void;
  readonly onSaveClick: () => void;
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly shouldStartAtEditingMode?: boolean;
  readonly task?: TaskData;
  readonly taskNameClassName?: string;
}

export default function TaskForm({
  className,
  onCancelClick,
  onSaveClick,
  project,
  projects,
  shouldStartAtEditingMode,
  task,
  taskNameClassName,
}: TaskFormProps) {
  const NAME_PLACEHOLDER = 'Task name';
  const DESCRIPTION_PLACEHOLDER = 'Task description';

  const [name, setName] = useState(task ? task.name : NAME_PLACEHOLDER);
  const [description, setDescription] = useState(task ? task.description : DESCRIPTION_PLACEHOLDER);
  const [moveToProject, setMoveToProject] = useState(project);
  const [isEditing, setIsEditing] = useState(shouldStartAtEditingMode);

  const onNameFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('TaskForm().onNameFocusHandler()');
    setIsEditing(true);
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
    setIsEditing(true);
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

  const dropdownMenuItemClickHandler = (item: DropdownMenuItemData) => {
    console.log('TaskForm().dropdownMenuItemClickHandler() - item: ', item);
    const project = getProjectById(item.id);
    if (project) setMoveToProject(project);
  };

  const getProjectById = (id: string): ProjectData | undefined =>
    projects.find((project) => project.id === id);

  const defaultNameAndDescriptionClassName =
    'mb-3 block w-full rounded-md bg-white px-3 py-1.5 ring-0 focus:border-gray-900 focus:outline-0 focus:ring-0';

  const isEditingNameAndDescriptionClassName = `${defaultNameAndDescriptionClassName} border border-gray-400 bg-white`;

  const nameClassName = `${
    isEditing ? isEditingNameAndDescriptionClassName : defaultNameAndDescriptionClassName
  } ${name === NAME_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'} ${taskNameClassName}`;

  const descriptionClassName = `${
    isEditing ? isEditingNameAndDescriptionClassName : defaultNameAndDescriptionClassName
  } ${description === DESCRIPTION_PLACEHOLDER ? 'text-gray-400' : 'text-gray-900'}`;

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
        html={description}
        onBlur={onDescriptionBlurHandler}
        onFocus={onDescriptionFocusHandler}
        onChange={onDescriptionChangeHandler}
      />
      <div className="mt-8 flex flex-col md:flex-row md:items-start">
        <TaskDueDatePicker className="z-50" />
        <div className="relative ml-0 mt-4 h-12 md:ml-16 md:mt-0">
          <DropdownMenu
            buttonText={moveToProject.name}
            className="absolute w-56"
            items={projects.map((project) => ({ id: project.id, label: project.name }))}
            onDropdownMenuItemClick={dropdownMenuItemClickHandler}
          />
        </div>
      </div>
      {isEditing && (
        <div className="mt-6 flex justify-end gap-2 sm:gap-4">
          <Button color="white" onClick={onCancelClick}>
            Cancel
          </Button>
          <Button onClick={onSaveClick}>Add task</Button>
        </div>
      )}
    </form>
  );
}
