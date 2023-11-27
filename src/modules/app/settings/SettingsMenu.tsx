'use client';

import 'client-only';
import { Fragment } from 'react';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import { DropdownMenu } from '@/modules/shared/control/dropdown/DropdownMenu';
import { Menu } from '@/modules/shared/control/dropdown/Menu';
import { PersonIcon } from '@/modules/shared/icon/PersonIcon';
import { SettingsIcon } from '@/modules/shared/icon/SettingsIcon';
import { LogoutIcon } from '@/modules/shared/icon/LogoutIcon';
import { signOut } from '@/modules/app/users/UsersRepository';

export interface SettingsMenuProps {
  readonly userName: string;
}

const getMenuItemClassName = (active: boolean) =>
  twJoin(
    'group flex w-full items-center rounded-md px-2 py-3 text-sm',
    active ? 'group bg-green-500 text-white' : 'text-gray-900',
  );

export const SettingsMenu = ({ userName }: SettingsMenuProps) => {
  return (
    <div className="flex">
      <DropdownMenu
        itemsClassName="absolute top-8 right-0 max-h-48 w-56 z-10"
        menuButton={
          <Menu.Button className="flex items-center justify-center outline-none">
            <PersonIcon className="fill-white hover:fill-green-500" />
          </Menu.Button>
        }
      >
        <p key="user" className="truncate p-2 text-sm">
          Hello, {userName}
        </p>
        <Menu.Item key="settings" as={Fragment}>
          {({ active }: { active: boolean }) => (
            <Link href="/app/settings/account" className={getMenuItemClassName(active)}>
              <div className="flex items-center">
                <SettingsIcon className="mr-3 group-hover:fill-white" />
                Settings
              </div>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item key="logout" as={Fragment}>
          {({ active }: { active: boolean }) => (
            <button onClick={async () => signOut()} className={getMenuItemClassName(active)}>
              <div className="flex items-center">
                <LogoutIcon className="mr-3 group-hover:fill-white" />
                Log out
              </div>
            </button>
          )}
        </Menu.Item>
      </DropdownMenu>
    </div>
  );
};
