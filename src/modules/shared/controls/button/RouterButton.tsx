'use client';

import { RouterActions } from './RouterActions';
import { useRouterActions } from './useRouterActions';

export interface RouterButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  readonly action: RouterActions;
}

export const RouterButton = ({ action, ...rest }: RouterButtonProps) => {
  const triggerActions = useRouterActions(action);

  const onClick = () => {
    triggerActions();
  };

  return <button onClick={onClick} type="button" {...rest} />;
};
