'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectData } from './ProjectData';
import { TaskData } from '../task/TaskData';
import TaskList from '../task/TaskList';

interface ProjectPageTaskListProps {
  readonly project: ProjectData | null;
  readonly tasks: Array<TaskData>;
}

export const ProjectPageTaskList = ({ project, tasks }: ProjectPageTaskListProps) => {
  const router = useRouter();

  const onTaskClick = (task: TaskData) => {
    if (!project) throw new Error('Property project must not be null.');
    router.push(`${project.id}/task/${task.id}`);
  };

  return <TaskList onTaskClick={onTaskClick} tasks={tasks} />;
};
