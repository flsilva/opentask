import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export enum RouterActionType {
  Back = 'Back',
  BackAndRefresh = 'BackAndRefresh',
  Forward = 'Forward',
  ForwardAndRefresh = 'ForwardAndRefresh',
  Push = 'Push',
  PushAndRefresh = 'PushAndRefresh',
  Replace = 'Replace',
  ReplaceAndRefresh = 'ReplaceAndRefresh',
}

export interface RouterActionWithNoArgs {
  readonly type:
    | RouterActionType.Back
    | RouterActionType.BackAndRefresh
    | RouterActionType.Forward
    | RouterActionType.ForwardAndRefresh;
}

export interface RouterActionPushOrReplace {
  readonly href: string;
  readonly options?: NavigateOptions;
  readonly type:
    | RouterActionType.Push
    | RouterActionType.PushAndRefresh
    | RouterActionType.Replace
    | RouterActionType.ReplaceAndRefresh;
}

export type RouterAction = RouterActionWithNoArgs | RouterActionPushOrReplace;

export const RouterActions: {
  Back: RouterActionWithNoArgs;
  BackAndRefresh: RouterActionWithNoArgs;
  Forward: RouterActionWithNoArgs;
  ForwardAndRefresh: RouterActionWithNoArgs;
  Push: (href: string, options?: NavigateOptions) => RouterActionPushOrReplace;
  PushAndRefresh: (href: string, options?: NavigateOptions) => RouterActionPushOrReplace;
  Replace: (href: string, options?: NavigateOptions) => RouterActionPushOrReplace;
  ReplaceAndRefresh: (href: string, options?: NavigateOptions) => RouterActionPushOrReplace;
} = {
  Back: { type: RouterActionType.Back },
  BackAndRefresh: { type: RouterActionType.BackAndRefresh },
  Forward: { type: RouterActionType.Forward },
  ForwardAndRefresh: { type: RouterActionType.ForwardAndRefresh },
  Push: (href: string, options?: NavigateOptions): RouterActionPushOrReplace => ({
    href,
    options,
    type: RouterActionType.Push,
  }),
  PushAndRefresh: (href: string, options?: NavigateOptions): RouterActionPushOrReplace => ({
    href,
    options,
    type: RouterActionType.PushAndRefresh,
  }),
  Replace: (href: string, options?: NavigateOptions): RouterActionPushOrReplace => ({
    href,
    options,
    type: RouterActionType.Replace,
  }),
  ReplaceAndRefresh: (href: string, options?: NavigateOptions): RouterActionPushOrReplace => ({
    href,
    options,
    type: RouterActionType.ReplaceAndRefresh,
  }),
};
