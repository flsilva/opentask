'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { ProjectDTO } from './project-model-dto';

interface ProjectListProps {
  readonly projects: Array<ProjectDTO>;
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => setIsOpen(true), []);

  const onProjectClick = (project: ProjectDTO) => {
    router.push(`/app/project/${project.id}`);
  };

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
              className="flex grow items-center rounded-md p-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
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
