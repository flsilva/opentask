'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { Switch } from '@/features/shared/ui/control/switch/Switch';

interface ProjectsPageHeaderProps {
  readonly archived?: boolean;
}

export const ProjectsPageHeader = ({ archived = false }: ProjectsPageHeaderProps) => {
  const router = useRouter();

  const onSwitchClick = (enabled: boolean) => {
    const path = enabled ? 'archived' : 'active';
    router.push(path);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">Projects</h1>
        <div className="flex">
          <p className="mr-4 text-gray-800">Archived</p>
          <Switch enabled={archived} onClick={onSwitchClick} />
        </div>
      </div>
    </div>
  );
};
