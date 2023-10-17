'use client';

import 'client-only';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainNavProps {
  readonly callback?: () => void;
}

export interface MainNavItem {
  readonly href: string;
  readonly name: string;
}

export const mainNavItems: Array<MainNavItem> = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

export const MainNav = ({ callback }: MainNavProps) => {
  const pathname = usePathname();
  const dynamicProps = callback ? { onClick: callback } : {};

  return (
    <>
      {mainNavItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        let className =
          '-mx-3 block px-3 py-2 text-base font-medium leading-7 text-gray-900 lg:mx-0 lg:px-0 lg:py-0 lg:text-sm lg:leading-6 lg:hover:text-green-700';
        if (isActive) className += ' text-green-700';
        return (
          <Link href={item.href} key={item.name} className={className} {...dynamicProps}>
            {item.name}
          </Link>
        );
      })}
    </>
  );
};
