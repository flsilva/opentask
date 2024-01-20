'use client';

import 'client-only';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/features/shared/ui/ChildrenProps';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { useIsPathActive } from '@/features/shared/routing/useIsPathActive';

export interface MainMenuLinkProps extends ChildrenProps, ClassNamePropsOptional {
  readonly activeClassName?: string;
  readonly href: string;
}

export const MainMenuLink = ({ activeClassName, children, className, href }: MainMenuLinkProps) => {
  const isActive = useIsPathActive(href);

  return (
    <Link
      href={href}
      className={twMerge(
        'flex rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 gap-2',
        className,
        isActive && activeClassName,
      )}
    >
      {children}
    </Link>
  );
};
