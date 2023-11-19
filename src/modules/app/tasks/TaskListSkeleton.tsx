import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { SkeletonLine } from '@/modules/shared/skeleton/SkeletonLine';

export interface TaskListSkeletonProps extends ClassNamePropsOptional {
  readonly ssrOnly?: string;
}

const TaskSkeleton = ({ className }: ClassNamePropsOptional) => {
  return (
    <div {...(className && { className })}>
      <SkeletonLine className="mb-2" />
      <SkeletonLine className="h-3  max-w-[80%] mb-2" />
      <SkeletonLine className="h-3  max-w-[80%] mb-2" />
    </div>
  );
};

export const TaskListSkeleton = ({ className, ssrOnly }: TaskListSkeletonProps) => {
  return (
    <div role="status" className={twMerge('animate-pulse w-full', className)}>
      <TaskSkeleton className="mb-10" />
      <TaskSkeleton className="mb-10" />
      <TaskSkeleton className="mb-10" />
      <TaskSkeleton className="mb-10" />
      {ssrOnly && <span className="sr-only">{ssrOnly}</span>}
    </div>
  );
};
