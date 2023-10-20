import { sanitize } from 'isomorphic-dompurify';
import { TaskCheck, TaskCheckSize } from './TaskCheck';
import { formatTaskDueDate } from './task-utils';
import { CalendarEventIcon } from '@/modules/shared/icons/CalendarEventIcon';

interface TaskListItemUIProps {
  readonly description: string;
  readonly dueDate: Date | null | undefined;
  readonly isCompleted: boolean | undefined;
  readonly name: string;
  readonly onCompleteTaskClick: () => void;
  readonly onTaskClick: () => void;
}

export const TaskListItemUI = ({
  description,
  dueDate,
  isCompleted,
  name,
  onCompleteTaskClick,
  onTaskClick,
}: TaskListItemUIProps) => {
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
          {description && (
            <div
              className="mt-2 block w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400 md:w-[26rem] lg:w-[40rem]"
              dangerouslySetInnerHTML={{ __html: sanitize(description) }}
            />
          )}
          {dueDate && (
            <div className="flex mt-2">
              <CalendarEventIcon className="fill-gray-400" width="0.875rem" height="0.875rem" />
              <p className="text-xs text-gray-400 ml-1">{formatTaskDueDate(dueDate)}</p>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};
