'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { Switch } from '@/modules/shared/controls/switch/Switch';

interface ProjectsPageHeaderUIProps {
  readonly archived?: boolean;
  readonly onSwitchClick: (enabled: boolean) => void;
}

export const ProjectsPageHeaderUI = ({
  archived = false,
  onSwitchClick,
}: ProjectsPageHeaderUIProps) => {
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
