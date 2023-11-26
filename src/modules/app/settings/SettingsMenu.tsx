'use client';

import { Fragment, useContext } from 'react';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import { DropdownMenu } from '@/modules/shared/control/dropdown/DropdownMenu';
import { PersonIcon } from '@/modules/shared/icons/PersonIcon';
import { SettingsIcon } from '@/modules/shared/icons/SettingsIcon';
import { LogoutIcon } from '@/modules/shared/icons/LogoutIcon';
import { UserContext } from '@/modules/app/users/UserProvider';
import { signOut } from '@/modules/app/users/UsersRepository';

enum SettingsMenuAction {
  Settings = 'Settings',
  Logout = 'Logout',
}

interface SettingsMenuItem {
  readonly action: SettingsMenuAction;
  readonly icon: React.ReactNode;
  readonly label: string;
}

const settingsMenuItems: Array<SettingsMenuItem> = [
  {
    action: SettingsMenuAction.Settings,
    label: 'Settings',
    icon: <SettingsIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: SettingsMenuAction.Logout,
    label: 'Log out',
    icon: <LogoutIcon className="mr-3 group-hover:fill-white" />,
  },
];

export const SettingsMenu = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  const onSettingsMenuActionClick = async (action: SettingsMenuAction) => {
    switch (action) {
      case SettingsMenuAction.Logout:
        signOut();
        break;
      case SettingsMenuAction.Settings:
        router.push('/app/settings/account');
        break;
      default:
        throw new Error(
          'SettingsMenu().onSettingsMenuActionClick() - Unhandled SettingsAction: ',
          action,
        );
    }
  };

  const getMenuItems = () => {
    const items = settingsMenuItems.map((item) => (
      <Menu.Item key={item.action} as={Fragment}>
        {({ active }: { active: boolean }) => (
          <button
            type="button"
            onClick={() => onSettingsMenuActionClick(item.action)}
            className={twJoin(
              'group flex w-full items-center rounded-md px-2 py-3 text-sm',
              active ? 'group bg-green-500 text-white' : 'text-gray-900',
            )}
          >
            <div className="flex items-center">
              {item.icon}
              {item.label}
            </div>
          </button>
        )}
      </Menu.Item>
    ));
    items.unshift(
      <p key="user" className="truncate p-2 text-sm">
        Hello, {user.name}
      </p>,
    );
    return items;
  };

  return (
    <div className="flex">
      <DropdownMenu
        items={getMenuItems()}
        itemsClassName="absolute top-8 right-0 max-h-48 w-56 z-10"
        menuButton={
          <Menu.Button className="flex items-center justify-center outline-none">
            <PersonIcon className="fill-white hover:fill-green-500" />
          </Menu.Button>
        }
      />
    </div>
  );
};
