import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

export const SkeletonLine = ({ className }: ClassNamePropsOptional) => {
  return <div className={twMerge('h-4 bg-gray-400 rounded-full w-full', className)} />;
};
