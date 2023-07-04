import { ChildrenProps } from './ChildrenProps';

export default function HeroCopy({ children }: ChildrenProps) {
  return <p className="mt-6 text-xl leading-8 text-gray-500">{children}</p>;
}
