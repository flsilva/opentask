'use client';

import 'client-only';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ProjectDto } from './ProjectRepository';

interface ProjectListUIProps {
  readonly onProjectClick: (project: ProjectDto) => void;
  readonly projects: Array<ProjectDto>;
}

export default function ProjectListUI({ onProjectClick, projects }: ProjectListUIProps) {
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
      <nav className="flex w-full flex-col">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="flex grow items-center rounded-md py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
              onClick={() => onProjectClick(project)}
            >
              <p>{project.name}</p>
            </button>
          ))}
        {!projects ||
          (projects.length < 1 && (
            <p className="text-sm font-medium text-gray-600">No projects.</p>
          ))}
      </nav>
    </Transition>
  );
}
