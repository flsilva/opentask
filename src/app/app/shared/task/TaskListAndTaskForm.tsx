'use client';

import 'client-only';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/shared/ui/button/Button';
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
    router.push(`${project.id}/task/${task.id}`);
  };

  return (
    <>
      <TaskList onTaskClick={taskClickHandler} tasks={tasks} />
      {!isAddingTask && (
        <Button onClick={newTaskHandler} className="mt-6 flex-row self-start">
          Add task
        </Button>
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
