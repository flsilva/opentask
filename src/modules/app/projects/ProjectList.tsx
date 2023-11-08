'use client';

import 'client-only';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ProjectDto } from './ProjectsRepository';

interface ProjectListProps extends ClassNamePropsOptional {
  readonly itemClassName?: string;
  readonly getClassNameItem?: (project: ProjectDto) => string;
  readonly noProjectsClassName?: string;
  readonly projects: Array<ProjectDto>;
}

export const ProjectList = ({
  className,
  itemClassName,
  getClassNameItem,
  noProjectsClassName,
  projects,
}: ProjectListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(true), []);

  return (
    <Transition
      show={isOpen}
      as="div"
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-[20px]"
      enterTo="opacity-100 translate-y-0"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-[20px]"
    >
      <nav className={`flex flex-col w-full ${className}`}>
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <Link
              href={`/app/projects/${project.id}`}
              key={project.id}
              className={`flex grow items-center rounded-none lg:rounded-md py-2.5 text-base lg:text-sm text-gray-600 hover:bg-gray-200 border-b lg:border-b-0 ${
                itemClassName ? itemClassName : ''
              } ${getClassNameItem ? getClassNameItem(project) : ''}`}
            >
              <p>{project.name}</p>
            </Link>
          ))}
        {!projects ||
          (projects.length < 1 && (
            <p
              className={`text-sm font-medium text-gray-600 ${
                noProjectsClassName ? noProjectsClassName : ''
              }`}
            >
              No projects.
            </p>
          ))}
      </nav>
    </Transition>
  );
};
