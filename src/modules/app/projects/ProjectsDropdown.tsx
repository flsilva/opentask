'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { Menu } from '@headlessui/react';
import { twJoin, twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ExpandMoreIcon } from '@/modules/shared/icons/ExpandMoreIcon';
import { DropdownMenu } from '@/modules/shared/controls/dropdown/DropdownMenu';
import { ProjectDto } from '@/modules/app/projects/ProjectsRepository';

interface DropdownItensProps {
  readonly buttonLabel: string;
  readonly onItemClick: (project: ProjectDto) => void;
  readonly projects: Array<ProjectDto>;
}

const DropdownItens = ({ buttonLabel, onItemClick, projects }: DropdownItensProps) =>
  projects.map((project) => (
    <Menu.Item key={project.id} as={Fragment}>
      {({ active }: { active: boolean }) => (
        <button
          type="button"
          onClick={() => onItemClick(project)}
          className={twJoin(
            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            active || (buttonLabel && buttonLabel === project.name)
              ? 'bg-green-500 text-white'
              : 'text-gray-900',
          )}
        >
          {project.name}
        </button>
      )}
    </Menu.Item>
  ));

export interface ProjectsDropdownProps extends ClassNamePropsOptional {
  readonly defaultItemId: string;
  readonly itemsClassName?: string;
  readonly name?: string;
  readonly onItemClick: (project: ProjectDto) => void;
  readonly projects: Array<ProjectDto>;
}

const getProjectNameById = (projects: Array<ProjectDto>, id: string) =>
  projects.find((project) => project.id === id)?.name;

export const ProjectsDropdown = ({
  className,
  defaultItemId,
  itemsClassName,
  name,
  onItemClick,
  projects,
}: ProjectsDropdownProps) => {
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId);
  const _onItemClick = (project: ProjectDto) => {
    setSelectedItemId(project.id);
    onItemClick(project);
  };
  return (
    <>
      <DropdownMenu
        className={twMerge('absolute w-56', className)}
        items={
          <DropdownItens
            buttonLabel={getProjectNameById(projects, selectedItemId) || ''}
            onItemClick={_onItemClick}
            projects={projects}
          />
        }
        itemsClassName={itemsClassName ? itemsClassName : ''}
        menuButton={
          <Menu.Button className="flex items-center justify-center rounded-md bg-green-600 px-2 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-500">
            {getProjectNameById(projects, selectedItemId) || ''}
            <ExpandMoreIcon className="ml-2 fill-white" />
          </Menu.Button>
        }
      />
      {name && <input type="hidden" name={name} value={selectedItemId} />}
    </>
  );
};
