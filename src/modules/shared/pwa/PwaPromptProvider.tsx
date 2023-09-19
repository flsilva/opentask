'use client';

import { createContext } from 'react';
import { ChildrenProps } from '../ChildrenProps';
import { usePwaPrompt } from './usePwaPrompt';

export interface PwaPromptProviderProps extends ChildrenProps {}

export const PwaPromptContext = createContext<(() => void) | null>(null);

export default function PwaPromptProvider({ children }: PwaPromptProviderProps) {
  const promptFunction = usePwaPrompt();
  return <PwaPromptContext.Provider value={promptFunction}>{children}</PwaPromptContext.Provider>;
}
