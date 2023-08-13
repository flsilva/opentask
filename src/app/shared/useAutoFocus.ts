'use client';

import 'client-only';
import { useEffect, useRef } from 'react';

export const useAutoFocus = () => {
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  return inputRef;
};
