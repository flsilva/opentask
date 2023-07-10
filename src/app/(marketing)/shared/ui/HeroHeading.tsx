import { ChildrenProps } from '@/app/shared/ui/ChildrenProps';

export default function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-tight">
      {children}
    </h1>
  );
}
