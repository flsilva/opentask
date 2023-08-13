'use client';

import 'client-only';
import { usePathname, useRouter } from 'next/navigation';
import { TaskData } from '../task/TaskData';
import TaskList from '../task/TaskList';
import { updateTaskComplete } from '../task/task-model';
import { ProjectData } from '../project/ProjectData';

interface TodayPageTaskListProps {
  readonly project?: ProjectData | null;
  readonly tasks: Array<TaskData>;
}

export const TaskListController = ({ project, tasks }: TodayPageTaskListProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const notCompletedTasks = tasks.filter((task) => !task.isCompleted);

  const onCompleteTaskClick = async (task: TaskData) => {
    await updateTaskComplete(task.id, true);
    router.refresh();
  };

  const onUncompleteTaskClick = async (task: TaskData) => {
    await updateTaskComplete(task.id, false);
    router.refresh();
  };

  const onTaskClick = (task: TaskData) => {
    if (pathname.indexOf('today') !== -1 || !project) {
      router.push(`/app/today/task/${task.id}`);
    } else {
      router.push(`/app/project/${project.id}/task/${task.id}`);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-8">
        <TaskList
          onCompleteTaskClick={onCompleteTaskClick}
          onTaskClick={onTaskClick}
          tasks={notCompletedTasks}
        />
      </div>
      <div className="flex flex-col">
        <TaskList
          onCompleteTaskClick={onUncompleteTaskClick}
          onTaskClick={onTaskClick}
          tasks={completedTasks}
        />
      </div>
    </div>
  );
};
