'use client';

import { useRouter } from 'next/navigation';
import { RouterAction, RouterActions } from './RouterActions';

export const useRouterActions = (action: RouterActions | undefined) => {
  const router = useRouter();

  const triggerActions = () => {
    if (!action) return;
    Array.isArray(action) ? processActions(action) : processAction(action);
  };

  const processActions = (actions: Array<RouterAction>) => {
    if (!actions || actions.length < 1) return;
    actions.forEach((action) => processAction(action));
  };

  const processAction = (action: RouterAction) => {
    switch (action.type) {
      case 'back':
        router.back();
        break;
      case 'forward':
        router.forward();
        break;
      case 'push':
        router.push.apply(null, [action.href, action.options]);
        break;
      case 'refresh':
        router.refresh();
        break;
      case 'replace':
        router.replace.apply(null, [action.href, action.options]);
        break;
    }
  };

  return triggerActions;
};
