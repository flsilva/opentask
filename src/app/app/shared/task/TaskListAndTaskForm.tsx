'use client';

import 'client-only';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { buttonClassNameGreen } from '@/app/shared/ui//button/buttonClassName';
import { ProjectData } from '../project/ProjectData';
import { TaskData } from './TaskData';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

interface TaskListAndNewTaskProps {
  readonly project: ProjectData;
  readonly projects: Array<ProjectData>;
  readonly tasks: Array<TaskData>;
}

export default function TaskListAndTaskForm({ project, projects, tasks }: TaskListAndNewTaskProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const newTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  const saveNewTaskHandler = () => {
    console.log('TaskListAndNewTask().saveNewTaskHandler()');
  };

  const taskClickHandler = (task: TaskData) => {
    console.log('TaskListAndNewTask().taskClickHandler() - task: ', task);
    console.log('TaskListAndNewTask().taskClickHandler() - pathname: ', pathname);
    const navToPath = pathname.indexOf('today') !== -1 ? 'today' : `${project.id}`;
    router.push(`${navToPath}/task/${task.id}`);
  };

  return (
    <>
      <TaskList onTaskClick={taskClickHandler} tasks={tasks} />
      {!isAddingTask && (
        <button
          onClick={newTaskHandler}
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
