'use client';

import 'client-only';
import { useState } from 'react';
import { MoreHorizontalSvg } from '@/shared/ui/MoreHorizontalSvg';
import TaskList from './task/TaskList';
import { ProjectData } from './ProjectData';
import { TaskData } from './task/TaskData';
import Button from '@/app/(marketing)/ui/Button';

interface ProjectProps {
  readonly project: ProjectData;
  readonly tasks: Array<TaskData>;
}

interface NewTaskProps {
  readonly onCancelClick: () => void;
  readonly onSaveClick: () => void;
}

const NewTask = ({ onCancelClick, onSaveClick }: NewTaskProps) => (
  <form className="rounded-md bg-gray-100 p-6">
    <input
      name="name"
      type="text"
      placeholder="Task name"
      className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
      required
    />
    <textarea
      name="description"
      placeholder="Task description"
      rows={2}
      className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
    ></textarea>
    <div className="flex justify-end gap-4">
      <Button color="white" onClick={onCancelClick}>
        Cancel
      </Button>
      <Button onClick={onSaveClick}>Add task</Button>
    </div>
  </form>
);

export default function Project({ project, tasks }: ProjectProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const newTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  const saveNewTaskHandler = () => {
    console.log('Project().saveNewTaskHandler()');
  };

  return (
    <div className="flex flex-col pb-20">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <MoreHorizontalSvg />
      </div>
      <p className="mb-8 block text-sm">{project.description}</p>
      <TaskList tasks={tasks} />
      {!isAddingTask && (
        <Button onClick={newTaskHandler} className="mb-56 mt-4 flex-row self-start">
          Add task
        </Button>
      )}
      {isAddingTask && (
        <NewTask onCancelClick={cancelNewTaskHandler} onSaveClick={saveNewTaskHandler} />
      )}
    </div>
  );
}
