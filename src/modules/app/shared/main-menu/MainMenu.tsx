import { Suspense } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { PlusSignalIcon } from '@/modules/shared/icon/PlusSignalIcon';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectListSkeleton } from '@/modules/app/projects/ProjectListSkeleton';
import { ProjectStatus } from '@/modules/app/projects/ProjectStatus';
import { MainMenuLink } from './MainMenuLink';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { CalendarTodayIcon } from '@/modules/shared/icon/CalendarTodayIcon';
import { ProjectsIcon } from '@/modules/shared/icon/ProjectsIcon';

export const MainMenu = ({ className }: ClassNamePropsOptional) => {
  const activeClassName = 'bg-gray-200';
  const noProjects = <p className="pl-9 pt-4 text-sm font-medium text-gray-600">No projects</p>;

  return (
    <nav
      className={twMerge(
        'flex flex-col h-full w-full overflow-y-auto overflow-x-hidden',
        'lg:w-80 px-4 py-4 bg-gray-50 rounded-lg lg:rounded-none',
        'focus:outline-0 focus:ring-0 focus:outline-transparent focus:shadow-none',
        className,
      )}
    >
      <MainMenuLink activeClassName={activeClassName} href="/app/today">
        <CalendarTodayIcon className="fill-gray-600" />
        Today
      </MainMenuLink>
      <div className="flex justify-between mt-4">
        <MainMenuLink
          activeClassName={activeClassName}
          className="grow"
          href="/app/projects/active"
        >
          <ProjectsIcon className="fill-gray-600" />
          Projects
        </MainMenuLink>
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
