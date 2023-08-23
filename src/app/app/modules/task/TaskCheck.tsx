import { ClassNamePropsOptional } from '@/app/modules/common/ClassNameProps';
import { CheckIcon } from '@/app/modules/common/icon/CheckIcon';

export enum TaskCheckSize {
  Medium = 'Medium',
  Large = 'Large',
}

interface TaskCheckProps extends ClassNamePropsOptional {
  readonly isCompleted: boolean | null | undefined;
  readonly onTaskCheckClick: () => void;
  readonly size: TaskCheckSize;
}

export default function TaskCheck({
  className,
  isCompleted,
  onTaskCheckClick,
  size,
}: TaskCheckProps) {
  return (
    <button
      type="button"
      className="group cursor flex self-start text-left"
      onClick={onTaskCheckClick}
    >
      <div
        className={`shrink-0 rounded-full border border-gray-400 relative ${
          size === TaskCheckSize.Medium ? 'h-5 w-5' : 'h-7 w-7'
        } ${className}`}
      >
        <CheckIcon
          className={`absolute fill-gray-500 ${isCompleted ? '' : 'hidden group-hover:block'} ${
            size === TaskCheckSize.Medium ? 'w-5 h-5' : 'w-7 h-7'
          }`}
        />
      </div>
    </button>
  );
}
