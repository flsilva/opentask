import { ChildrenProps } from '@/app/shared/ui/ChildrenProps';

export default function HeroShell({ children }: ChildrenProps) {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl pt-32 sm:pt-48 lg:pt-56">
        <div className="text-center mb-20">{children}</div>
      </div>
    </div>
  );
}
