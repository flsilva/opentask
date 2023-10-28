'use client';

import { createContext } from 'react';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { usePwaPrompt } from './usePwaPrompt';

export const PwaPromptContext = createContext<(() => void) | null>(null);

export const PwaPromptProvider = ({ children }: ChildrenProps) => {
  const promptFunction = usePwaPrompt();
  return <PwaPromptContext.Provider value={promptFunction}>{children}</PwaPromptContext.Provider>;
};
