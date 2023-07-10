import { TaskData } from './TaskData';

interface TaskListItemProps {
  readonly onTaskClick: (task: TaskData) => void;
  readonly task: TaskData;
}

export default function TaskListItem({ onTaskClick, task }: TaskListItemProps) {
  return (
    <button type="button" className="cursor flex text-left" onClick={() => onTaskClick(task)}>
      <div className="mt-0.25 h-5 w-5 shrink-0 rounded-full border border-gray-500"></div>
      <div className="ml-3 block">
        <p className="text-sm text-gray-800">{task.name}</p>
        <p className="mt-1 block w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400 md:w-[26rem] lg:w-[40rem]">
          {task.description}
        </p>
      </div>
    </button>
  );
}
