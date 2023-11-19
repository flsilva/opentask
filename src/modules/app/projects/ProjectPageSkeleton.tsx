import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { SkeletonLine } from '@/modules/shared/skeleton/SkeletonLine';
import { TaskListSkeleton } from '@/modules/app/tasks/TaskListSkeleton';

export interface ProjectPageSkeletonProps extends ClassNamePropsOptional {
  readonly ssrOnly?: string;
}

export const ProjectPageSkeleton = ({ className, ssrOnly }: ProjectPageSkeletonProps) => {
  return (
    <div role="status" className={twMerge('animate-pulse', className)}>
      <SkeletonLine className="h-6 mb-8"></SkeletonLine>
      <TaskListSkeleton className="mt-4 max-w-[80%]" />
      {ssrOnly && <span className="sr-only">{ssrOnly}</span>}
    </div>
  );
};
