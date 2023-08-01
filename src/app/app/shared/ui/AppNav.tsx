'use client';

import 'client-only';
import { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarTodayIcon } from '@/app/shared/ui/icon/CalendarTodayIcon';
import { PlusSignalIcon } from '@/app/shared/ui/icon/PlusSignalIcon';
import { ProjectsIcon } from '@/app/shared/ui/icon/ProjectsIcon';
import { ProjectData } from '../../shared/project/ProjectData';

interface AppNavProps {
  readonly isOpen: boolean | null;
  readonly onNewProjectClick: () => void;
  readonly projects: Array<ProjectData>;
}

export default function AppNav({ isOpen, onNewProjectClick, projects }: AppNavProps) {
  const navClassesCommon =
    'flex flex-col transition-all duration-500 h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-4 py-4 w-80';
  const [navClasses, setNavClasses] = useState(`${navClassesCommon} md:ml-0 -ml-80`);
  const router = useRouter();
  const pathname = usePathname();

  const activeClassName = 'bg-gray-200';

  const isActive = (item: string) => pathname.lastIndexOf(item) !== -1;

  const onTodayClick = () => {
    router.push('/app/today');
  };

  const onProjectsClick = () => {
    router.push('/app/projects/active');
  };

  const onProjectClick = (project: ProjectData) => {
    router.push(`/app/project/${project.id}`);
  };

  useLayoutEffect(() => {
    if (isOpen === null) return;
    let navClasses = navClassesCommon;
    navClasses += isOpen ? ' ml-0' : ' -ml-80';
    setNavClasses(navClasses);
  }, [isOpen]);

  return (
    <nav className={navClasses}>
      <button
        type="button"
        className={`flex rounded-md p-2 text-sm font-medium text-gray-600 hover:bg-gray-200 ${
          isActive('today') ? activeClassName : ''
        }`}
        onClick={onTodayClick}
      >
        <CalendarTodayIcon className="fill-gray-600" />
        <div className="ml-2 flex grow items-center justify-between">
          Today
          <p className="mr-1.5 text-sm font-medium text-gray-400">7</p>
        </div>
      </button>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className={`flex grow rounded-md p-2 text-sm font-medium text-gray-600 hover:bg-gray-200 ${
            isActive('projects') ? activeClassName : ''
          }`}
          onClick={onProjectsClick}
        >
          <ProjectsIcon className="fill-gray-600" />
          <div className="ml-2 flex grow items-center justify-between">Projects</div>
        </button>
        <button
          type="button"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-200"
          onClick={onNewProjectClick}
        >
          <span className="sr-only">Open menu</span>
          <PlusSignalIcon className="fill-gray-600" />
        </button>
      </div>
      <nav className="flex flex-col pl-2">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`flex grow items-center justify-between rounded-md p-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 ${
                isActive(`project/${project.id}`) ? activeClassName : ''
              }`}
              onClick={() => onProjectClick(project)}
            >
              <p>{project.name}</p>
              <p className="mr-1.5 text-sm font-medium text-gray-400">3</p>
            </button>
          ))}

        {(!projects || projects.length === 0) && (
          <p className="mt-4 text-sm font-medium text-gray-600">No projects</p>
        )}
      </nav>
    </nav>
  );
}
