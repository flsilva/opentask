'use client';

import 'client-only';
import { useState } from 'react';
import { buttonClassNameGreen } from '@/app/shared/ui//button/buttonClassName';
import { ProjectData } from '../project/ProjectData';
import TaskForm from './TaskForm';

interface AddTaskProps {
  readonly project?: ProjectData;
  readonly projects: Array<ProjectData>;
}

export default function AddTask({ project, projects }: AddTaskProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  const saveNewTaskHandler = () => {
    console.log('TaskListAndNewTask().saveNewTaskHandler()');
  };

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
          onCancelClick={cancelNewTaskHandler}
          onSaveClick={saveNewTaskHandler}
          project={project}
          projects={projects}
          shouldStartAtEditingMode
        />
      )}
    </>
  );
}
