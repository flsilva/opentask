'use client';

import 'client-only';
import { usePathname } from 'next/navigation';
import { CalendarTodayIcon } from '@/modules/shared/icons/CalendarTodayIcon';
import { PlusSignalIcon } from '@/modules/shared/icons/PlusSignalIcon';
import { ProjectsIcon } from '@/modules/shared/icons/ProjectsIcon';
import { ProjectDto } from '@/modules/app/projects/ProjectRepository';

interface MainMenuUIProps {
  readonly onNewProjectClick: () => void;
  readonly onProjectItemClick: (project: ProjectDto) => void;
  readonly onProjectsItemClick: () => void;
  readonly onTodayItemClick: () => void;
  readonly projects: Array<ProjectDto>;
}

export const MainMenuUI = ({
  onNewProjectClick,
  onProjectItemClick,
  onProjectsItemClick,
  onTodayItemClick,
  projects,
}: MainMenuUIProps) => {
  const pathname = usePathname();
  const activeClassName = 'bg-gray-200';
  const isActive = (item: string) => pathname.lastIndexOf(item) !== -1;
  /*
  const isActive = (item: string) => {
    console.log('isActive() - item: ', item);
    console.log('isActive() - pathname: ', pathname);
    console.log(
      'isActive() - pathname.lastIndexOf("projects/"): ',
      pathname.lastIndexOf('projects/'),
    );
    if (item === 'projects') return pathname.lastIndexOf('projects/') === -1;

    return pathname.lastIndexOf(item) !== -1;
  };
  */

  return (
    <nav className="flex flex-col h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-4 py-4 lg:w-80">
      <button
        type="button"
        className={`flex rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 ${
          isActive('today') ? activeClassName : ''
        }`}
        onClick={onTodayItemClick}
      >
        <CalendarTodayIcon className="fill-gray-600" />
        <div className="ml-2 flex grow items-center">Today</div>
      </button>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className={`flex grow rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 ${
            isActive('projects/active') || isActive('projects/archived') ? activeClassName : ''
          }`}
          onClick={onProjectsItemClick}
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
      <nav className="flex flex-col">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`flex grow items-center rounded-none lg:rounded-md py-2.5 pl-9 text-base lg:text-sm text-gray-600 hover:bg-gray-200 border-b lg:border-b-0 ${
                isActive(`projects/${project.id}`) ? activeClassName : ''
              }`}
              onClick={() => onProjectItemClick(project)}
            >
              <p>{project.name}</p>
            </button>
          ))}

        {(!projects || projects.length === 0) && (
          <p className="mt-4 text-sm font-medium text-gray-600">No projects</p>
        )}
      </nav>
    </nav>
  );
};
