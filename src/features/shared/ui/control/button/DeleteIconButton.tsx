'use client';

import { twMerge } from 'tailwind-merge';
import { DeleteIcon } from '../../icon/DeleteIcon';
import { forwardRef } from 'react';

export interface DeleteIconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const DeleteIconButton = forwardRef<HTMLButtonElement, DeleteIconButtonProps>(
  ({ className, ...rest }, ref) => (
    <button
      type="button"
      className={twMerge('rounded-md p-1.5 text-gray-700 hover:bg-gray-200', className)}
      {...rest}
      ref={ref}
    >
      <span className="sr-only">Delete task</span>
      <DeleteIcon aria-hidden="true" />
    </button>
  ),
);

DeleteIconButton.displayName = 'DeleteIconButton';
