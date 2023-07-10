'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/shared/ui/button/Button';
import DropdownMenu, { DropdownMenuItemData } from '@/app/shared/ui/dropdown/DropdownMenu';
import { ProjectData } from '../project/ProjectData';
import { TaskData } from './TaskData';
import TaskDueDatePicker from './TaskDueDatePicker';

interface TaskProps {
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly task: TaskData;
}

export default function Task({ project, projects, task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [moveToProject, setMoveToProject] = useState(project);
  const router = useRouter();

  console.log('TaskModal() - isEditing: ', isEditing);

  const saveTaskHandler = () => {
    console.log('TaskModal().saveTaskHandler()');
  };

  const onCloseModal = () => {
    console.log('TaskModal().onCloseModal()');
    router.push(`/app/project/${project.id}`);
  };

  const dropdownMenuItemClickHandler = (item: DropdownMenuItemData) => {
    console.log('TaskModal().dropdownMenuItemClickHandler() - item: ', item);
    const project = getProjectById(item.id);
    if (project) setMoveToProject(project);
  };

  const getProjectById = (id: string): ProjectData | undefined =>
    projects.find((project) => project.id === id);

  return (
    <form className="flex w-full flex-col">
      {isEditing && (
        <input
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={typeof task.name === 'string' ? '' : 'Task name'}
          required
          className={`mr-4 block w-full rounded-md text-2xl ${
            isEditing ? 'border border-gray-400' : 'border-0'
          } py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0`}
        />
      )}
      {!isEditing && (
        <button
          type="button"
          className="mr-4 text-left text-2xl"
          onClick={() => setIsEditing(true)}
        >
          {name}
        </button>
      )}
      <textarea
        name="description"
        placeholder={typeof task.description === 'string' ? '' : 'Task description'}
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onFocus={() => setIsEditing(true)}
        className={`my-6 block w-full resize-none rounded-md ${
          isEditing ? 'border border-gray-400' : 'border-0'
        } py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0`}
      ></textarea>

      {isEditing && (
        <div className="mb-8 flex justify-end gap-4">
          <Button color="white" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={saveTaskHandler}>Save</Button>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-start">
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
    </form>
  );
}
