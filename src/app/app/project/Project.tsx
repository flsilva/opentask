'use client';

import 'client-only';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontalSvg } from '@/shared/ui/MoreHorizontalSvg';
import TaskList from './task/TaskList';
import { ProjectData } from './ProjectData';
import { TaskData } from './task/TaskData';
import Button from '@/app/(marketing)/ui/Button';
import NewTask from './task/NewTask';

interface ProjectProps {
  readonly project: ProjectData;
  readonly tasks: Array<TaskData>;
}

export default function Project({ project, tasks }: ProjectProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const router = useRouter();

  const newTaskHandler = () => {
    setIsAddingTask(true);
  };

  const cancelNewTaskHandler = () => {
    setIsAddingTask(false);
  };

  const saveNewTaskHandler = () => {
    console.log('Project().saveNewTaskHandler()');
  };

  const taskClickHandler = (task: TaskData) => {
    console.log('Project().taskClickHandler() - task: ', task);
    router.push(`${project.id}/task/${task.id}`);
  };

  return (
    <div className="flex flex-col pb-8">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <MoreHorizontalSvg />
      </div>
      <p className="mb-8 block text-sm">{project.description}</p>
      <TaskList onTaskClick={taskClickHandler} tasks={tasks} />
      {!isAddingTask && (
        <Button onClick={newTaskHandler} className="mb-44 mt-4 flex-row self-start">
          Add task
        </Button>
      )}
      {isAddingTask && (
        <NewTask onCancelClick={cancelNewTaskHandler} onSaveClick={saveNewTaskHandler} />
      )}
    </div>
  );
}
