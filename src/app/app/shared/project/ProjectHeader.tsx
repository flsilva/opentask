'use client';

import 'client-only';
import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import DropdownMenu from '@/app/shared/ui/dropdown/DropdownMenu';
import { MoreHorizontalIcon } from '@/app/shared/ui/icon/MoreHorizontalIcon';
import { ProjectData } from './ProjectData';
import { ArchiveIcon } from '@/app/shared/ui/icon/ArchiveIcon';
import { DeleteIcon } from '@/app/shared/ui/icon/DeleteIcon';
import { EditIcon } from '@/app/shared/ui/icon/EditIcon';

export enum ProjectAction {
  Archive = 'Archive',
  Edit = 'Edit',
  Delete = 'Delete',
}

interface ProjectHeaderProps {
  readonly onProjectActionClick: (action: ProjectAction, projectId: string) => void;
  readonly project: ProjectData;
}

interface MenuItem {
  readonly action: ProjectAction;
  readonly icon: React.ReactNode;
  readonly label: string;
}

const menuItems: Array<MenuItem> = [
  {
    action: ProjectAction.Edit,
    label: 'Edit project',
    icon: <EditIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectAction.Archive,
    label: 'Archive project',
    icon: <ArchiveIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectAction.Delete,
    label: 'Delete project',
    icon: <DeleteIcon className="mr-3 group-hover:fill-white" />,
  },
];

export default function ProjectHeader({ onProjectActionClick, project }: ProjectHeaderProps) {
  const getDropdownItems = () =>
    menuItems.map((item) => (
      <Menu.Item key={item.action} as={Fragment}>
        {({ active }: { active: boolean }) => (
          <button
            type="button"
            onClick={() => onProjectActionClick(item.action, project.id)}
            className={`${
              active ? 'group bg-green-500 text-white' : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-3 text-sm`}
          >
            <div className="flex items-center">
              {item.icon}
              {item.label}
            </div>
          </button>
        )}
      </Menu.Item>
    ));

  return (
    <div className="flex flex-col pb-8">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <div className="relative ml-0 h-12">
          <DropdownMenu
            items={getDropdownItems()}
            itemsClassName="absolute top-10 right-0 max-h-80 w-56"
            menuButton={
              <Menu.Button className="flex items-center justify-center focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                <MoreHorizontalIcon className=" hover:fill-green-500" />
              </Menu.Button>
            }
          />
        </div>
      </div>
      <p className="mb-8 block whitespace-pre-line text-sm">{project.description}</p>
    </div>
  );
}
