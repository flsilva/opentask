'use client';

import 'client-only';
import { HamburgerMenuIcon } from '@/modules/shared/icons/HamburgerMenuIcon';
import { Logo } from '@/modules/shared/logos/Logo';
import { SettingsMenu } from '@/modules/app/settings/SettingsMenu';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();

  const navToMainMenuPage = () => {
    router.push('/app/main-menu');
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
          onClick={() => navToMainMenuPage()}
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
