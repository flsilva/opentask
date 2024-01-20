'use client';

import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { ChildrenProps } from '@/features/shared/ui/ChildrenProps';

export interface SubmitButtonProps extends ChildrenProps, ClassNamePropsOptional {
  readonly labelClassName?: string;
  readonly spinnerClassName?: string;
  readonly submitting?: React.ReactNode;
  readonly submittingContainerClassName?: string;
}

export const SubmitButton = ({
  children,
  className,
  labelClassName,
  spinnerClassName,
  submitting,
  submittingContainerClassName,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  const spinner = (
    <div className="absolute w-4 h-4 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className={twMerge('spinner w-4 h-4', spinnerClassName)} />
    </div>
  );

  const pendingComponent = submitting ? submitting : spinner;

  return (
    <button
      type="submit"
      className={twMerge('group relative', className)}
      aria-disabled={pending}
      disabled={pending}
    >
      <div
        className={twMerge(
          'flex items-center justify-center group-disabled:opacity-0',
          labelClassName,
        )}
      >
        {(!submitting || !pending) && children}
      </div>
      <div className={twMerge('flex group-enabled:hidden', submittingContainerClassName)}>
        {pendingComponent}
      </div>
    </button>
  );
};
