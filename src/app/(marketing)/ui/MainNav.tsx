import Link from 'next/link';

export interface MainNavItem {
  readonly name: string;
  readonly href: '/' | '/features' | '/about';
}

export const mainNavItems: Array<MainNavItem> = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/' },
  { name: 'About', href: '/about' },
];

export default function MainNav() {
  return (
    <>
      {mainNavItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className="-mx-3 block px-3 py-2 text-base font-medium leading-7 text-gray-900 lg:mx-0 lg:px-0 lg:py-0 lg:text-sm lg:leading-6 lg:hover:text-green-700"
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}
