import 'server-only';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@/features/shared/ui/icon/HamburgerMenuIcon';
import { Logo } from '@/features/shared/ui/logo/Logo';
import { SettingsMenu } from '@/features/app/settings/ui/SettingsMenu';
import { getUser } from '@/features/app/users/data-access/UsersDataAccess';

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="flex w-full bg-green-700">
      <nav
        className="relative flex w-full items-center justify-between px-3.5 lg:px-6 py-2"
        aria-label="Global"
      >
        <Link className="lg:hidden -m-2.5 rounded-md p-2.5 text-gray-700" href="/app/main-menu">
          <span className="sr-only">Open menu</span>
          <HamburgerMenuIcon className="fill-white hover:fill-green-500" />
        </Link>
        <div className="hidden lg:flex">
          <Logo color="white" width="1.5rem" height="1.5rem" />
        </div>
        <SettingsMenu userName={user.name} />
      </nav>
    </header>
  );
};
