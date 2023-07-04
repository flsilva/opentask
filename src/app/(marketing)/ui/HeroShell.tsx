import { ChildrenProps } from './ChildrenProps';

export default function HeroShell({ children }: ChildrenProps) {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}
