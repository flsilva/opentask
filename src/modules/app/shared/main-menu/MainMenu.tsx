import { Suspense } from 'react';
import Link from 'next/link';
import { PlusSignalIcon } from '@/modules/shared/icons/PlusSignalIcon';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectListSkeleton } from '@/modules/app/projects/ProjectListSkeleton';
import { ProjectStatus } from '@/modules/app/projects/ProjectStatus';
import { MainMenuItem } from './MainMenuItem';

export const MainMenu = () => {
  const activeClassName = 'bg-gray-200';
  const noProjects = <p className="pl-9 pt-4 text-sm font-medium text-gray-600">No projects</p>;

  return (
    <nav className="flex flex-col h-full w-full lg:w-80 overflow-y-auto overflow-x-hidden bg-gray-50 px-4 py-4">
      <MainMenuItem
        activeClassName={activeClassName}
        href="/app/today"
        icon="CalendarTodayIcon"
        label="Today"
      />
      <div className="mt-4 flex justify-between">
        <MainMenuItem
          activeClassName={activeClassName}
          className="grow"
          href="/app/projects/active"
          icon="ProjectsIcon"
          label="Projects"
        />
        <Link href="/app/projects/new" className="rounded-md p-2 text-gray-700 hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <PlusSignalIcon className="fill-gray-600" />
        </Link>
      </div>
      <Suspense
        fallback={
          <ProjectListSkeleton className="mt-3 pl-9 max-w-[95%]" ssrOnly="Loading projects..." />
        }
      >
        <ProjectList
          activeItemClassName={activeClassName}
          empty={noProjects}
          itemClassName="pl-9"
          only={ProjectStatus.Active}
        />
      </Suspense>
    </nav>
  );
};
