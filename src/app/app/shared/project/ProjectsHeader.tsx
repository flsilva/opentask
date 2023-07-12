'use client';

import 'client-only';
import { Switch } from '@/app/shared/ui/switch/Switch';

export default function ProjectsHeader() {
  const onSwitchClick = (enabled: boolean) => {
    console.log('ProjectsHeader().onSwitchClick() - enabled: ', enabled);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">Projects</h1>
        <div className="flex">
          <p className="mr-4 text-gray-800">Active</p>
          <Switch onClick={onSwitchClick} />
        </div>
      </div>
    </div>
  );
}
