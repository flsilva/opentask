'use client';

import { RouterAction } from '@/features/shared/routing/RouterActions';
import { useRouterAction } from '@/features/shared/routing/useRouterAction';

export interface RouterButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  readonly action: RouterAction;
}

export const RouterButton = ({ action, onClick, ...rest }: RouterButtonProps) => {
  const triggerAction = useRouterAction(action);

  const _onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    triggerAction();
    if (onClick) onClick(event);
  };

  return <button onClick={_onClick} type="button" {...rest} />;
};
