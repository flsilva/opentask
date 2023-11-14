'use client';

import { usePathname } from 'next/navigation';

export const useIsPathActive = (path: string) => {
  const pathname = usePathname();
  if (!path || path === '') return false;
  return pathname.lastIndexOf(path) !== -1;
};
