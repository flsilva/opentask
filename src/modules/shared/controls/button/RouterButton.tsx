'use client';

import { RouterActions } from '@/modules/shared/router/RouterActions';
import { useRouterActions } from '@/modules/shared/router/useRouterActions';

export interface RouterButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  readonly actions: RouterActions;
}

export const RouterButton = ({ actions, onClick, ...rest }: RouterButtonProps) => {
  const triggerActions = useRouterActions(actions);

  const _onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    triggerActions();
    if (onClick) onClick(event);
  };

  return <button onClick={_onClick} type="button" {...rest} />;
};
