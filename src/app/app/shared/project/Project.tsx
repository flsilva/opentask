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

interface ProjectProps {
  readonly project: ProjectData;
}
/*
const getMenuItemClassName = (active: boolean) => (
  `${
    active
      ? 'bg-green-500 text-white'
      : 'text-gray-900'
  } group flex w-full items-center rounded-md px-2 py-2 text-sm`
);

const getMenuItems = (onItemClick: (itemLabel: string) => void) => (
  [
    <Menu.Item key="edit" as={Fragment}>
      {({ active }: { active: boolean }) => (
        <button
          type="button"
          onClick={() => onItemClick('edit')}
          className={getMenuItemClassName(active)}
        >
          Edit project
        </button>
      )}
    </Menu.Item>
  ]
);
*/

interface MenuItem {
  readonly icon: React.ReactNode;
  readonly id: string;
  readonly label: string;
}

const menuItems: Array<MenuItem> = [
  {
    id: 'edit',
    label: 'Edit project',
    icon: <EditIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    id: 'archive',
    label: 'Archive project',
    icon: <ArchiveIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    id: 'delete',
    label: 'Delete project',
    icon: <DeleteIcon className="mr-3 group-hover:fill-white" />,
  },
];

export default function Project({ project }: ProjectProps) {
  const dropdownMenuItemClickHandler = (item: MenuItem) => {
    console.log('Project().dropdownMenuItemClickHandler() - item: ', item);
  };

  const getDropdownItems = () =>
    menuItems.map((item) => (
      <Menu.Item key={item.id} as={Fragment}>
        {({ active }: { active: boolean }) => (
          <button
            type="button"
            onClick={() => dropdownMenuItemClickHandler(item)}
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
      <p className="mb-8 block text-sm">{project.description}</p>
    </div>
  );
}
