'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { TaskData } from '../task/TaskData';
import TaskList from '../task/TaskList';

interface TodayPageTaskListProps {
  readonly tasks: Array<TaskData>;
}

export const TodayPageTaskList = ({ tasks }: TodayPageTaskListProps) => {
  const router = useRouter();

  const onTaskClick = (task: TaskData) => {
    router.push(`/app/today/task/${task.id}`);
  };

  return <TaskList onTaskClick={onTaskClick} tasks={tasks} />;
};
