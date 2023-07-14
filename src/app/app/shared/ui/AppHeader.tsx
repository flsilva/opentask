'use client';

import 'client-only';
import { forwardRef, Fragment, useContext } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Menu } from '@headlessui/react';
import DropdownMenu from '@/app/shared/ui/dropdown/DropdownMenu';
import { HamburgerMenuIcon } from '@/app/shared/ui/icon/HamburgerMenuIcon';
import { LogoutIcon } from '@/app/shared/ui/icon/LogoutIcon';
import { SettingsIcon } from '@/app/shared/ui/icon/SettingsIcon';
import { UserSessionContext } from '../user/UserSessionProvider';
import { useRouter } from 'next/navigation';

interface AppHeaderProps {
  readonly onMenuButtonClick: () => void;
}

export enum SettingsAction {
  Settings = 'Settings',
  Logout = 'Logout',
}

interface SettingsItem {
  readonly action: SettingsAction;
  readonly icon: React.ReactNode;
  readonly label: string;
}

const settingsItems: Array<SettingsItem> = [
  {
    action: SettingsAction.Settings,
    label: 'Settings',
    icon: <SettingsIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: SettingsAction.Logout,
    label: 'Log out',
    icon: <LogoutIcon className="mr-3 group-hover:fill-white" />,
  },
];

const AppHeader = forwardRef<HTMLElement, AppHeaderProps>(
  ({ onMenuButtonClick }: AppHeaderProps, ref) => {
    const userSession = useContext(UserSessionContext);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const onSettingsActionClick = async (action: SettingsAction) => {
      console.log('AppHeader().onSettingsActionClick() - action: ', action);

      switch (action) {
        case SettingsAction.Logout:
          console.log('AppShell().onProjectActionHandler() - Log out');
          userSession.logout();
          await supabase.auth.signOut();
          router.push('/');
          break;
        case SettingsAction.Settings:
          console.log('AppShell().onProjectActionHandler() - Nav to settings modal');
          break;
        default:
          throw new Error(
            'AppHeader().onSettingsActionClick() - SettingsAction not handled: ',
            action,
          );
      }
    };

    const getDropdownItems = () => {
      const items = settingsItems.map((item) => (
        <Menu.Item key={item.action} as={Fragment}>
          {({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={() => onSettingsActionClick(item.action)}
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
      items.unshift(
        <p key="user" className="truncate p-2 text-sm">
          Hello, {userSession.user?.email}
        </p>,
      );
      return items;
    };

    return (
      <header className="flex w-full bg-green-700" ref={ref}>
        <nav
          className="relative flex w-full items-center justify-between px-6 py-2"
          aria-label="Global"
        >
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onMenuButtonClick}
          >
            <span className="sr-only">Open menu</span>
            <HamburgerMenuIcon className="fill-white hover:fill-green-500" />
          </button>
          <div className="relative">
            <DropdownMenu
              items={getDropdownItems()}
              itemsClassName="absolute top-8 right-0 max-h-80 w-56"
              menuButton={
                <Menu.Button className="flex items-center justify-center focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                  <SettingsIcon className="fill-white hover:fill-green-500" />
                </Menu.Button>
              }
            />
          </div>
        </nav>
      </header>
    );
  },
);

AppHeader.displayName = 'AppHeader';

export default AppHeader;
