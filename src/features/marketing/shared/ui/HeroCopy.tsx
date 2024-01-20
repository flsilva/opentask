import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/features/shared/ui/ChildrenProps';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';

export const HeroCopy = ({ children, className }: ChildrenProps & ClassNamePropsOptional) => {
  return <p className={twMerge('mt-6 text-xl leading-8 text-gray-800', className)}>{children}</p>;
};
