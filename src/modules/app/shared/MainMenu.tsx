'use client';

import 'client-only';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarTodayIcon } from '@/modules/shared/icons/CalendarTodayIcon';
import { PlusSignalIcon } from '@/modules/shared/icons/PlusSignalIcon';
import { ProjectsIcon } from '@/modules/shared/icons/ProjectsIcon';
import { Modal } from '@/modules/shared/modals/Modal';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectDto } from '@/modules/app/projects/ProjectsRepository';

interface MainMenuProps {
  readonly projects: Array<ProjectDto>;
  readonly renderOnModal?: boolean;
}

export const MainMenu = ({ projects, renderOnModal }: MainMenuProps) => {
  const pathname = usePathname();
  const activeClassName = 'bg-gray-200';
  const isActive = (item: string) => pathname.lastIndexOf(item) !== -1;

  const menu = (
    <nav className="flex flex-col h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-4 py-4 lg:w-80">
      <Link
        href="/app/today"
        className={`flex rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 ${
          isActive('today') ? activeClassName : ''
        }`}
      >
        <CalendarTodayIcon className="fill-gray-600" />
        <div className="ml-2 flex grow items-center">Today</div>
      </Link>
      <div className="mt-4 flex justify-between">
        <Link
          href="/app/projects/active"
          className={`flex grow rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 ${
            isActive('projects/active') || isActive('projects/archived') ? activeClassName : ''
          }`}
        >
          <ProjectsIcon className="fill-gray-600" />
          <div className="ml-2 flex grow items-center justify-between">Projects</div>
        </Link>
        <Link href="/app/projects/new" className="rounded-md p-2 text-gray-700 hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <PlusSignalIcon className="fill-gray-600" />
        </Link>
      </div>
      {projects && projects.length > 0 && (
        <ProjectList
          classNameItem="pl-9"
          getClassNameItem={(project) =>
            isActive(`projects/${project.id}`) ? activeClassName : ''
          }
          projects={projects}
        />
      )}
      {(!projects || projects.length === 0) && (
        <p className="mt-4 text-sm font-medium text-gray-600">No projects</p>
      )}
    </nav>
  );

  if (renderOnModal) {
    return (
      <Modal appear onClose={() => null} show>
        {menu}
      </Modal>
    );
  }

  return menu;
};
