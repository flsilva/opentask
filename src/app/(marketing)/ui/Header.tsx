import 'server-only';
import Link from 'next/link';
import { Logo } from '@/shared/ui/Logo';
import MainNav from './MainNav';
import MobileMainNav from './MobileMainNav';

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <MobileMainNav />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <MainNav />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium leading-6 text-gray-900 hover:text-green-700"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
