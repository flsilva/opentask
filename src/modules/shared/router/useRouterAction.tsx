'use client';

import { useRouter } from 'next/navigation';
import { RouterAction, RouterActionType, RouterActions } from './RouterActions';

export const useRouterAction = (action: RouterAction | undefined) => {
  const router = useRouter();

  const triggerAction = () => {
    if (!action) return;

    switch (action.type) {
      case RouterActionType.Back:
      case RouterActionType.BackAndRefresh:
        router.back();
        if (action.type === RouterActionType.BackAndRefresh) router.refresh();
        break;
      case RouterActionType.Forward:
      case RouterActionType.ForwardAndRefresh:
        router.forward();
        if (action.type === RouterActionType.ForwardAndRefresh) router.refresh();
        break;
      case RouterActionType.Push:
      case RouterActionType.PushAndRefresh:
        router.push.apply(null, [action.href, action.options]);
        if (action.type === RouterActionType.PushAndRefresh) router.refresh();
        break;
      case RouterActionType.Replace:
      case RouterActionType.ReplaceAndRefresh:
        router.replace.apply(null, [action.href, action.options]);
        if (action.type === RouterActionType.ReplaceAndRefresh) router.refresh();
        break;
    }
  };

  return triggerAction;
};
