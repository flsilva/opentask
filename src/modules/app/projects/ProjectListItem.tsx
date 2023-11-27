'use client';

import 'client-only';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { useIsPathActive } from '@/modules/shared/router/useIsPathActive';

interface ProjectListItemProps extends ClassNamePropsOptional {
  readonly activeClassName?: string;
  readonly href: string;
  readonly id: string;
  readonly name: string;
}

export const ProjectListItem = ({
  activeClassName,
  className,
  href,
  id,
  name,
}: ProjectListItemProps) => {
  const _href = href.replace(':projectId', id);
  const isActive = useIsPathActive(_href);

  return (
    <Link
      href={_href}
      className={twMerge(
        'flex grow items-center rounded-none lg:rounded-md py-2.5 text-base lg:text-sm text-gray-600 hover:bg-gray-200 border-b lg:border-b-0',
        className,
        isActive && activeClassName,
      )}
    >
      {name}
    </Link>
  );
};
