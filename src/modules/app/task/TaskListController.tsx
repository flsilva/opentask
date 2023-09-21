'use client';

import 'client-only';
import { usePathname, useRouter } from 'next/navigation';
import { ProjectDTO } from '@/modules/app/project/project-model-dto';
import { updateTaskComplete } from './task-model-db';
import { TaskDTO } from './task-model-dto';
import TaskList from './TaskList';

interface TodayPageTaskListProps {
  readonly addTask?: React.ReactNode;
  readonly project?: ProjectDTO | null;
  readonly tasks: Array<TaskDTO>;
}

export const TaskListController = ({ addTask, project, tasks }: TodayPageTaskListProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const uncompletedTasks = tasks.filter((task) => !task.isCompleted);

  const onCompleteTaskClick = async (task: TaskDTO) => {
    await updateTaskComplete(task.id, true);
    router.refresh();
  };

  const onUncompleteTaskClick = async (task: TaskDTO) => {
    await updateTaskComplete(task.id, false);
    router.refresh();
  };

  const onTaskClick = (task: TaskDTO) => {
    if (pathname.indexOf('today') !== -1 || !project) {
      router.push(`/app/today/task/${task.id}`);
    } else {
      router.push(`/app/project/${project.id}/task/${task.id}`);
    }
  };

  return (
    <div className="flex flex-col">
      {uncompletedTasks.length > 0 && (
        <div className="flex flex-col pb-8">
          <TaskList
            onCompleteTaskClick={onCompleteTaskClick}
            onTaskClick={onTaskClick}
            tasks={uncompletedTasks}
          />
        </div>
      )}
      {addTask}
      {completedTasks.length > 0 && (
        <div className="flex flex-col py-8">
          <TaskList
            onCompleteTaskClick={onUncompleteTaskClick}
            onTaskClick={onTaskClick}
            tasks={completedTasks}
          />
        </div>
      )}
    </div>
  );
};
