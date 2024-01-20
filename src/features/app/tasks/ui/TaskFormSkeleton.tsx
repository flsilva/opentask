import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { SkeletonLine } from '@/features/shared/ui/skeleton/SkeletonLine';

export interface TaskFormSkeletonProps extends ClassNamePropsOptional {
  readonly ssrOnly?: string;
}

export const TaskFormSkeletonSkeleton = ({ className, ssrOnly }: TaskFormSkeletonProps) => {
  return (
    <div role="status" className={twMerge('animate-pulse', className)}>
      <SkeletonLine className="mb-8"></SkeletonLine>
      <SkeletonLine className="mb-4"></SkeletonLine>
      <SkeletonLine className="mb-12"></SkeletonLine>
      <div className="flex max-w-[22rem]">
        <SkeletonLine></SkeletonLine>
        <SkeletonLine className="mb-8 ml-16"></SkeletonLine>
      </div>
      {ssrOnly && <span className="sr-only">{ssrOnly}</span>}
    </div>
  );
};
