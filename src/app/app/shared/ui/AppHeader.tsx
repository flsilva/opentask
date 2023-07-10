'use client';

import 'client-only';
import { forwardRef } from 'react';
import { HamburgerMenuIcon } from '@/app/shared/ui/icon/HamburgerMenuIcon';
import { SettingsIcon } from '@/app/shared/ui/icon/SettingsIcon';

interface AppHeaderProps {
  readonly onMenuClick: () => void;
}

const AppHeader = forwardRef<HTMLElement, AppHeaderProps>(
  ({ onMenuClick }: AppHeaderProps, ref) => {
    return (
      <header className="flex w-full bg-green-700" ref={ref}>
        <nav
          className="relative flex w-full items-center justify-between px-6 py-2"
          aria-label="Global"
        >
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open menu</span>
            <HamburgerMenuIcon className="fill-white" />
          </button>
          <SettingsIcon className="fill-white" />
        </nav>
      </header>
    );
  },
);

AppHeader.displayName = 'AppHeader';

export default AppHeader;
