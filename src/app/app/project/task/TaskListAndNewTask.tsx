'use client';

import 'client-only';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskList from './TaskList';
import { ProjectData } from '../ProjectData';
import { TaskData } from './TaskData';
import Button from '@/app/(marketing)/ui/Button';
import NewTask from './NewTask';

interface TaskListAndNewTaskProps {
  readonly project: ProjectData;
  readonly tasks: Array<TaskData>;
}

export default function TaskListAndNewTask({ project, tasks }: TaskListAndNewTaskProps) {
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
    <>
      <TaskList onTaskClick={taskClickHandler} tasks={tasks} />
      {!isAddingTask && (
        <Button onClick={newTaskHandler} className="mt-6 flex-row self-start">
          Add task
        </Button>
      )}
      {isAddingTask && (
        <NewTask onCancelClick={cancelNewTaskHandler} onSaveClick={saveNewTaskHandler} />
      )}
    </>
  );
}
