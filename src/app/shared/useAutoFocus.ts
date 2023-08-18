'use client';

import 'client-only';
import { useEffect, useRef } from 'react';

export const useAutoFocus = (autoFocus: boolean = true) => {
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!autoFocus || !inputRef.current) return;
    inputRef.current.focus();
  }, [autoFocus]);

  return inputRef;
};
