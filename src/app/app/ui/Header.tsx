import 'server-only';
import { HamburgerMenuSvg } from '@/shared/ui/HamburgerMenuSvg';

export default function Header() {
  return (
    <header className="flex w-full bg-green-700">
      <nav
        className="relative flex w-full items-center justify-between px-4 py-2"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <HamburgerMenuSvg className="fill-white" />
        </div>
        <a className="text-sm font-normal text-white" href="#" aria-current="page">
          Sign Out
        </a>
      </nav>
    </header>
  );
}
