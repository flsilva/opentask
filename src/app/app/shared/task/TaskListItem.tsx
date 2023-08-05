import { CheckIcon } from '@/app/shared/ui/icon/CheckIcon';
import { sanitize } from 'isomorphic-dompurify';
import TaskCheck, { TaskCheckSize } from './TaskCheck';

interface TaskListItemProps {
  readonly description: string;
  readonly isCompleted: boolean | undefined;
  readonly name: string;
  readonly onCompleteTaskClick: () => void;
  readonly onTaskClick: () => void;
}

export default function TaskListItem({
  description,
  isCompleted,
  name,
  onCompleteTaskClick,
  onTaskClick,
}: TaskListItemProps) {
  return (
    <div className="flex">
      <TaskCheck
        className="mt-0.25"
        isCompleted={isCompleted}
        onTaskCheckClick={onCompleteTaskClick}
        size={TaskCheckSize.Medium}
      />
      <button type="button" className="cursor flex text-left" onClick={onTaskClick}>
        <div className="ml-3 block">
          <p className={`text-sm text-gray-800 ${isCompleted ? 'line-through' : ''}`}>{name}</p>
          <div
            className="mt-1 block w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400 md:w-[26rem] lg:w-[40rem]"
            dangerouslySetInnerHTML={{ __html: sanitize(description) }}
          />
        </div>
      </button>
    </div>
  );
}
