'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { updateTask, TaskDto } from './TasksRepository';
import { TaskListUI } from './TaskListUI';

interface TaskListApplicationProps {
  readonly addTask?: React.ReactNode;
  readonly tasks: Array<TaskDto>;
}

export const TaskListApplication = ({ addTask, tasks }: TaskListApplicationProps) => {
  const router = useRouter();
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const uncompletedTasks = tasks.filter((task) => !task.isCompleted);

  const onCompleteTaskClick = async (task: TaskDto) => {
    await updateTask({ id: task.id, isCompleted: true });
    router.refresh();
  };

  const onUncompleteTaskClick = async (task: TaskDto) => {
    await updateTask({ id: task.id, isCompleted: false });
    router.refresh();
  };

  const onTaskClick = (task: TaskDto) => {
    router.push(`/app/tasks/${task.id}`);
  };

  return (
    <div className="flex flex-col">
      {uncompletedTasks.length > 0 && (
        <div className="flex flex-col pb-8">
          <TaskListUI
            onCompleteTaskClick={onCompleteTaskClick}
            onTaskClick={onTaskClick}
            tasks={uncompletedTasks}
          />
        </div>
      )}
      {addTask}
      {completedTasks.length > 0 && (
        <div className="flex flex-col py-8">
          <TaskListUI
            onCompleteTaskClick={onUncompleteTaskClick}
            onTaskClick={onTaskClick}
            tasks={completedTasks}
          />
        </div>
      )}
    </div>
  );
};
