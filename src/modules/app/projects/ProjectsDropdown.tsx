'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { Menu } from '@headlessui/react';
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
          className={`${
            active || (buttonLabel && buttonLabel === project.name)
              ? 'bg-green-500 text-white'
              : 'text-gray-900'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {project.name}
        </button>
      )}
    </Menu.Item>
  ));

export interface ProjectsDropdownProps extends ClassNamePropsOptional {
  readonly defaultItem: ProjectDto;
  readonly itemsClassName?: string;
  readonly name?: string;
  readonly onItemClick: (project: ProjectDto) => void;
  readonly projects: Array<ProjectDto>;
}

export const ProjectsDropdown = ({
  className,
  defaultItem,
  itemsClassName,
  name,
  onItemClick,
  projects,
}: ProjectsDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const _onItemClick = (project: ProjectDto) => {
    setSelectedItem(project);
    onItemClick(project);
  };
  return (
    <>
      <DropdownMenu
        className={`absolute w-56 ${className}`}
        items={
          <DropdownItens
            buttonLabel={selectedItem.name}
            onItemClick={_onItemClick}
            projects={projects}
          />
        }
        itemsClassName={itemsClassName ? itemsClassName : ''}
        menuButton={
          <Menu.Button className="flex items-center justify-center rounded-md bg-green-600 px-2 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-500">
            {selectedItem.name}
            <ExpandMoreIcon className="ml-2 fill-white" />
          </Menu.Button>
        }
      />
      {name && <input type="hidden" name={name} value={selectedItem.id} />}
    </>
  );
};
