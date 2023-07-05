import { ChildrenProps } from './ChildrenProps';
import { ClassNamePropsOptional } from './ClassNameProps';

export default function HeroCopy({ children, className }: ChildrenProps & ClassNamePropsOptional) {
  return <p className={`mt-6 text-xl leading-8 text-gray-500 ${className}`}>{children}</p>;
}
