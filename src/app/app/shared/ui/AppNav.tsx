import 'client-only';
import { useLayoutEffect, useState } from 'react';
import { CalendarTodaySvg } from '@/shared/ui/CalendarTodaySvg';
import { PlusSignalSvg } from '@/shared/ui/PlusSignalSvg';
import { ProjectsSvg } from '@/shared/ui/ProjectsSvg';
import { ProjectData } from '../../project/ProjectData';

interface AppNavProps {
  readonly isOpen: boolean | null;
  readonly projects: Array<ProjectData>;
}

export default function AppNav({ isOpen, projects }: AppNavProps) {
  const [navClasses, setNavClasses] = useState(
    'h-full w-0 overflow-y-auto overflow-x-hidden bg-gray-50 py-8 md:w-full md:min-w-[16rem] md:max-w-[16rem] md:px-6',
  );

  useLayoutEffect(() => {
    if (isOpen === null) return;
    let navClasses = 'h-full overflow-y-auto overflow-x-hidden bg-gray-50';
    navClasses += isOpen
      ? ' py-8 w-full min-w-[16rem] max-w-[16rem] px-6'
      : ' !w-0 !min-w-0 !max-w-0 !px-0';
    setNavClasses(navClasses);
  }, [isOpen]);

  return (
    <nav className={navClasses}>
      <div className="mb-6 flex">
        <CalendarTodaySvg className="fill-gray-600" />
        <div className="ml-2 flex grow items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Today</p>
          <p className="mr-1.5 text-sm font-medium text-gray-400">7</p>
        </div>
      </div>
      <div className="mb-4 flex">
        <ProjectsSvg className="fill-gray-600" />
        <div className="ml-2 flex grow items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Projects</p>
          <PlusSignalSvg className="fill-gray-600" />
        </div>
      </div>
      <nav className="pl-2">
        {projects.map((item) => (
          <div key={item.id} className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-800">{item.name}</p>
            <p className="mr-1.5 text-sm font-medium text-gray-400">3</p>
          </div>
        ))}
      </nav>
    </nav>
  );
}
