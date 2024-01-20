'use client';

import { createContext } from 'react';
import { ChildrenProps } from '@/features/shared/ui/ChildrenProps';
import { useInstallPwa } from './useInstallPwa';

export const InstallPwaContext = createContext<(() => void) | null>(null);

export const InstallPwaProvider = ({ children }: ChildrenProps) => {
  const promptFunction = useInstallPwa();
  return <InstallPwaContext.Provider value={promptFunction}>{children}</InstallPwaContext.Provider>;
};
