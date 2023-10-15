'use client';

import 'client-only';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarTodayIcon } from '@/modules/shared/icon/CalendarTodayIcon';
import { PlusSignalIcon } from '@/modules/shared/icon/PlusSignalIcon';
import { ProjectsIcon } from '@/modules/shared/icon/ProjectsIcon';
import { ProjectDto } from '@/modules/app/project/ProjectRepository';
import ProjectModalApplication from '../project/ProjectModalApplication';

interface AppNavProps {
  readonly projects: Array<ProjectDto>;
}

export const AppNav = ({ projects }: AppNavProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isShowingProjectModal, setIsShowingProjectModal] = useState(false);

  const activeClassName = 'bg-gray-200';

  const isActive = (item: string) => pathname.lastIndexOf(item) !== -1;

  const onCloseProjectModal = () => {
    setIsShowingProjectModal(false);
  };

  const onTodayClick = () => {
    router.push('/app/today');
  };

  const onProjectsClick = () => {
    router.push('/app/projects/active');
  };

  const onProjectClick = (project: ProjectDto) => {
    router.push(`/app/project/${project.id}`);
  };

  return (
    <nav className="flex flex-col h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-4 py-4 lg:w-80">
      <button
        type="button"
        className={`flex rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 ${
          isActive('today') ? activeClassName : ''
        }`}
        onClick={onTodayClick}
      >
        <CalendarTodayIcon className="fill-gray-600" />
        <div className="ml-2 flex grow items-center">Today</div>
      </button>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className={`flex grow rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 ${
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
          onClick={() => setIsShowingProjectModal(true)}
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
                isActive(`project/${project.id}`) ? activeClassName : ''
              }`}
              onClick={() => onProjectClick(project)}
            >
              <p>{project.name}</p>
            </button>
          ))}

        {(!projects || projects.length === 0) && (
          <p className="mt-4 text-sm font-medium text-gray-600">No projects</p>
        )}
      </nav>
      <ProjectModalApplication open={isShowingProjectModal} onCloseHandler={onCloseProjectModal} />
    </nav>
  );
};
