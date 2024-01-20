import Link from 'next/link';
import { sanitize } from 'isomorphic-dompurify';
import { utcToZonedTime } from 'date-fns-tz';
import { CalendarEventIcon } from '@/features/shared/ui/icon/CalendarEventIcon';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { TaskCheck } from './TaskCheck';
import { TaskCheckSize } from './TaskCheckSize';
import { twJoin, twMerge } from 'tailwind-merge';
import { formatTaskDueDate } from './formatTaskDueDate';

export interface TaskListItemProps extends ClassNamePropsOptional {
  readonly completedAt: Date | null | undefined;
  readonly description: string;
  readonly dueDate: Date | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly timeZone: string;
}

export const TaskListItem = ({
  className,
  completedAt,
  description,
  dueDate,
  id,
  name,
  timeZone,
}: TaskListItemProps) => {
  return (
    <div
      className={twMerge(
        'flex grow py-4 border-y border-transparent hover:border-gray-100',
        className,
      )}
    >
      <TaskCheck
        className="mt-0.25"
        completedAt={completedAt}
        size={TaskCheckSize.Medium}
        taskId={id}
      />
      <Link href={`/app/tasks/${id}`} className="flex grow text-left cursor">
        <div className="ml-3 block">
          <div
            className={twJoin('text-sm text-gray-800', completedAt && 'line-through')}
            dangerouslySetInnerHTML={{ __html: sanitize(name) }}
          />
          {description && (
            <div
              className="mt-2 block w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400 md:w-[26rem] lg:w-[40rem]"
              dangerouslySetInnerHTML={{ __html: sanitize(description) }}
            />
          )}
          {dueDate && (
            <div className="flex mt-2">
              <CalendarEventIcon className="fill-gray-400" width="0.875rem" height="0.875rem" />
              <p className="text-xs text-gray-400 ml-1">
                {formatTaskDueDate(
                  utcToZonedTime(dueDate, timeZone),
                  utcToZonedTime(new Date(), timeZone),
                )}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
