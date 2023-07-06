import 'server-only';
import { MoreHorizontalSvg } from '@/shared/ui/MoreHorizontalSvg';
import TaskList from './task/TaskList';
import { ProjectData } from './ProjectData';
import { TaskData } from './task/TaskData';

interface ProjectProps {
  readonly project: ProjectData;
  readonly tasks: Array<TaskData>;
}

export default function Project({ project, tasks }: ProjectProps) {
  return (
    <>
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <MoreHorizontalSvg />
      </div>
      <p className="mb-8 block text-sm">{project.description}</p>
      <TaskList tasks={tasks} />
    </>
  );
}
