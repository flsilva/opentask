'use client';

import { twMerge } from 'tailwind-merge';
import { DeleteIcon } from '../../icons/DeleteIcon';

export interface DeleteIconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const DeleteIconButton = ({ className, ...rest }: DeleteIconButtonProps) => (
  <button
    type="button"
    className={twMerge('rounded-md p-1.5 text-gray-700 hover:bg-gray-200', className)}
    {...rest}
  >
    <span className="sr-only">Delete task</span>
    <DeleteIcon aria-hidden="true" />
  </button>
);
