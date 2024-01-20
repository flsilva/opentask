'use client';

import 'client-only';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

interface MainMenuProps {
  readonly onItemClick?: () => void;
}

export interface MainMenuItem {
  readonly href: string;
  readonly name: string;
}

export const mainMenuItems: Array<MainMenuItem> = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

export const MainMenu = ({ onItemClick }: MainMenuProps) => {
  const pathname = usePathname();
  const dynamicProps = onItemClick ? { onClick: onItemClick } : {};

  return (
    <>
      {mainMenuItems.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.name}
            className={twJoin(
              '-mx-3 block px-3 py-2 text-base font-medium leading-7 text-gray-900 lg:mx-0 lg:px-0 lg:py-0 lg:text-sm lg:leading-6 lg:hover:text-green-700',
              pathname.startsWith(item.href) && 'text-green-700',
            )}
            {...dynamicProps}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
};
