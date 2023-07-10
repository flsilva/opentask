import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ClassNamePropsOptional } from '../ClassNameProps';
import { ExpandMoreIcon } from '../icon/ExpandMoreIcon';

export interface DropdownMenuItemData {
  readonly id: string;
  readonly label: string;
}

interface DropdownMenuProps extends ClassNamePropsOptional {
  readonly buttonText: string;
  readonly items: Array<DropdownMenuItemData>;
  readonly onDropdownMenuItemClick: (item: DropdownMenuItemData) => void;
}

export default function DropdownMenu({
  buttonText,
  className,
  items,
  onDropdownMenuItemClick,
}: DropdownMenuProps) {
  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center justify-center rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            {buttonText}
            <ExpandMoreIcon className="ml-2 fill-white" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-14 left-0 mt-2 max-h-80 w-56 origin-top-right divide-y divide-gray-100 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item) => (
                <Menu.Item key={item.id} as={Fragment}>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => onDropdownMenuItemClick(item)}
                      className={`${
                        active || buttonText === item.label
                          ? 'bg-green-500 text-white'
                          : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
