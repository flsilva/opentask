import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export enum RouterActionType {
  Back = 'back',
  Forward = 'forward',
  Push = 'push',
  Refresh = 'refresh',
  Replace = 'replace',
}

export interface RouterActionWithNoArgs {
  readonly type: RouterActionType.Back | RouterActionType.Forward | RouterActionType.Refresh;
}

export interface RouterActionPushOrReplace {
  readonly href: string;
  readonly options?: NavigateOptions;
  readonly type: RouterActionType.Push | RouterActionType.Replace;
}

export type RouterAction = RouterActionWithNoArgs | RouterActionPushOrReplace;

export type RouterActions = RouterAction | Array<RouterAction>;
