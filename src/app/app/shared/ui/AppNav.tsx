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
  const navClassesCommon =
    'flex flex-col transition-all duration-1000 h-full overflow-y-auto overflow-x-hidden bg-gray-50 py-8 px-6 w-[16rem]';
  const [navClasses, setNavClasses] = useState(`${navClassesCommon} md:ml-0 -ml-[16rem]`);

  useLayoutEffect(() => {
    if (isOpen === null) return;
    let navClasses = navClassesCommon;
    /*
    navClasses += isOpen
      ? ' py-8 w-full min-w-[16rem] max-w-[16rem] px-6'
      : ' !w-0 !min-w-0 !max-w-0 !px-0';
      */
    navClasses += isOpen ? ' ml-0' : ' -ml-[16rem]';
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
