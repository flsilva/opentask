import 'client-only';
import { useLayoutEffect, useState } from 'react';
import { CalendarTodayIcon } from '@/app/shared/ui/icon/CalendarTodayIcon';
import { PlusSignalIcon } from '@/app/shared/ui/icon/PlusSignalIcon';
import { ProjectsIcon } from '@/app/shared/ui/icon/ProjectsIcon';
import { ProjectData } from '../../project/ProjectData';

interface AppNavProps {
  readonly isOpen: boolean | null;
  readonly onNewProjectClick: () => void;
  readonly projects: Array<ProjectData>;
}

export default function AppNav({ isOpen, onNewProjectClick, projects }: AppNavProps) {
  const navClassesCommon =
    'flex flex-col transition-all duration-500 h-full overflow-y-auto overflow-x-hidden bg-gray-50 py-8 px-6 w-[16rem]';
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
        <CalendarTodayIcon className="fill-gray-600" />
        <div className="ml-2 flex grow items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Today</p>
          <p className="mr-1.5 text-sm font-medium text-gray-400">7</p>
        </div>
      </div>
      <div className="mb-4 flex">
        <ProjectsIcon className="fill-gray-600" />
        <div className="ml-2 flex grow items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Projects</p>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onNewProjectClick}
          >
            <span className="sr-only">Open menu</span>
            <PlusSignalIcon className="fill-gray-600" />
          </button>
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
