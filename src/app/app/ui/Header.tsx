import 'server-only';
import { HamburgerMenuSvg } from '@/shared/ui/HamburgerMenuSvg';
import { SettingsSvg } from '@/shared/ui/SettingsSvg';

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
        <SettingsSvg className="fill-white" />
      </nav>
    </header>
  );
}
