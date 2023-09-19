'use client';

import 'client-only';
import { useEffect } from 'react';

export interface KeyboardEventListenerSettings {
  readonly key: string;
  readonly listener: (event: KeyboardEvent) => void;
  readonly shouldPreventDefault?: boolean;
}

export const useKeyboardEvent = (
  event: 'keydown' | 'keypress' | 'keyup',
  listeners: Array<KeyboardEventListenerSettings>,
) => {
  useEffect(() => {
    const onKeyEvent = (e: KeyboardEvent) => {
      for (const setting of listeners) {
        if ((e as KeyboardEvent).key === setting.key) {
          if (setting.shouldPreventDefault) {
            e.preventDefault();
          }
          setting.listener(e);
        }
      }
    };

    document.addEventListener(event, onKeyEvent);

    return () => {
      document.removeEventListener(event, onKeyEvent);
    };
  }, [event, listeners]);
};
