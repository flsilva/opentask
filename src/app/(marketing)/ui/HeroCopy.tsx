import { ChildrenProps } from './ChildrenProps';
import { ClassNameProps } from './ClassNameProps';

export default function HeroCopy({ children, className }: ChildrenProps & ClassNameProps) {
  return <p className={`mt-6 text-xl leading-8 text-gray-500 ${className}`}>{children}</p>;
}
