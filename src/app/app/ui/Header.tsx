import 'server-only';
import { Logo } from '@/shared/ui/Logo';

export default function Header() {
  return (
    <header className="flex w-full bg-green-700">
      <nav
        className="relative flex w-full items-center justify-between px-6 py-3"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Logo fillColor="fill-white" textColor="text-white" />
        </div>
        <a className="text-sm font-light text-white" href="#" aria-current="page">
          Sign Out
        </a>
      </nav>
    </header>
  );
}
