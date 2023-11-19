import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { SkeletonLine } from '@/modules/shared/skeleton/SkeletonLine';

export interface ProjectFormSkeletonProps extends ClassNamePropsOptional {
  readonly ssrOnly?: string;
}

export const ProjectFormSkeleton = ({ className, ssrOnly }: ProjectFormSkeletonProps) => {
  return (
    <div role="status" className={twMerge('animate-pulse', className)}>
      <SkeletonLine className="mb-8"></SkeletonLine>
      <SkeletonLine className="mb-4"></SkeletonLine>
      <SkeletonLine className="mb-4"></SkeletonLine>
      {ssrOnly && <span className="sr-only">{ssrOnly}</span>}
    </div>
  );
};
