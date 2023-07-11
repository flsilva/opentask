import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ClassNamePropsOptional } from '../ClassNameProps';

interface DropdownMenuProps extends ClassNamePropsOptional {
  readonly items: React.ReactNode;
  readonly itemsClassName: string;
  readonly menuButton: React.ReactNode;
}

export default function DropdownMenu({
  className,
  items,
  itemsClassName,
  menuButton,
}: DropdownMenuProps) {
  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>{menuButton}</div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${itemsClassName} origin-top-right divide-y divide-gray-100 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="px-1 py-1 ">{items}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
