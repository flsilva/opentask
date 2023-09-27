'use client';

import 'client-only';
import { usePathname, useRouter } from 'next/navigation';
import { ProjectDto } from '@/modules/app/project/ProjectDomain';
import { updateTask } from './TaskRepository';
import { TaskDto } from './TaskDomain';
import TaskList from './TaskList';

interface TodayPageTaskListProps {
  readonly addTask?: React.ReactNode;
  readonly project?: ProjectDto | null;
  readonly tasks: Array<TaskDto>;
}

export const TaskListApplication = ({ addTask, project, tasks }: TodayPageTaskListProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
