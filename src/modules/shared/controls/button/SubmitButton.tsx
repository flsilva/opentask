'use client';

import { useFormStatus } from 'react-dom';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

export interface SubmitButtonProps extends ClassNamePropsOptional {
  readonly label: string;
  readonly submittingLabel: string;
}

export const SubmitButton = ({ className, label, submittingLabel }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} aria-disabled={pending} disabled={pending}>
      {pending ? submittingLabel : label}
    </button>
  );
};
