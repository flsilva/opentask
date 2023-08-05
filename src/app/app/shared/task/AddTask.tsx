'use client';

import 'client-only';
import { useState } from 'react';
import { buttonClassNameGreen } from '@/app/shared/ui//button/buttonClassName';
import { ProjectData } from '../project/ProjectData';
import TaskForm from './TaskForm';

interface AddTaskProps {
  readonly defaultDueDate?: Date | null;
  readonly project: ProjectData | null;
  readonly projects: Array<ProjectData>;
}

export default function AddTask({ defaultDueDate, project, projects }: AddTaskProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  if (!project)
    throw new Error(
      `AddTask() - Object "project" must not be null nor undefined. Received: ${project}`,
    );

  return (
    <>
      {!isAddingTask && (
        <button
          onClick={addTaskHandler}
          className={`${buttonClassNameGreen} mt-6 flex-row self-start`}
        >
          Add task
        </button>
      )}
      {isAddingTask && (
        <TaskForm
          className="rounded-md bg-gray-100 px-2 py-6 sm:px-6"
          defaultDueDate={defaultDueDate}
          onCancelClick={cancelNewTaskHandler}
          project={project}
          projects={projects}
          shouldStartEditingNameOrDescription
        />
      )}
    </>
  );
}
