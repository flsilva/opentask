'use client';

import 'client-only';
import { HamburgerMenuIcon } from '@/modules/shared/icon/HamburgerMenuIcon';
import { Logo } from '@/modules/shared/logo/Logo';
import { SettingsMenu } from './SettingsMenu';
import { useRouter } from 'next/navigation';

export const AppHeader = () => {
  const router = useRouter();

  const navToAppNavPage = () => {
    router.push('/app/nav');
  };

  return (
    <header className="flex w-full bg-green-700">
      <nav
        className="relative flex w-full items-center justify-between px-3.5 lg:px-6 py-2"
        aria-label="Global"
      >
        <button
          type="button"
          className="lg:hidden -m-2.5 rounded-md p-2.5 text-gray-700"
          onClick={() => navToAppNavPage()}
        >
          <span className="sr-only">Open menu</span>
          <HamburgerMenuIcon className="fill-white hover:fill-green-500" />
        </button>
        <div className="hidden lg:flex">
          <Logo color="white" width="1.5rem" height="1.5rem" />
        </div>
        <SettingsMenu />
      </nav>
    </header>
  );
};
