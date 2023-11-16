import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

const ProjectSkeleton = ({ className }: ClassNamePropsOptional) => {
  return <div className={twMerge('h-4 bg-gray-400 rounded-full w-full', className)}></div>;
};

export const ProjectListSkeleton = ({ className }: ClassNamePropsOptional) => {
  return (
    <div role="status" className={twMerge('animate-pulse', className)}>
      <ProjectSkeleton className="mb-4"></ProjectSkeleton>
      <ProjectSkeleton className="mb-4"></ProjectSkeleton>
      <ProjectSkeleton className="mb-4"></ProjectSkeleton>
      <ProjectSkeleton className="mb-4"></ProjectSkeleton>
      <ProjectSkeleton className="mb-4"></ProjectSkeleton>
      <ProjectSkeleton className="mb-4"></ProjectSkeleton>
      <span className="sr-only">Loading projects...</span>
    </div>
  );
};
