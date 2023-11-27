'use client';

import 'client-only';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { useIsPathActive } from '@/modules/shared/router/useIsPathActive';

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
