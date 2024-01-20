'use client';

import 'client-only';
import { useEffect, useRef } from 'react';

export const useAutoFocus = <ElementType extends { focus: () => void }>(
  autoFocus: boolean = true,
) => {
  const inputRef = useRef<ElementType>(null);

  useEffect(() => {
    if (!autoFocus || !inputRef.current) return;
    inputRef.current.focus();
  }, [autoFocus]);

  return inputRef;
};
