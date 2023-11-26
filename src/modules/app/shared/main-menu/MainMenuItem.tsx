'use client';

import 'client-only';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { useIsPathActive } from '@/modules/shared/router/useIsPathActive';
import { CalendarTodayIcon } from '@/modules/shared/icon/CalendarTodayIcon';
import { ProjectsIcon } from '@/modules/shared/icon/ProjectsIcon';

export interface MainMenuItemProps extends ClassNamePropsOptional {
  readonly activeClassName?: string;
  readonly href: string;
  readonly icon: string;
  readonly label: string;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'CalendarTodayIcon':
      return CalendarTodayIcon;
    case 'ProjectsIcon':
      return ProjectsIcon;
    default:
      return null;
  }
};

export const MainMenuItem = ({
  activeClassName,
  className,
  href,
  icon,
  label,
}: MainMenuItemProps) => {
  const isActive = useIsPathActive(href);
  const IconComponent = getIcon(icon);

  return (
    <Link
      href={href}
      className={twMerge(
        'flex rounded-md p-2 text-base lg:text-sm font-medium text-gray-600 hover:bg-gray-200 gap-2',
        className,
        isActive && activeClassName,
      )}
    >
      {IconComponent && <IconComponent className="fill-gray-600" />}
      {label}
    </Link>
  );
};
