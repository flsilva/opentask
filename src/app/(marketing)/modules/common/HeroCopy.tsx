import { ChildrenProps } from '@/app/modules/common/ChildrenProps';
import { ClassNamePropsOptional } from '@/app/modules/common/ClassNameProps';

export default function HeroCopy({ children, className }: ChildrenProps & ClassNamePropsOptional) {
  return <p className={`mt-6 text-xl leading-8 text-gray-800 ${className}`}>{children}</p>;
}
