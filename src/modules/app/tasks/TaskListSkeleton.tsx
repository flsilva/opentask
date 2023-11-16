import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

const TaskSkeleton = ({ className }: ClassNamePropsOptional) => {
  return (
    <div {...(className && { className })}>
      <div className="h-4 bg-gray-400 rounded-full w-full mb-2"></div>
      <div className="h-3 bg-gray-400 rounded-full max-w-[80%] mb-2"></div>
      <div className="h-3 bg-gray-400 rounded-full max-w-[80%] mb-2"></div>
    </div>
  );
};

export const TaskListSkeleton = ({ className }: ClassNamePropsOptional) => {
  return (
    <div role="status" className={twMerge('animate-pulse w-full', className)}>
      <TaskSkeleton className="mb-10" />
      <TaskSkeleton className="mb-10" />
      <TaskSkeleton className="mb-10" />
      <TaskSkeleton className="mb-10" />
      <span className="sr-only">Loading tasks...</span>
    </div>
  );
};
