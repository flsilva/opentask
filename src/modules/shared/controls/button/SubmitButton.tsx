'use client';

import { useFormStatus } from 'react-dom';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';

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
      <div className={`spinner w-4 h-4 ${spinnerClassName ? spinnerClassName : ''}`} />
    </div>
  );

  const pendingComponent = submitting ? submitting : spinner;

  return (
    <button
      type="submit"
      className={`group relative ${className}`}
      aria-disabled={pending}
      disabled={pending}
    >
      <div
        className={`flex items-center justify-center group-disabled:opacity-0 ${
          labelClassName ? labelClassName : ''
        }`}
      >
        {(!submitting || !pending) && children}
      </div>
      <div
        className={`flex group-enabled:hidden ${
          submittingContainerClassName ? submittingContainerClassName : ''
        }`}
      >
        {pendingComponent}
      </div>
    </button>
  );
};
